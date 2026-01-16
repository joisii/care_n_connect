import express from "express";
import SupportRequest from "../models/SupportRequest.js";

const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const { name, age, contact, issue, urgency } = req.body;

    // 🤖 AI / Automation Concept (Simple & Explainable)
    const aiSummary = `Patient ${name} (Age ${age}) reported: "${issue}". Urgency level marked as ${urgency}.`;

    const newRequest = new SupportRequest({
      name,
      age,
      contact,
      issue,
      urgency,
      aiSummary,
    });

    await newRequest.save();

    res.status(201).json({
      message: "Support request submitted successfully",
      aiSummary,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
