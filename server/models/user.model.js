const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
        },

        email: {
            type: String,
            required: [true, "Email address is required"],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email",
            },
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [4, "Passwords MUST be at least 8 characters"],
        },

        showsLiked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Show",
            },
        ],
    },
    { timestamps: true }
);

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match!!!");
        console.log("Passwords don't match!");
    }
    next();
});

UserSchema.pre("save", function (next) {
    console.log("in pre save");
    //hash the password BEFORE it's saved to the db
    //Remember, we know they match from middleware above
    bcrypt.hash(this.password, 10).then((hashedPassword) => {
        //give our password the value of the returned hash
        this.password = hashedPassword;
        next();
    });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
