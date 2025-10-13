import { sanitizeFilter } from "mongoose";



export default class Sanitizer{
    static html(input: string): string {
        return String(input).replace(/<[^>]*>/g, '').trim() // Remove HTML tags
    }

    static string(input: string): string {
        // Remove leading and trailing whitespace, and replace multiple spaces with a single space
        return input.trim().replace(/\s+/g, ' ');
    }

    static mongoFilter(input: any): any {
        // Use mongoose's built-in sanitizeFilter to prevent NoSQL injection
        return sanitizeFilter(input);
    }

    static url(input: string): string {
        // Basic URL sanitization to remove spaces and ensure it starts with http/https
        let url = input.trim();
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        return url;
    }

    static email(input: string): string {
        // Basic email sanitization to remove spaces and convert to lowercase
        return input.trim().toLowerCase();
    }

    static password(input: string): string {
        // Basic password sanitization (e.g., trimming whitespace)
        return input.trim();
    }
    static number(input: number): number {
        // Ensure the input is a number and return it as is
        if (typeof input !== 'number' || isNaN(input)) {
            throw new Error("Invalid number input");
        }
        return input;
    }

}