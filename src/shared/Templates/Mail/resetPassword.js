export default (otp) =>
    `
    <!Doctype>
    <html lang="en">
    <title>Password Reset Email</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width initial-scale=0.5">
    <style type="text/css">
        .txt-color:hover {
            color: #ed0e0e !important;
        }

        .bg-rollover:hover {
            background-color: #ed0e0e !important;
        }

        /*Mobile styles */
    </style>
    </head>

    <body style="background-color: #53565e">
        <!-- start of header table -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F2f1f1">
            <tr>
                <td align="center">
                    <!-- start of logo wrapper -->
                    <table width="600px" border="0" cellpadding="0" cellspacing="0" style="background-color: #F2f1f1">
                        <tr>
                            <td align="center" style="padding: 5px 0 5px 0">
                                <img src="https://static.vecteezy.com/system/resources/previews/001/991/659/large_2x/digital-education-platform-flat-design-concept-illustration-icon-digital-education-online-classroom-e-learning-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg"
                                    width="100" alt="E-Learning"
                                    style="display: block; border-radius: 3px; width: 100%; max-width: 100px" border="0">
                            </td>
                        </tr>
                    </table>
                    <!-- end of logo wrapper -->
                </td>
            </tr>
        </table>
        <!-- end of header table -->
        <!-- start of body table -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F2f1f1">
            <tr>
                <td align="center">
                    <!-- start of body wrapper -->
                    <table width="600px" border="0" cellpadding="0" cellspacing="0" style="background-color: #F6F6F6">
                        <tr>
                            <td align="center">
                                <h1 style="font-size: 30px; font-weight: normal; padding: 0 0 10px 0">
                                    Password Reset
                                </h1>

                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0 8px 10px 8px; font-size: 17px">Hello, seems like you forgot your password for
                                <b>
                                    <a href="${process.env.FRONTEND_URL}" style="color:#4d4f51; text-decoration:none;">
                                        <span class="txt-color">E-Learning. </span>
                                    </a>
                                </b>
                                please use the OTP code below to reset your password, OTP is valid for 15 minutes.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td class="bg-rollover" bgcolor="#6495ED"
                                                        style=" padding: 12px 18px 12px 18px; border-radius: 3px">
                                                        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                                                    </td>
                                                    <td width="20"></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 8px; font-size: 17px">If you did not forgot your password, please
                                ignore this email and have a lovely day.</td>
                        </tr>
                    </table>
                    <!-- end of body wrapper -->
                </td>
            </tr>
        </table>
        <!-- end of body table -->

        <!-- start of footer table -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F2f1f1">
            <tr>
                <td align="center">
                    <!-- start of footer wrapper -->
                    <table width="600px" border="0" cellpadding="0" cellspacing="0" style="background-color:#F2f1f1">
                        <tr>
                            <td align="center" style="padding: 0 0 5px 0; font-size: 13px;">
                                <span style="color: #b3b4b5">E-Learning © 2024</span>
                            </td>
                        </tr>

                    </table>
                    <!-- end of footer wrapper --->
                </td>
            </tr>
        </table>
        <!-- end of footer table -->
    </body>

    </html>
`;