const csv = require('csvtojson');

const get_sending_list = async (file_dir) => {
    console.log("Reading")
    let sending_list = await csv().fromFile(file_dir);

    return sending_list;
}
module.exports = (get_sending_list);