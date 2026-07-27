import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

app.use(express.json());

export interface Inquiry {
  id: string;
  timestamp: string;
  agency: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  notes: string;
  quoteText: string;
  toEmail: string;
  status: 'SENT' | 'DELIVERED' | 'FAILED';
}

const inquiriesStore: Inquiry[] = [];

// API Endpoint to send email quote requests
app.post("/api/send-email", async (req, res) => {
  try {
    const { agency, contactName, contactEmail, phone, notes, quoteText, toEmail } = req.body;

    const targetEmail = toEmail || "SkyfinancialRelief@gmail.com";

    const inquiry: Inquiry = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      agency: agency || "Unspecified Agency",
      contactName: contactName || "Evaluator / Contracting Officer",
      contactEmail: contactEmail || "evaluator@gov.mil",
      phone: phone || "N/A",
      notes: notes || "",
      quoteText: quoteText || "",
      toEmail: targetEmail,
      status: 'SENT'
    };

    inquiriesStore.unshift(inquiry);

    // If SMTP env vars are present, send via nodemailer
    let emailSentViaSmtp = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"VEK-7 Quote System" <${process.env.SMTP_USER}>`,
          to: targetEmail,
          replyTo: contactEmail || undefined,
          subject: `Quote Request: VEK-7 Micro-Purchase ($14,500) - ${inquiry.agency}`,
          text: quoteText,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
              <h2 style="color: #f59e0b; margin-top: 0;">Official Quotation Request</h2>
              <p><strong>Target Email:</strong> ${targetEmail}</p>
              <p><strong>Inquiry ID:</strong> ${inquiry.id}</p>
              <hr style="border-color: #334155;" />
              <pre style="background: #020617; padding: 15px; border-radius: 6px; color: #fef08a; white-space: pre-wrap;">${quoteText}</pre>
            </div>
          `
        });
        emailSentViaSmtp = true;
      } catch (err) {
        console.error("SMTP sending error:", err);
      }
    }

    console.log(`[EMAIL DISPATCH] Quote request ${inquiry.id} sent to ${targetEmail} from ${inquiry.contactEmail}`);

    res.json({
      success: true,
      message: `Quotation request successfully dispatched to ${targetEmail}`,
      inquiry,
      emailSentViaSmtp
    });
  } catch (error: any) {
    console.error("Error processing send-email:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to dispatch email request" });
  }
});

// GET endpoint to fetch inquiries log
app.get("/api/inquiries", (_req, res) => {
  res.json({ inquiries: inquiriesStore });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
