// api/contact.js
import { SendMailClient } from "zeptomail";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { name, email, message } = req.body;
  const url = "https://api.zeptomail.in/v1.1/email"; // or api.zeptomail.com depending on your region
  const token = process.env.ZEPTO_TOKEN;

  const client = new SendMailClient({ url, token });

  try {
    await client.sendMail({
        "from": 
        {
            "address": "noreply@stensize.com",
            "name": "noreply"
        },
        "to": 
        [
            {
            "email_address": 
                {
                    "address": "support@stensize.com",
                    "name": "Stensize Support"
                }
            }
        ],
      "subject": `New Lead: ${name}`,
      "htmlbody": `<h3>New Inquiry</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}