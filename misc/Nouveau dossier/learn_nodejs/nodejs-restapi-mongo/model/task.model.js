const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
//   {
//     title: { type: String },
//     description: { type: String },
//     createDate: { type: Date },
//     updatedDate: { type: Date },
//     createdBy: { type: String },
//     updatedBy: { type: String },
//     complete: { type: Boolean, default: false },
//   },
//   { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
{
    title: { type: String },
    description: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
    complete: { type: Boolean, default: false },
  }
);

module.exports = mongoose.model("todo", taskSchema);

// module.exports = {
//   Task,
// };
