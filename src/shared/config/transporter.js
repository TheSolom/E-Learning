import { createTransport } from 'nodemailer';

const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;
if (!NODEMAILER_USER || !NODEMAILER_PASS) {
    throw new Error('Nodemailer credentials not found');
}

const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
    }
});

export default transporter;
