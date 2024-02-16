import React, { useState } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import '../../Style/UploadPdf.css';
import { pdfjs, Document } from 'react-pdf';

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = async function(event) {
      const pdfData = new Uint8Array(event.target.result);

      try {
        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        let text = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const pageText = await page.getTextContent();
          text += pageText.items.map(item => item.str).join(' ');
        }

        setPdfText(text);

        // Send text to server using Axios
        await axios.post('/api/uploadText', { text });

        toast.success('Upload Successful');
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading file. Please try again.');
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> 
      <div className="container">
        <h1>Upload PDF</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {pdfText && (
          <div className="pdf-text">
            <h2>Extracted Text:</h2>
            <p>{pdfText}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UploadPdf;
