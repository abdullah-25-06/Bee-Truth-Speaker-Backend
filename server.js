//Import Libaries here
const app = require("./app")
const serverless = require("serverless-http")
const connectDatabase = require("./database/connectionDB")
const dotenv = require("dotenv");
dotenv.config();

// Connecting to database
connectDatabase()

const PORT = 4000

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});

app.listen(PORT, () => {
    console.log(`The Server is listening at http://localhost:${PORT}`)
})
