import nodemailer from 'nodemailer';


async function sendEmailWithInvoice(pdfBuffer: Buffer, recipientEmail: string) {

    const senderEmail = process.env.EMAIL_FROM;
    const senderPassKey = process.env.EMAIL_PASS_KEY;

    const transporter = nodemailer.createTransport({
        secure:true,
        host:'smtp.gmail.com',
        port:465,
        auth: {
            user:senderEmail,
            pass:senderPassKey,
          }
    });

    const mailOptions = {
        from: senderEmail,
        to: recipientEmail,
        subject: "Your Invoice & A Special Thank You! 🎁",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #875479;">Hello,</h2>
                <p>Thank you for shopping with us! 🛍️ We truly appreciate your support.</p>
                
                <p>Your invoice is attached to this email. We hope you enjoy your purchase.</p>
                
                <p style="font-weight: bold; color: #28a745;">✨ Keep shopping with us! We have exciting discounts for our regular customers. ✨</p>
                
                <p>Stay tuned for our upcoming offers and exclusive deals. 🎁</p>
                <p>For any queries please reply to this mail.</p>
    
                <p style="margin-top: 20px;">Best Regards,</p>
                <p><strong>Dhana Fashions</strong></p>
            </div>
        `,
        attachments: [{
            filename: 'invoice.pdf',
            content: pdfBuffer
        }]
    };
    
    await transporter.sendMail(mailOptions);
    
}

export {sendEmailWithInvoice};

