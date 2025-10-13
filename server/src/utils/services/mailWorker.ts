import { parentPort } from 'worker_threads';
import { emailConfig } from '@/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(emailConfig.creds);

parentPort?.on('message', async (data: any) => {
    try {
        const { from, to, subject, content, html } = data;
        const mailOptions: any = {
            from,
            to,
            subject,
        };
        if (content) {
            mailOptions.text = content;
        }
        if (html) {
            mailOptions.html = html;
        }
        const result = await transporter.sendMail(mailOptions);
        parentPort?.postMessage({ success: true, result });
    } catch (error: any) {
        parentPort?.postMessage({ success: false, error: error.message });
    }
});