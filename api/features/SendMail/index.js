const mailer = require('./Commands/MailEverybody');
const reader = require('./Commands/CSVReader');

const main = async ()=>{
    const file = "C:\\Users\\robgo\\Desktop\\Projects\\Email Marketting\\Pro-Material\\api\\public\\data.csv";
    let mailinglist = await reader.getSendingList(file);

    await mailer(mailinglist);
}

module.exports = main;