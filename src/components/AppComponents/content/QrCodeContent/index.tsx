import React, { useState } from 'react';
import {QrReader} from "react-qr-reader";
import { useRouter } from "next/navigation";
import {QRCodeSVG} from 'qrcode.react';

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);


  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-10'>QR Code</h1>
      <p className='text-black text-2xl font-light text-center'>Faça a leitura do QR Code</p>

      <QrReader
        constraints={{facingMode: "environment"}}
        scanDelay={2000}
        onResult={(result, error ) => {
          if(result) router.push((result as any)?.text);
        }}
        className='mt-auto'
      
      />
      
        <p>{data ? data?.text : ''}</p>

      
    </div>
  );
};

export default QrCodeContent;
