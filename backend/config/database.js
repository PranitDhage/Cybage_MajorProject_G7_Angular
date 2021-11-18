const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then(conn => {
        console.log(`MongoDB Database connected with HOST: ${conn.connection.host}`);
    })

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function(){
        console.log("Connected successfully");
    })
}

module.exports = connectDatabase;