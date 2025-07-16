import React, { useState } from 'react';
import Upload from './components/Upload';
import Result from './components/Result';
import './styles/App.css';

function App() {
  const [predictions, setPredictions] = useState([]);

  const handleResults = (newResults) => {
    setPredictions(newResults);
  };

  return (
    <div className="app-container">
      {/* Title */}
      <header className="app-header">
        <h1>Leukemia Classifier</h1>
      </header>

      <div className="main-content">
        <div className="upload-section">
          <Upload onPredict={handleResults} />
        </div>
        <div className="result-section">
          {predictions.map((result, index) => (
            <Result key={index} data={result} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
