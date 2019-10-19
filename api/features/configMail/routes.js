const router = require('express').Router();
const logger = require('../../logger');
const configRepo = require('./repository');

const insert = async (id,mail_content,subject,link)=>{
    return await configRepo.updateEntry(id,mail_content,subject,link);
}
router.post('/insert',async (req,res)=>{
    console.log(req.body);
    const mail_config = await insert(1,req.body.mail_content,req.body.subject,req.body.link);
    res.json({mail_config});
});

router.get('/',async (req,res)=>{
    const mail_config = await configRepo.retrieveLatest(1);
    res.json({mail_config});
})

module.exports = router;