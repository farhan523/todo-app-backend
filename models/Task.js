const { model, Schema } = require("mongoose");

const task = new Schema(
    {
        title: String,
        completed: Boolean
    },
    { timestamps: true }
);

module.exports = model("Task", task);
