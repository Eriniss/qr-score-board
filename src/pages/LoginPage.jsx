import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ 컴포넌트 밖(모듈 스코프)에 고정값 배치: 렌더와 무관
const API_ENDPOINT_PORT = process.env.REACT_APP_API_ENDPOINT_PORT ?? "443";
const API_ENDPOINT_PROTOCOL = process.env.REACT_APP_API_ENDPOINT_PROTOCOL ?? "https";
const API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME ?? window.location.hostname;

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseURL = `${API_ENDPOINT_PROTOCOL}://${API_HOSTNAME}:${API_ENDPOINT_PORT}`;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/auth/sign_in`, {
        email,
        password,
      });

      alert("로그인 성공!");
      sessionStorage.setItem("loginData", JSON.stringify(response.data));
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/main");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 아이디와 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="App">
      <div className="App-body">
        <div className='common-label'>아이디</div>
        <div className="nes-field common-input">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="nes-input common-input-box"
          />
        </div>

        <div className='common-label'>비밀번호</div>
        <div className="nes-field common-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="nes-input common-input-box"
          />
        </div>

        <button type="button" className="nes-btn is-primary common-button" onClick={handleLogin}>
          로그인
        </button>
        <button type="button" className="nes-btn common-button" onClick={() => navigate('/signup')}>
          회원가입
        </button>
      </div>
    </div>
  );
};
