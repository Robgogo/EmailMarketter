const router = require('express').Router();
const multer = require('multer');
const dateformat = require('dateformat');
const logger = require('../../logger');
const reader = require('../SendMail/Commands/CSVReader');

router.post('/',(req,res)=>{
    let now= new Date();
    let name = dateformat(now).toString().replace(/ /g,"-").replace(/:/g,"-");
    let storage = multer.diskStorage({
        destination : (req,file,cb ) => {
            cb(null,'public/');
        },
        filename : (req,file,cb )=>{
            cb(null,name+'-'+file.originalname );
        }
    });

    let upload = multer({ storage : storage}).single('file');

    upload(req,res, (err)=>{
        if (err instanceof multer.MulterError) {
            logger.error("multer",err);
            
            return res.status(500).json(err)
        } else if (err) {
            logger.error(err);
            
            return res.status(500).json(err)
        }

        reader.readAndMerge('public/'+req.file.filename,'public/data.csv')
        
        return res.status(200).send({message:"Succesfull",file:req.file});
    
    });
});

module.exports = router;