'use client';
import { DefaultContext } from '@/contexts/defaultContext';
import api from '@/services/api';
import PreFeedBack from '@/utils/feedbackStatus';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

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
    onShowFeedBack(PreFeedBack.error(e?.response?.data ?? 'Falhou ao ler QR Code'));
    console.log('[ERROR API /launcherPoints/generateQrCode/qrCode]', e?.response?.data);
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

    let qrCodeReplace = result.replace('qrCode:', '').trim(); // Adiciona .trim() para evitar espaços extras

    if (qrCodeReplace) {
      api.post(`launcherPoints/qrCode/${qrCodeReplace}`)
        .then(onSuccess)
        .catch((err) => onError(err))
        .finally(() => setLoading(false));  // Desmarca o estado de loading após a requisição
    }
  }, []);

  return (
    <div hidden={hidden}>
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
      )}
    </div>
  );
};

export default QrCodeContent;
