import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const API_ENDPOINT_PORT = process.env.REACT_APP_API_ENDPOINT_PORT ?? "443";
const API_ENDPOINT_PROTOCOL = process.env.REACT_APP_API_ENDPOINT_PROTOCOL ?? "https";
const API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME ?? window.location.hostname;

export const AdminPage = () => {
  const [delta, setDelta] = useState(0);

  const baseURL = `${API_ENDPOINT_PROTOCOL}://${API_HOSTNAME}:${API_ENDPOINT_PORT}`;

  // ✅ 중복 호출 방지 플래그 & 최신 delta 보관
  const isProcessingRef = useRef(false);
  const deltaRef = useRef(delta);
  useEffect(() => { deltaRef.current = delta; }, [delta]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
    });

    scanner.render(
      async (decodedText) => {
        if (isProcessingRef.current) return; // 이미 처리 중이면 무시

        const cleanedText = decodedText.trim();
        if (!cleanedText.startsWith("{") || !cleanedText.endsWith("}")) {
          console.warn("잘못된 QR 포맷");
          return;
        }

        try {
          const qrData = JSON.parse(cleanedText);
          const userId = qrData.id;
          if (!userId) return;

          if (!deltaRef.current || Number.isNaN(deltaRef.current)) {
            alert("포인트 증감 값을 먼저 입력하세요.");
            return;
          }

          // ✅ 중복 방지 락 설정
          isProcessingRef.current = true;

          await axios.put(`${baseURL}/auth/user/${userId}`, {
            point: deltaRef.current,
          });

          // 스캐너 정리 후 바로 리다이렉트
          await scanner.clear().catch(() => {});
          window.location.replace('/admin'); // 또는 navigate('/admin')
        } catch (err) {
          console.error("QR 처리 오류:", err);
          // 실패 시에도 락 해제(원하면 유지해도 됨)
          isProcessingRef.current = false;
        }
      },
      (errorMessage) => {
        // 인식 실패 로그 (필요시)
        // console.warn("QR 스캔 오류:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((e) => console.error('Scanner clear 실패:', e));
    };
  }, []); // ✅ 스캐너는 한 번만 생성

  return (
    <div className="App">
      <div className="App-body">
        <div className='common-label'>포인트 증가/감소</div>
        <div className="nes-field common-input">
          <input
            type="number"
            name="number"
            value={delta}
            onChange={(e) => setDelta(parseInt(e.target.value, 10) || 0)}
            className="nes-input common-input-box"
          />
        </div>
        <div id="reader" style={{ width: '300px' }} />
      </div>
    </div>
  );
};
