import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

interface QrCodeContentProps {
  hidden: boolean;
}

const QrCodeContent: React.FC<QrCodeContentProps> = ({ hidden }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Solicita permissão para acessar a câmera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  const handleScanResult = (result: any, error: any) => {
    if (result) {
      console.log(result, "LEITURA CONCLUÍDA");
    }
  };

  return (
    <div className="h-full" hidden={hidden}>
      <div>
        <h1 className="text-black text-3xl font-bold text-center mb-2">
          QR Code
        </h1>
        <p className="text-black text-2xl font-light text-center mb-4">
          Faça a leitura do QR Code
        </p>
      </div>

      <div>
        {hasPermission === null ? (
          <p className="text-center text-black">Verificando permissão...</p>
        ) : hasPermission === false ? (
          <p className="text-center text-red-500">
            Permissão negada. Ative a câmera manualmente.
          </p>
        ) : (
          <QrReader
            constraints={{ facingMode: "environment" }}
            scanDelay={2000}
            onResult={handleScanResult}
            className="mt-auto"
          />
        )}
      </div>
    </div>
  );
};

export default QrCodeContent;
