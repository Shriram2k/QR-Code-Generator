import { useState } from "react";
const QRCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("Instagram.com");
  const [qrSize, setQrSize] = useState("150");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&light=0000&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error with Genrerating QR Code", error);
    } finally {
      setLoading(false);
    }
  }
  function downloadQR() {
    fetch(img)
      .then((Response) => Response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QRcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error in Downloading QR Code", error);
      });
  }

  return (
    <div className="app-container">
      <img src="vite.svg" alt="QR Code" className="head" />
      <h1>QR CODE Generator</h1>
      {loading && <p>Please Wait...</p>}
      {img && <img src={img} alt="QR Code" className="qr-code-image" />}
      <div>
        <label htmlFor="datainput" className="input-label">
          Data for QR Code:
        </label>
        <input
          type="text"
          value={qrData}
          id="datainput"
          onChange={(event) => setQrData(event.target.value)}
          placeholder="Enter Data for QR Code"
        />
        <label htmlFor="sizeinput" className="input-label">
          Image size (0-1000 pixel);
        </label>
        <input
          type="text"
          id="sizeinput"
          onChange={(event) => setQrSize(event.target.value)}
          value={qrSize}
          placeholder="Enter image size"
        />
        <button
          className="generate-button"
          onClick={generateQR}
          disabled={loading}
        >
          Generate QR Code
        </button>
        <button className="download-button" onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCode;
