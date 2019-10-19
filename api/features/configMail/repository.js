const Knex = require('knex');
const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

insertData = async (mail_content,subject,link)=>{
    const [mail_options] = await knex('mail_options')
    .insert({
        mail_content,
        subject,
        link
    }).returning(['subject','link']);

    return mail_options;
}

retrieveLatest = async (id)=>{
    const mail_options = await knex.from('mail_options')
    .where({id:id})
    .select();

    // console.log(mail_options[mail_options.length-1]);
    

    return mail_options;
}

updateEntry = async (id,mail_content,subject,link)=>{
    const res = await knex('mail_options')
    .where({id:id})
    .update({
        mail_content,
        subject,
        link
    }).returning(['id','subject','mail_content','link']);

    return res;
}

module.exports ={
    insertData,
    retrieveLatest,
    updateEntry
}
