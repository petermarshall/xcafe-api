const mongoose = require('mongoose');
module.exports = {


    connect: DB_HOST => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFinfAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(DB_HOST);
        mongoose.connection.on('error', err =>{
            console.error(err);
            console.log('mongo db connection error');
            process.exit();
        });
    },
    close: ()=>{
        mongoose.connection.close();
    }
}