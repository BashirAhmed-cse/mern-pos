const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Removes extra spaces
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Ensures no duplicate emails
            lowercase: true, // Converts to lowercase
            validate: {
                validator: function (v) {
                    return /\S+@\S+\.\S+/.test(v);
                },
                message: props => `${props.value} is not a valid email!`,
            },
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Ensures no duplicate phone numbers
            validate: {
                validator: function (v) {
                    return /^\d{6,16}$/.test(v); // Allows 10 to 15 digits only
                },
                message: props => `${props.value} is not a valid phone number!`,
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 4, // Minimum password length
        },
        role: {
            type: String,
            required: true,
           
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
