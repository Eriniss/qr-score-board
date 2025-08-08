import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export const AdminPage = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true
    });

    scanner.render(
      (decodedText, decodedResult) => {
        console.log("스캔 결과:", decodedText);
        // 이곳에서 useState 등으로 저장하거나 API 전송
      },
      (errorMessage) => {
        // 오류 로그
        console.warn("QR 스캔 오류:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((e) => console.error('Scanner clear 실패:', e));
    };
  }, []);

  return <div id="reader" style={{ width: '300px' }} />;
};
