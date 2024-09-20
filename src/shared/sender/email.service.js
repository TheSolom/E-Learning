import transporter from '../config/transporter.js';
import accountVerificationTemplate from '../Templates/Mail/accountVerification.js';
import resetPasswordTemplate from '../Templates/Mail/resetPassword.js';

export const sendEmail = async (mailOptions) => {
    const info = await transporter.sendMail(mailOptions);
    return info;
};

export const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
        to: email,
        subject: 'E-Learning Account verification',
        html: accountVerificationTemplate(otp),
        tags: [
            {
                name: "category",
                value: "account_verification",
            },
        ],
    };

    const info = await sendEmail(mailOptions);
    return info;
};

export const sendResetPasswordEmail = async (email, otp) => {
    const mailOptions = {
        to: email,
        subject: 'E-Learning Reset password',
        html: resetPasswordTemplate(otp),
        tags: [
            {
                name: "category",
                value: "reset_password",
            },
        ],
    };

    const info = await sendEmail(mailOptions);
    return info;
};
