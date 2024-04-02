const express = require("express");

const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req, res, next) => {
    try {
        let allTasks = await Task.find();

        return res.status(200).json(allTasks);
    } catch (err) {
        res.status(err.statusCode ?? 400).json({ stack: err.stack });
    }
});

router.post("/addTask", async (req, res, next) => {
    try {
        let { title } = req.body;

        let newTask = new Task({
            title: title,
            completed: false
        });
        newTask = await Task.create(newTask);

        return res.status(201).json({ newTask });
    } catch (err) {
        res.status(err.statusCode ?? 400).json({ stack: err.stack });
    }
});

router.delete("/remove/:id", async (req, res, next) => {
    try {
        let id = req.params.id;
        let task = await Task.findByIdAndDelete(id);

        return res.status(202).json({ message: "success" });
    } catch (err) {
        res.status(err.statusCode ?? 400).json({ stack: err.stack });
    }
});

router.patch("/update/:id", async (req, res, next) => {
    try {
        let id = req.params.id;
        let taskUpdates = req.body;
        let task = await Task.findByIdAndUpdate(id, { ...taskUpdates });

        return res.status(200).json({ message: "success" });
    } catch (err) {
        res.status(err.statusCode ?? 400).json({ stack: err.stack });
    }
});

module.exports = router;
