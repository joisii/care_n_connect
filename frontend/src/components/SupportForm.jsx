import React from "react";
import { useState } from "react";
import axios from "axios";
import "./SupportForm.css";

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    issue: "",
    urgency: "",
    aiSummary: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await axios.post("http://localhost:5000/api/submit", formData);
      setStatus("Request submitted successfully ✅");
      setFormData({
        name: "",
        age: "",
        contact: "",
        issue: "",
        urgency: "",
        aiSummary: "",
      });
    } catch (error) {
      setStatus("Something went wrong ❌ Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="support-card">
        <div className="form-header">
          <h2>Submit Support Request</h2>
          <p>We typically respond within 24 hours</p>
        </div>

        <form className="support-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="25"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contact"
                placeholder="+91 9876543210"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Issue Description</label>
            <textarea
              name="issue"
              placeholder="Describe your problem in detail..."
              rows="4"
              value={formData.issue}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Urgency</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="">Select urgency</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label>AI Summary (optional)</label>
            <textarea
              name="aiSummary"
              placeholder="Optional summary or automated suggestion"
              rows="3"
              value={formData.aiSummary}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          {status && <div className="message">{status}</div>}
        </form>
      </div>
    </div>
  );
};

export default SupportForm;
