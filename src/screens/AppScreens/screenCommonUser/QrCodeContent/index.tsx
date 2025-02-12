import React, { useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Função para solicitar permissão da câmera
    const requestCameraPermission = async () => {
      try {
        const permission = await navigator.permissions.query({ name: 'camera' as any });
        console.log(permission, 'permission');
        console.log( permission.state === 'denied', 'permission,state')
        if (permission.state === 'granted') {
          setHasPermission(true);
        } else {
          try {
            console.log('stream');
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (stream) {
              setHasPermission(true);
              stream.getTracks().forEach(track => track.stop());
            }
          } catch (error) {
            setHasPermission(false);
          }
        } 
      } catch (error) {
        console.error("Erro ao verificar permissão da câmera:", error);
        setHasPermission(false);
      }
    };

    requestCameraPermission();
  }, [hidden]);

  const handleScanResult = (result: any) => {
    if (result) {
      console.log(result, 'LEITURA CONCLUIDA');
    }
  };

  return (
    <div className="h-full" hidden={hidden}>
      <div>
        <h1 className='text-black text-3xl font-bold text-center mb-2'>QR Code</h1>
        <p className='text-black text-2xl font-light text-center mb-4'>Faça a leitura do QR Code</p>
      </div>

      {hasPermission === null ? (
        <p className="text-center text-gray-600">Verificando permissão da câmera...</p>
      ) : hasPermission === false ? (
        <p className="text-center text-red-600">
          Acesso à câmera negado. Ative a permissão nas configurações do navegador.
        </p>
      ) : (
        <div>
          <QrReader
            constraints={{ facingMode: "environment" }}
            scanDelay={2000}
            onResult={handleScanResult}
            className='mt-auto'
          />
        </div>
      )}
    </div>
  );
};

export default QrCodeContent;
