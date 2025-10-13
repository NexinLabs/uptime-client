import { emailConfig } from '@/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(emailConfig.creds);

export async function sendMail(from: string, to: string, subject: string, content: string) {
    const mailOptions = {
        from,
        to,
        subject,
        text: content,
    };
    return await transporter.sendMail(mailOptions);
}

export async function sendMailWithHTML(from: string, to: string, subject: string, html: string) {
    const mailOptions = {
        from,
        to,
        subject,
        html,
    };
    return await transporter.sendMail(mailOptions);
}