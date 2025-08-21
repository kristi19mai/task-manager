import "dotenv/config";
import connectDB from "./db/connect.js";
import Task from "./models/Tasks.js";
import data from "./mockdata.json" with { type: "json"};

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Task.create(data);
    console.log("success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
