import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const SignupPage = () => {
    const navigate = useNavigate();

    // 입력값 상태 관리
    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        group: "",
        gender: ""
    });

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 회원가입 완료 버튼 클릭
    const handleSubmit = async () => {
        const { email, password, passwordConfirm, name, group, gender } = form;

        // 값이 하나라도 비어있는지 체크
        if (!email || !password || !passwordConfirm || !name || !group || !gender) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        // 비밀번호 확인
        if (password !== passwordConfirm) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post("https://192.168.219.154:8080/auth/user", {
                email,
                password,
                name,
                group,
                gender,
                point: 0
            });
            console.log("회원가입 성공:", response.data);
            alert("회원가입이 완료되었습니다!");
            navigate("/"); // 메인 페이지로 이동
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="App">
            <div className="App-body">
                <div className='common-label'>아이디</div>
                <div className="nes-field common-input">
                    <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="nes-input common-input-box"
                    />
                </div>

                <div className='common-label'>비밀번호</div>
                <div className="nes-field common-input">
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="nes-input common-input-box"
                    />
                </div>

                <div className='common-label'>비밀번호 확인</div>
                <div className="nes-field common-input">
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={form.passwordConfirm}
                        onChange={handleChange}
                        className="nes-input common-input-box"
                    />
                </div>

                <div className='common-label'>이름</div>
                <div className="nes-field common-input">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="nes-input common-input-box"
                    />
                </div>

                <div className='common-label'>목장</div>
                <div className="nes-field common-input">
                    <input
                        type="text"
                        name="group"
                        value={form.group}
                        onChange={handleChange}
                        className="nes-input common-input-box"
                    />
                </div>

                <div className='common-label'>성별</div>
                <div className="nes-select common-select">
                    <select
                        required
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="common-select-box"
                    >
                        <option value="" disabled hidden>Select...</option>
                        <option value="남">남</option>
                        <option value="여">여</option>
                    </select>
                </div>

                <button
                    type="button"
                    className="nes-btn is-success common-button"
                    onClick={handleSubmit}
                >
                    회원가입 완료
                </button>
                <button
                    type="button"
                    className="nes-btn common-button"
                    onClick={() => navigate('/')}
                >
                    취소
                </button>
            </div>
        </div>
    );
};
