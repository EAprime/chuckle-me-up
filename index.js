import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev";

app.use(express.static("public"));

app.get("/", async (req,res) => {
    res.render("index.ejs", {joke: "A Joke Will Appear Here"});
});

app.post("/single-joke", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/joke/Any?blacklistFlags=racist,explicit&type=single");
        res.render("index.ejs", {joke1: result.data.joke});
    } catch(error) {
        res.status(404).send(error.message);
    }
});

app.post("/two-part", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/joke/Any?blacklistFlags=racist,explicit&type=twopart");
        res.render("index.ejs", {joke2: result.data.setup + ` ` + result.data.delivery});
    } catch(error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});