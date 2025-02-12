import { DefaultContext } from '@/contexts/defaultContext';
import api from '@/services/api';
import PreFeedBack from '@/utils/feedbackStatus';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {onShowFeedBack} = useContext(DefaultContext)


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

  const onError= (e: any) => {
    onShowFeedBack(PreFeedBack.error(e?.response?.data ?? 'Falhou ao ler QR Code'))
    console.log('[ERROR API /launcherPoints/generateQrCode/qrCode]', e?.response?.data)
  }

  const onSucess = () => {
    onShowFeedBack(PreFeedBack.success('Pontos lançados com sucesso!'))

  }

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


  const onScannerResult = useCallback((result: any) => {
    api.post(`/launcherPoints/qrCode/${Number(result)}`)
      .then(onSucess)
      // .catch((err) => onError(err))
      .finally(() => setLoading(true))
  },[])
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
          scanDelay={5000}
          onResult={onScannerResult}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default QrCodeContent;
