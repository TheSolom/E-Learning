import transporter from '../../config/transporter.js';
import accountVerificationTemplate from '../../Templates/Mail/accountVerification.js';

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