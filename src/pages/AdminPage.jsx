import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

export const AdminPage = () => {
  const [delta, setDelta] = useState(0); // 포인트 증감 값

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true
    });

    scanner.render(
  async (decodedText) => {
    const cleanedText = decodedText.trim();
    console.log("스캔 결과:", cleanedText);

    // JSON 형식 체크
    if (!cleanedText.startsWith("{") || !cleanedText.endsWith("}")) {
      console.warn("잘못된 QR 포맷");
      return;
    }

    try {
      const qrData = JSON.parse(cleanedText);
      const userId = qrData.id;
      if (!userId) return;

      if (delta === 0) {
        alert("포인트 증감 값을 먼저 입력하세요.");
        return;
      }

      await axios.put(`https://49.167.214.132:8080/auth/user/${userId}`, {
        point: delta
      });

      alert(`ID ${userId}의 포인트가 ${delta}만큼 변경되었습니다.`);

      // 스캔 일시 정지
      scanner.clear();
      setTimeout(() => {
        window.location.reload(); // 또는 scanner 다시 시작
      }, 3000);

    } catch (err) {
      console.error("QR 처리 오류:", err);
    }
  }
);

    return () => {
      scanner.clear().catch((e) => console.error('Scanner clear 실패:', e));
    };
  }, [delta]); // delta 변경 시 최신 값 반영

  return (
    <div className="App">
      <div className="App-body">
        <div className='common-label'>포인트 증가/감소</div>
        <div className="nes-field common-input">
          <input
            type="number"
            name="number"
            value={delta}
            onChange={(e) => setDelta(parseInt(e.target.value))}
            className="nes-input common-input-box"
          />
        </div>
        <div id="reader" style={{ width: '300px' }} />
      </div>
    </div>
  );
};
