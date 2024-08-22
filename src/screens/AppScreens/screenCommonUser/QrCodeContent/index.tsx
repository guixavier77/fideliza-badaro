import React, { useContext, useEffect, useState } from 'react';
import {QrReader} from "react-qr-reader";
import { useRouter } from "next/navigation";
import {QRCodeSVG} from 'qrcode.react';
import { DefaultContext } from '@/contexts/defaultContext';
import { ROLE } from '@/utils/types/roles';
import Loading from '@/components/GlobalComponents/loading';

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const router = useRouter();
  const {user} = useContext(DefaultContext)
  const [loading, setloading] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [visibleQrScanner, setVisibleQrScanner] = useState<boolean>(false);
  
  const generateQrCode = () => {
    setQrCodeValue('TESTE')
    
  }
  useEffect(() => {
    if(!hidden) {
      setloading(true);
      if(user?.role === ROLE.ADMIN || user?.role === ROLE.OPERATOR) {
        generateQrCode();
      } else {
        setVisibleQrScanner(true);
      }

      setloading(false);
    }
  },[user, hidden])


  const handleScanResult = (result: any, error: any) => {
    if(result) router.push((result as any)?.text);
  }



  return (
    <div className="h-full" hidden={hidden}>
        <div >
          <h1 className='text-black text-3xl font-bold text-center mb-2'>QR Code</h1>
          <p className='text-black text-2xl font-light text-center mb-4'>Faça a leitura do QR Code</p>
        </div>

        {loading ?
          <div>
            <Loading text="Importando dados..." />
          </div>
          :
          <div>
            {visibleQrScanner ? 
              <>
                <QrReader
                  constraints={{facingMode: "environment"}}
                  scanDelay={2000}
                  onResult={handleScanResult}
                  className='mt-auto'
                />
              </> : 
              <>
                <QRCodeSVG 
                  value={qrCodeValue}
                />
              </>
            }
          </div>
        
        }



      
    </div>
  );
};

export default QrCodeContent;
