const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.methods.isMatchPassword = async function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;