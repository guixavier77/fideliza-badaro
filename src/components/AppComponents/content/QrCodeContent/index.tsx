import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import ButtonStyled from '@/components/button';

const QrCodeContent = ({ hidden }) => {
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Se a permissão for concedida, atualize o estado
      setCameraPermissionGranted(true);
      // Encerrar a stream para liberar a câmera
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      // Se ocorrer um erro ao solicitar a permissão, trate-o aqui
      console.error('Erro ao solicitar permissão de câmera:', error);
    }
  };

  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center'>QRCODE</h1>
      {!cameraPermissionGranted && (
        <ButtonStyled title="Permitir acesso a câmera" onClick={requestCameraPermission} />
      )}
      {cameraPermissionGranted && (
        <div className='mt-4'>
          <Scanner
            enabled={true}
            onResult={(text, result) => console.log(text, result)}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      )}
    </div>
  );
};

export default QrCodeContent;
