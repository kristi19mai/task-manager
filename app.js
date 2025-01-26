import connectDB from "./db/connect.js";
import "dotenv/config";
import express from "express";
import tasks from "./routers/tasks.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to DB");

    app.listen(port, () => {
      console.log(`the server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
