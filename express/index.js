import express, { response } from "express";

const app = express();
app.use(express.json());

app.all("/testAll", (req, res) => {
    res.send(req.method);
});

app.get("/teste?", (_req, res) => {
    res.send("/teste?");
});

app.get("/buzz+", (_req, res) => {
    res.send("/buzz+");
});

app.get("/one*Blue", (req, res) => {
    res.send("/oneBlue");
});

app.post("/test(ing)?", (req, res) => {
    res.send("/test(ing)?");
});

// Parametros
app.post("/testbody", (req, res) => {
    console.log(req.body);
    res.send("/testbody");
});

app.get("/testParam/:id/:a?", (req, res) => {
    res.send(req.params.id + " " + req.params.a);
});

app.get("/testQuery", (req, res) => {
    res.send(req.query);
});

//next
app.get(
    "/testMultipleHandlers",
    (req, res, next) => {
        console.log("Callback 1");
        next();
    },
    (req, res) => {
        console.log("Callback 2");
        res.end();
    }
);

const callback1 = (req, res, next) => {
    console.log("Callback 1");
    next();
};

const callback2 = (req, res, next) => {
    console.log("Callback 2");
    next();
};

const callback3 = (req, res, next) => {
    console.log("Callback 3");
    res.end();
};

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

app.route("/testRoute")
    .get((req, res) => {
        res.send("/testRoute GET");
    })
    .post((req, res) => {
        res.send("/testRoute POST");
    });

app.listen(3000, () => {
    console.log("API Started!");
});
