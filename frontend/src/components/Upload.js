import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { classifyImage } from '../services/api';

function Upload({ onPredict }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    onPredict([]); // Clear previous results on new upload
  };

  const handlePredict = async () => {
    setLoading(true);
    const predictions = [];

    for (const file of files) {
      try {
        const result = await classifyImage(file);
        predictions.push({ ...result, file });
      } catch (error) {
        predictions.push({ file, label: 'Error', confidence: 0 });
      }
    }

    onPredict(predictions);
    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>
          Drag & Drop Image(s) here <br />
          or <span style={{ color: 'violet' }}>Browse Image</span>
        </p>
      </div>

      <div className="image-preview">
        {files.map((file, i) => (
          <img
            key={i}
            src={URL.createObjectURL(file)}
            alt={`preview-${i}`}
            className="preview-image"
          />
        ))}
      </div>

      {files.length > 0 && (
        <button className="predict-button" onClick={handlePredict} disabled={loading}>
          {loading ? 'Predicting...' : 'PREDICT'}
        </button>
      )}
    </div>
  );
}

export default Upload;
