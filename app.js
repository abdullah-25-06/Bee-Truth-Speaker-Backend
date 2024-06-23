//Import Libaries here
const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const serverless = require("serverless-http")
const errorMiddleWare = require("./middleware/error")
const dotenv = require("dotenv");
dotenv.config();

// Generate App and Morgan to use
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('short'))

// Routes Import
const insta = require("./routes/instaRoutes")
const twitter = require("./routes/twitterRoutes")
const facebook = require("./routes/facebookRoutes")
const tiktok = require("./routes/tiktokRoutes")
const user = require("./routes/userRoutes")


app.use("/api/v1", insta)
app.use("/api/v1", twitter)
app.use("/api/v1", facebook)
app.use("/api/v1", tiktok)
app.use("/api/v1", user)


// Middleware for Errors
app.use(errorMiddleWare);

// module.exports.handler = serverless(app)
module.exports = app;





// Server Endpoints
// app.use("/.netlify/functions/server", vote);