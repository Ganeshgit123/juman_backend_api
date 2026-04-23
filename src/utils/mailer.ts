const nodemailer = require('nodemailer');
import CONFIG from "../config";
export class NodMailerService {
    private transporter: any;
    constructor() {
        this.init();
    }

    private init() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: CONFIG.ENV_CONFIG.J_MAILER_USER,
                pass: CONFIG.ENV_CONFIG.J_MAILER_PASSWORD
            }
        });
    }

    private sendMail(mailData: any, attachments: any[], toAddress: string): void{
        const mailOptions: any = {
            from: CONFIG.ENV_CONFIG.J_MAILER_FROM_ADDRESS,
            to: toAddress,
            subject: mailData.subject || "",
            text: mailData.text || "",
            html: mailData.html || ""
        };

        if(attachments?.length){
            mailOptions.attachments = attachments;
        }
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    public sendCareerRequest(data: any, attachments: any[]): void{
        const mailData: any = {};
        mailData.subject = "New Career Request";
        mailData.html = `<!DOCTYPE html>
        <html>
        <head>
        <title>Career Request</title>
        <style>
        table, td {
        border:1px solid;
        }
        </style>
        </head>
        <body>
        <p>Hi Team,</p>
        <p>Please find the new career request details below</p>
        <table>
        <thead>
        </thead>
        <tbody>
        <tr>
            <td>Name</td><td>${data.name}</td>
        </tr>
        <tr>
            <td>Mobile Number</td><td>${data.mobileNumber}</td>
        </tr>
        <tr>
            <td>Email</td><td>${data.email}</td>
        </tr>
        <tr>
            <td>Department</td><td>${data.department}</td>
        </tr>
        </tbody>
        </table>
        </body>
        </html>`;

        this.sendMail(mailData, attachments, CONFIG.ENV_CONFIG.J_CAREER_MAILER_TO_ADDRESS);
    }

    public sendContactRequest(data: any, attachments: any[]): void{
        const mailData: any = {};
        mailData.subject = "New Contact Request";
        mailData.html = `<!DOCTYPE html>
        <html>
        <head>
        <title>Contact Request</title>
        <style>
        table, td {
        border:1px solid;
        }
        </style>
        </head>
        <body>
        <p>Hi Team,</p>
        <p>New Contact request has been requested from ${data.name}. Please find the details below</p>
        <table>
        <thead>
        </thead>
        <tbody>
        <tr>
            <td>Name</td><td>${data.name}</td>
        </tr>
        <tr>
            <td>Mobile Number</td><td>${data.mobileNumber}</td>
        </tr>
        <tr>
            <td>Email</td><td>${data.email}</td>
        </tr>
        <tr>
            <td>Message</td><td>${data.message}</td>
        </tr>
        </tbody>
        </table>
        </body>
        </html>`;

        this.sendMail(mailData, attachments, CONFIG.ENV_CONFIG.J_CONTACT_MAILER_TO_ADDRESS);
    }
}