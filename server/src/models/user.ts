const mongoose = require('mongoose');

const model = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const mongooseModel = new mongoose.model("User", model)

export default mongooseModel;
