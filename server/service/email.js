import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
};

const createEmailTemplate = (link) => `
  <div>
    <h1>Для активации перейдите по ссылке <a href="${link}">${link}</a></h1>
  </div>
`;

export class EmailService {
  static transporter = nodemailer.createTransport(smtpConfig);

  static async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html: createEmailTemplate(link),
    });
  }
}
