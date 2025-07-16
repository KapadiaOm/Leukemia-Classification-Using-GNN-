import React from 'react';

function Result({ data }) {
  const { file, label, confidence } = data;

  return (
    <div className={`result-card ${label === 'Leukemia' ? 'positive' : 'negative'}`}>
      <img src={URL.createObjectURL(file)} alt="result" className="preview-image" />
      <div className="result-details">
        <h4>{label === 'Leukemia' ? '⚠️ Leukemia Detected' : '✅ No Leukemia Detected'}</h4>
        <p><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>
        <p><strong>File:</strong> {file.name}</p>
      </div>
    </div>
  );
}

export default Result;
