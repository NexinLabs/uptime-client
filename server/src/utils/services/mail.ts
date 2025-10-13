import { Worker } from 'worker_threads';
import path from 'path';



export async function sendMail(from : string, to: string, subject: string, content: string){
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'mailWorker.js'));
        worker.postMessage({ from, to, subject, content });
        worker.on('message', (msg) => {
            if (msg.success) {
                resolve(msg.result);
            } else {
                reject(new Error(msg.error));
            }
            worker.terminate();
        });
        worker.on('error', (err) => {
            reject(err);
            worker.terminate();
        });
    });
}


export async function sendMailWithHTML(from: string, to: string, subject: string, html: string){
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'mailWorker.js'));
        worker.postMessage({ from, to, subject, html });
        worker.on('message', (msg) => {
            if (msg.success) {
                resolve(msg.result);
            } else {
                reject(new Error(msg.error));
            }
            worker.terminate();
        });
        worker.on('error', (err) => {
            reject(err);
            worker.terminate();
        });
    });
}