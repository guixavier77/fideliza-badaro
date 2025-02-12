import React, { useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

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

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop()); // Para liberar a câmera
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão da câmera:", error);
      alert("Por favor, permita a câmera nas configurações do navegador.");
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
        <div className="text-center">
          <p className="text-red-600 mb-4">Acesso à câmera negado. Clique abaixo para tentar novamente.</p>
          <button
            onClick={requestCameraPermission}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Permitir Câmera
          </button>
        </div>
      ) : (
        <QrReader
          constraints={{ facingMode: "environment" }}
          scanDelay={300}
          onResult={(result) => {
            if (result) alert(`${result} leitura`);
          }}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default QrCodeContent;
