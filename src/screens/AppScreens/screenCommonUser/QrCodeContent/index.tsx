import React from 'react';
import { QrReader } from "react-qr-reader";


interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {


  const handleScanResult = (result: any, error: any) => {
    if(result){
      console.log(result, 'LEITURA CONCLUIDA');
    } else {

    }
  }

  return (
    <div className="h-full" hidden={hidden}>
        <div >
          <h1 className='text-black text-3xl font-bold text-center mb-2'>QR Code</h1>
          <p className='text-black text-2xl font-light text-center mb-4'>Faça a leitura do QR Code</p>
        </div>
        <div>
          <QrReader
            constraints={{facingMode: "environment"}}
            scanDelay={2000}
            onResult={handleScanResult}
            className='mt-auto'
          />
        </div>



      
    </div>
  );
};

export default QrCodeContent;
