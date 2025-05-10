const express = require("express");
const xss = require("xss");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

app.post("/submit", (req, res) => {
  const userInput = req.body.input; // Assume input is sent in the request body
  const sanitizedInput = xss(userInput); // Sanitize the input

  console.log("Sanitized Input:", sanitizedInput);
  res.send({ sanitized: sanitizedInput });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const xss = require("xss");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function saveUserInput(input) {
  const sanitizedInput = xss(input); // Sanitize the input
  const db = client.db("testdb");
  const collection = db.collection("userInputs");

  await collection.insertOne({ input: sanitizedInput });
  console.log("Input saved:", sanitizedInput);
}

saveUserInput('<script>alert("xss");</script>')
  .then(() => client.close())
  .catch(console.error);

const xss = require("xss");

const options = {
  whiteList: { a: ["href", "title"], b: [] }, // Allow <a> with href and title, and <b> with no attributes
};

const customXss = new xss.FilterXSS(options);

const userInput = '<a href="javascript:alert(1)">Click me</a>';
const sanitizedInput = customXss.process(userInput);

console.log(sanitizedInput); // Output: <a>Click me</a>
