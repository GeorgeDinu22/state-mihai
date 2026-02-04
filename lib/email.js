
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || "",
});

const sentFrom = new Sender(
    process.env.MAILERSEND_FROM_EMAIL, 
    process.env.MAILERSEND_FROM_NAME
);

export async function sendEmailDirect({ to, subject, html }) {

    if (!process.env.MAILERSEND_API_KEY) {
        console.error("[EMAIL ERROR] Missing MAILERSEND_API_KEY");
        return { success: false, error: "Missing API Key" };
    }

    try {
        const recipients = [new Recipient(to, "Client")];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject(subject)
            .setHtml(html);

        const res = await mailerSend.email.send(emailParams);

        console.log("[EMAIL SUCCESS] Email trimis către:", to);
        return { success: true, data: res };

    } catch (error) {
        console.error("[EMAIL ERROR]", error); 
        return { success: false, error: error.message };
    }
}
