const nodemailer = require('nodemailer');

const mail_single = async (email_addr,subject,body_txt,body_html) =>{
    const account = {
        user: "Robgogoworku@gmail.com",
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

    let info = await transporter.sendMail({
        from:"Robgogoworku@gmail.com",
        to:email_addr,
        subject: subject, 
        text: body_txt,
        html: body_html
    },(err, res)=>{
        console.log("Checking response")
        if(err){
            console.log("Error",err);
            return err;
        }
        console.log(res);
        return res;
    });

    return info;
}

const mail_everybody = async (mailing_list) => {

    mailing_list.forEach(async element => {
        let info = await mail_single(element.email,"Some kind of subject","Some kind of text object","<a href='https://google.com'>Some HTML input</a>");
        //if error retry to send or keep the failed mail addresses and notify
        // if(info){

        // }

        console.log("emailed for: ",element.name,element.email);
        
    });

}

module.exports = mail_everybody;