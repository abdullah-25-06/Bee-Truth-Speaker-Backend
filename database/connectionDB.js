const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Database Connection
const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URL,

        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((e) => {
            console.log("Something went wrong due to this error", e);
        })

}

module.exports = connectDatabase;
