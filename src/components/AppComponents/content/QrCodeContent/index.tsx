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

      <QrReader
        constraints={{facingMode: "environment"}}
        scanDelay={1000}
        onResult={(result, error) => {
          if (!!result) {
            console.log(result);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        
      />

      
    </div>
  );
};

export default QrCodeContent;
