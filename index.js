const reader = require('./src/reader');
const mailer = require('./src/mailer')


const main = async () =>{
    const file = 'C:/Users/robgo/Desktop/Projects/Email Marketting/Project/data.csv';
    let lst =await reader(file);

    await mailer(lst);

    
}
main()