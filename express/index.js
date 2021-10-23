import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World 2!");
});

app.post("/", (req, res) => {
    const a = 3;
    const b = 5;

    res.send("Hello World Post!");
});

app.listen(3000, () => {
    console.log("API Started!");
});
