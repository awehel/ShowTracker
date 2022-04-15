const mongoose = require("mongoose");


mongoose
    .connect(`mongodb://localhost/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        console.log(`Connected to the ${process.env.DB_NAME} database!`)
    )
    .catch((err) => console.log(err));
