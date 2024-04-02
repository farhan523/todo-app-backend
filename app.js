const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var createError = require("http-errors");

const taskRouter = require("./Routes/task");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/task", taskRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

// connection to the database
mongoose
    .connect(`mongodb+srv://${process.env.user}:${process.env.password}@cluster0.bnacrmq.mongodb.net/testTodoDatabase?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
		app.listen(3001, () => {
			console.log("listening on port 3001");
		});
    })
    .catch((error) => {
        console.log("error while connecting to a database", error);
    });


