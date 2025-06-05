// src/components/TextForm.js
import React, { useState } from "react";
import '../components/styles/TextForm.css';
import AccuracyBar from './AccuracyBar';

function TextForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();
      setResult(data);
      setConfidence(data.confidence);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI vs Human Text Detector</h1>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          rows="6"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
        ></textarea>
        <button type="submit" disabled={loading || !text.trim()}>
          {loading ? "Analyzing..." : "Detect"}
        </button>
      </form>

      {error && <div className="error">❌ {error}</div>}

      {result && (
        <div className="result">
          <h2>Result:</h2>
          <p>
            <strong>Label:</strong> {result.label}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence * 100}%
          </p>
          {confidence !== null && <AccuracyBar confidence={confidence*100} />}

        </div>
      )}
    </div>
  );
}

export default TextForm;
