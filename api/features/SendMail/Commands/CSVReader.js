const csv = require('csvtojson');
const jsontocsv = require('objects-to-csv');

const getSendingList = async (dir)=>{
    let sendingList =await csv().fromFile(dir);
    return sendingList;
}

const readAndMerge = async (newcsv,oldcsv)=>{
    let newdata = await csv().fromFile(newcsv);
    const jsoncsv = new jsontocsv(newdata);

    await jsoncsv.toDisk(oldcsv,{append:true});
    
    return 
}

module.exports = {
    getSendingList,
    readAndMerge
};