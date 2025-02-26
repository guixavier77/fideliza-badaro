import { DefaultContext } from '@/contexts/defaultContext';
import api from '@/services/api';
import PreFeedBack from '@/utils/feedbackStatus';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import ButtonStyled from '@/components/GlobalComponents/button';

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { onShowFeedBack } = useContext(DefaultContext);

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const permission = await navigator.permissions.query({ name: 'camera' as any });
        setHasPermission(permission.state === 'granted');
        permission.onchange = () => {
          setHasPermission(permission.state === 'granted');
        };
      } catch (error) {
        console.error("Erro ao verificar permissão da câmera:", error);
        setHasPermission(false);
      }
    };

    checkCameraPermission();
  }, []);

  const onError = (e: any) => {
    const errorMessage = e?.response?.data?.msg || e?.response?.data || 'Falhou ao ler QR Code';
    onShowFeedBack(PreFeedBack.error(errorMessage));
    console.log('[ERROR API /launcherPoints/qrCode/qrCode]', errorMessage);
  };

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Pontos lançados com sucesso!'));
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop()); // Para liberar a câmera após permissão
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão da câmera:", error);
      alert("Por favor, permita a câmera nas configurações do navegador.");
    }
  };

  const onScannerResult = useCallback((result: any) => {
    if (!result) return;

    let qrCodeReplace = result.replace('qrCode:', '').trim(); 

    if (qrCodeReplace) {
      api.post(`launcherPoints/qrCode/${qrCodeReplace}`)
        .then(onSuccess)
        .catch((err) => onError(err))
        .finally(() => setLoading(false)); 
    }
  }, []);

  return (
    <div hidden={hidden} className='h-full'>
      <div>
        <h1 className='text-black text-3xl font-bold text-center mb-2'>QR Code</h1>
        <p className='text-black text-2xl font-light text-center mb-4'>Faça a leitura do QR Code</p>
      </div>

      {hasPermission === null ? (
        <p className="text-center text-gray-600">Verificando permissão da câmera...</p>
      ) : hasPermission === false ? (
        <div className="h-full pb-24 flex flex-col justify-between">
          <div className='text-center'>
            <p>{'Acesso à câmera negado.'}</p>
            <p className="mb-4">{'Clique abaixo para tentar novamente.'}</p>
          </div>

          <div className='mb-48'>
            <ButtonStyled
              type="button"
              onClick={requestCameraPermission}
              styles="w-full"
              title="Permitir Câmera"
              bgColor='bg-red'

            />
          </div>
    
        </div>
      ) : (
        <div className='h-screen center'>
            <Scanner
              onScan={(detectedCodes) => {
                if (detectedCodes && detectedCodes.length > 0) {
                  onScannerResult(detectedCodes[0].rawValue);
                }
              }}
              onError={(error) => {
                console.log(`onError: ${error}`);
              }}
              styles={{ container: { height: "400px", width: "350px" } }}
              components={{
                audio: true,
                onOff: true,
                torch: true,
                zoom: true,
                finder: true,
              }}
              scanDelay={2000}
            />
        </div>
      )}
    </div>
  );
};

export default QrCodeContent;
