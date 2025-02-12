import React, { useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";
import { Scanner } from '@yudiel/react-qr-scanner';

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {



  const handleScanResult = (result: any) => {
    if (result) {
      console.log(result, 'LEITURA CONCLUIDA');
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="h-full" hidden={hidden}>
      <div>
        <h1 className='text-black text-3xl font-bold text-center mb-2'>QR Code</h1>
        <p className='text-black text-2xl font-light text-center mb-4'>Faça a leitura do QR Code</p>
      </div>


         <QrReader
          constraints={{ facingMode: "environment" }}
          scanDelay={300}
          onResult={handleScanResult}
        />
    </div>
  );
};

export default QrCodeContent;
