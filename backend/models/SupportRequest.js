import mongoose from "mongoose";

const supportRequestSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    contact: String,
    issue: String,
    urgency: String,
    aiSummary: String,
  },
  { timestamps: true }
);

const SupportRequest = mongoose.model(
  "SupportRequest",
  supportRequestSchema
);

export default SupportRequest;
