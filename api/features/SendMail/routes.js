const router = require('express').Router();

const mailer = require('./Commands/MailEverybody');
const reader = require('./Commands/CSVReader');


router.get('/',async (req,res)=>{
    
    const file = "C:\\Users\\robgo\\Desktop\\Projects\\Email Marketting\\Pro-Material\\api\\public\\data.csv";
    let mailinglist = await reader(file);

    console.log("HTML is ",req.query.html);
    await mailer(mailinglist,req.query.sub,req.query.txt,req.query.html);

    res.json({message: "Successfull"});
});

module.exports = router;