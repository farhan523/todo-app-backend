const { model, Schema } = require("mongoose");

const task = new Schema(
    {
        title: String,
        completed: Boolean
    },
    { timestamps: true }
);

let Task =   model("Task", task);

module.exports = Task;
