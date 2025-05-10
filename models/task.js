import mongoose from "mongoose";
import moment from "moment";
import "moment/locale/de.js";

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    task: {
      type: String,
      required: [true, "Bitte geben Sie den Namen des Todos ein"],
      minLength: 3,
      maxLength: [
        30,
        "Die Länge des Todonamens darf 30 Zeichen nicht überschreiten.",
      ],
      trim: [true, "Bitte geben Sie den Namen des Todos ein"],
    },
    description: {
      type: String,
      maxLength: [
        200,
        "Die Länge des Todonamens darf 30 Zeichen nicht überschreiten.",
      ],
      trim: true,
      default: "",
    },
    important: { type: Boolean, default: false },
    status: {
      type: String,
      default: "geplant",
      enum: ["geplant", "in bearbeitung", "erledigt"],
    },
    file: { type: String, default: "" },
    dueDate: { type: Date, default: new Date() },
    dueDateYear: { type: Number },
    dueDateMonth: { type: String },
    dueDateDay: { type: Number },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "bitte geben Sie Benutzer ID ein"],
    },
  },
  { timestamps: true }
);

TaskSchema.pre("save", function getDateInfo() {
  const months = [
    " Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  this.dueDateYear = this.dueDate.getFullYear();
  this.dueDateMonth = months[this.dueDate.getMonth()];
  this.dueDateDay = this.dueDate.getDate();
});

export default mongoose.model("Task", TaskSchema);
