import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: String,
    status: {
      type: String,
      enum: ["pending", "inProgress", "done"],
      default: "pending",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("Todo", todoSchema);
export default TodoModel;
