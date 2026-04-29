import User from '@/models/UserModel';
import nodemailer from 'nodemailer'
import crypto from 'crypto';

export  const emailSender = async({email,emailType,userId}:any) => {
    try{
        const rawToken = crypto.randomBytes(32).toString('hex')
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,
                {verifyToken : hashedToken,verifyTokenExpiry : Date.now() + 3600000}
            )
        }else if(emailType == 'RESET'){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken : hashedToken,forgotPasswordExpiry : Date.now() + 3600000}
            )
        }

        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: 'noreplay@dsa', // sender address
            to: email, // list of recipients
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password', // subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${rawToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}
            or copy paste the link below in your browser.
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${rawToken}
            </p>`,
        }

        const mailRespone = await transporter.sendMail(mailOptions)
        console.log(`Email sent ${emailType}:`, mailRespone.response);
        return mailRespone
    }catch(error:any){
        throw new Error(error.message);
    }
}