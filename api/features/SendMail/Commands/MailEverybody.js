const asnc = require('async');
const singleMailer = require('./MailSingle');

const mailEveryBody = async (mailingList)=>{
    let list = mailingList.map( element =>{
        return {
            email_addr: element.Email
        }
    });

    asnc.each(list,singleMailer,()=>{
        return 
    });
}

module.exports = mailEveryBody;