import React, { useState } from 'react';
import {QrReader} from "react-qr-reader";

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleError = (err: any) => {
    console.error(err);
    setLoadingScan(false);
  };

  const handleScan = async (scanData: any) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };

  return (
    <div className="App" hidden={hidden}>
      <h1>Hello CodeSandbox</h1>
      <h2>Last Scan: {data || "No scan yet"}</h2>

      <button
        onClick={() => {
          setStartScan(!startScan);
          setLoadingScan(false);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>

          <p> TESTE DO DEPLOY</p>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px" }}
          />

        
      )}
    </div>
  );
};

export default QrCodeContent;
