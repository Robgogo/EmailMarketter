const nodemailer = require('nodemailer');
const asnc = require('async');
const Email = require('email-templates')
const path = require('path');

let failed_emails = [];
let success_emails = []

const singleMailer = async (email_content) =>{
    const account = {
        user: "robgogoworku@gmail.com",
        pass: 'maozedong1949r'
    }

    let transporter = nodemailer.createTransport({
        pool: true,
        host : 'smtp.gmail.com',
        port : 465,
        secure : true,
        auth : {
            user: account.user,
            pass: account.pass
        }
    });

    // let transporter = nodemailer.createTransport({
    //     pool: true,
    //     host : 'localhost',
    //     port : 465,
    //     secure : true,
    //     auth : {
    //         user: account.user,
    //         pass: account.pass
    //     },tls: {
    //         rejectUnauthorized: false
    //     }
    // });

    const email = new Email({
        message:{
            from: account.user
        },
        send:true,
        transport:transporter,
        views: {
            options: {
              extension: 'ejs' // <---- HERE
            },
        }
    });

    console.log("Dir is ",__dirname);
    

    asnc.waterfall([
        (callback)=>{
            // let mail_options={
            //     from:"Robgogoworku@gmail.com",
            //     to:email_content.email_addr,
            //     subject: email_content.subject, 
            //     text: email_content.txtbody,
            //     html: email_content.htmlbody
            // }

            // transporter.sendMail(mail_options,(err, res)=>{
            //     console.log("Checking response")
            //     if(err){
            //         console.log("Error",err);
            //         failed_emails.push(email_content.email_addr);
            //     }
            //     else{
            //         success_emails.push(email_content.email_addr);
            //     }
            //     callback();
            // });

            email.send({
                template:path.join(__dirname,"emails","mail-template"),
                message:{
                    from:account.user,
                    to: email_content.email_addr
                }
            }).then(()=>{
                console.log("Email Succesfull");
                success_emails.push(email_content.email_addr);
                callback();
            }
            ).catch( err=>{
                console.log("Email Failed",err);
                failed_emails.push(email_content.email_addr);
            });

        },
        (callback)=>{
            //A function to run to save to db the status or anything to process after sending email

            console.log("Succesfull mails", success_emails);
            console.log("Failed mails",failed_emails);
            
            callback();
        }
    ], ()=>{
        //When everything is done return to caller
        callback();
    });
    return 
}

module.exports = singleMailer;