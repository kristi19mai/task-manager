import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: [20, "name can not be more than 20 characters"],
    trim: [true, "must provide the name"],
  },
  description: { type: String, maxLength: 150, trim: true, default: "" },
  important: { type: Boolean, default: false },
  status: {
    type: String,
    default: "Vorbereitung",
    enum: ["Vorbereitung", "Durchführung", "Nachbereitung", "Fertiggestellt"],
  },
  date: { type: Date, default: Date.now() },
  dueDate: { type: Date, default: Date.now() },
});

export default mongoose.model("Task", TaskSchema);
