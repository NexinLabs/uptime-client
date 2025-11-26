import { emailConfig } from '@/config';
import nodemailer from 'nodemailer';
import { logger } from '@/ext/logger';

const transporter = nodemailer.createTransport(emailConfig.creds);

export async function sendMail(from: string, to: string, subject: string, content: string): Promise<{ success: boolean; error?: string }> {
    const mailOptions = {
        from,
        to,
        subject,
        text: content,
    };
    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        logger.error(`Failed to send email to ${to}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function sendMailWithHTML(from: string, to: string, subject: string, html: string): Promise<{ success: boolean; error?: string }> {
    const mailOptions = {
        from,
        to,
        subject,
        html,
    };
    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        logger.error(`Failed to send HTML email to ${to}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}