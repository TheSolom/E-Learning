import { createTransport } from 'nodemailer';
import ErrorHandler from "../utils/error.handler.js";

const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;
if (!NODEMAILER_USER || !NODEMAILER_PASS) {
    throw new ErrorHandler('Nodemailer credentials not found', 500, null, true);
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
