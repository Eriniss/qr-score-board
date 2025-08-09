import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginPage = () => {
    const navigate = useNavigate();

    // ✅ id, password를 상태로 관리
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ✅ 로그인 버튼 클릭 시 실행
    const handleLogin = async () => {
    try {
        const response = await axios.post("https://49.167.214.132:8080/auth/sign_in", {
            email: email,
            password: password
        });

        console.log("로그인 성공:", response.data);
        alert("로그인 성공!");

        // ✅ 로그인 성공 데이터 sessionStorage에 저장
        // 전체 응답 데이터 저장
        sessionStorage.setItem("loginData", JSON.stringify(response.data));

        // 개별 필드 저장 (필요 시)
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));

        // 페이지 이동
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

                <button
                    type="button"
                    className="nes-btn is-primary common-button"
                    onClick={handleLogin}
                >
                    로그인
                </button>
                <button
                    type="button"
                    className="nes-btn common-button"
                    onClick={() => navigate('/signup')}
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};
