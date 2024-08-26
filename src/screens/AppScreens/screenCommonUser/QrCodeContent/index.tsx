import React, { useContext, useEffect, useState } from 'react';
import {QrReader} from "react-qr-reader";
import { useRouter } from "next/navigation";

import { DefaultContext } from '@/contexts/defaultContext';
import ModalFeedBackStatus from '@/components/GlobalComponents/modals/ModalFeedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { STATUS } from '@/utils/types/feedback';

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const router = useRouter();
  const {user} = useContext(DefaultContext)
  const [openFeeback, setOpenFeedback] = useState(false);


  const handleScanResult = (result: any, error: any) => {
    if(result){
      console.log('LEITURA CONCLUIDA');
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


        <ModalFeedBackStatus 
          open={openFeeback}
          title='SUCESSO!'
          description='Algo de errado não está certo!'
          status={STATUS.SUCCESS}
          setIsClose={() => setOpenFeedback(false)}

        
        />
      
    </div>
  );
};

export default QrCodeContent;
