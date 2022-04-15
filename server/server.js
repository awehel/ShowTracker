require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
        
    })
);
app.use(cookieParser());

require("./config/mongoose.config")
require("./routes/show.route")(app)
require("./routes/user.route")(app)
require('./routes/comment.route')(app)


app.listen(process.env.MY_PORT, () => {
    console.log(`Listening on port ${process.env.MY_PORT}`);
});