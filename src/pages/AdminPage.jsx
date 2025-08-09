import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const API_ENDPOINT_PORT = process.env.REACT_APP_API_ENDPOINT_PORT ?? "443";
const API_ENDPOINT_PROTOCOL = process.env.REACT_APP_API_ENDPOINT_PROTOCOL ?? "https";
const API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME ?? window.location.hostname;

export const AdminPage = () => {
  const [delta, setDelta] = useState();
  const [isSubtract, setIsSubtract] = useState(false); // ✅ 차감 여부 상태

  const baseURL = `${API_ENDPOINT_PROTOCOL}://${API_HOSTNAME}:${API_ENDPOINT_PORT}`;

  // ✅ 중복 호출 방지 플래그 & 최신 값 보관
  const isProcessingRef = useRef(false);
  const deltaRef = useRef(delta);
  const isSubtractRef = useRef(isSubtract);

  useEffect(() => { deltaRef.current = delta; }, [delta]);
  useEffect(() => { isSubtractRef.current = isSubtract; }, [isSubtract]);

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

          let pointValue = deltaRef.current;
          if (!pointValue || Number.isNaN(pointValue)) {
            alert("포인트 증감 값을 먼저 입력하세요.");
            return;
          }

          // ✅ 차감 체크 시 음수로 변환
          if (isSubtractRef.current) {
            pointValue = -Math.abs(pointValue);
          }

          isProcessingRef.current = true;

          await axios.put(`${baseURL}/auth/user/${userId}`, {
            point: pointValue,
          });

          await scanner.clear().catch(() => {});
          window.location.replace('/admin');
        } catch (err) {
          console.error("QR 처리 오류:", err);
          isProcessingRef.current = false;
        }
      }
    );

    return () => {
      scanner.clear().catch((e) => console.error('Scanner clear 실패:', e));
    };
  }, []);

  return (
    <div className="App">
      <div className="App-body">
        <div className='common-label'>포인트</div>
        <div className="nes-field">
          <input
            type="number"
            name="number"
            value={delta}
            onChange={(e) => setDelta(parseInt(e.target.value, 10))}
            className="nes-input common-input-box"
          />
          <label>
            <input
              type="checkbox"
              className="nes-checkbox"
              checked={isSubtract}
              onChange={(e) => setIsSubtract(e.target.checked)}
            />
            <span>차감</span>
          </label>
        </div>
        <div id="reader" style={{ width: '300px' }} />
      </div>
    </div>
  );
};
