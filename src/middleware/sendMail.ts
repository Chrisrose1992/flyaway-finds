import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function sendMail(
    req: Request,
    emailType: string,
    emailSubject: string,
    name: string,
    email: string,
    data: Record<string, any> = {}
) {
    try {
        console.log("sendMail function called...");
        console.log(`Sending email to: ${email} (${name})`);
        console.log(`Email Subject: ${emailSubject}`);
        console.log("Email Data:", data);

        // Load SMTP credentials
        const EMAIL_CONFIG = {
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        };

        const transporter = nodemailer.createTransport(EMAIL_CONFIG);
        console.log("Verifying SMTP connection...");
        await transporter.verify();
        console.log("SMTP connection verified successfully.");

        // Define correct email template path
        const emailTemplateDir = path.join(process.cwd(), "src", "email_template");
        console.log("Checking available email templates in:", emailTemplateDir);

        if (!fs.existsSync(emailTemplateDir)) {
            console.error("Error: Email template directory does not exist:", emailTemplateDir);
            return { success: false, error: "Email template directory missing." };
        }

        console.log("Available templates:", fs.readdirSync(emailTemplateDir));

        let templateFileName;
        if (emailType === "verifyEmail") {
            templateFileName = "verify_email.html";
        } else if (emailType === "securityCode") {
            templateFileName = "security_code.html";
        } else {
            console.error("Invalid email type provided:", emailType);
            return { success: false, error: "Invalid email type." };
        }

        const filePath = path.join(emailTemplateDir, templateFileName);
        console.log("Attempting to read template file:", filePath);

        if (!fs.existsSync(filePath)) {
            console.error("Error: Email template file does not exist:", filePath);
            return { success: false, error: `Email template '${templateFileName}' missing.` };
        }

        let htmlContent = fs.readFileSync(filePath, "utf8");

        // Replace placeholders dynamically
        htmlContent = htmlContent
            .replace(/{{name}}/g, name)
            .replace(/{{key}}/g, data.Key || "")
            .replace(/{{baseurl}}/g, process.env.BASE_URL || "")
            .replace(/{{action_message}}/g, data.action_message || "")
            .replace(/{{code}}/g, data.code || "")
            .replace(/{{cta_text}}/g, data.cta_text || "Click Here")
            .replace(/{{action_link}}/g, data.action_link || "#");

        const mailOptions = {
            from: `"ScaleBox Info" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: emailSubject,
            html: htmlContent,
            headers: {
                "X-Mailer": "NodeMailer",
                "X-Priority": "3",
            },
        };

        console.log("Sending email...");
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}: ${info.response}`);

        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
}
