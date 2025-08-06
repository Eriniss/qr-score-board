import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="App-body">
        <div className='common-label'>아이디</div>
        <div className="nes-field common-input">
          <input type="text" id="username" className="nes-input common-input-box" />
        </div>
        <div className='common-label'>비밀번호</div>
        <div className="nes-field common-input">
          <input type="password" id="password" className="nes-input common-input-box" />
        </div>
        <button type="button" className="nes-btn is-primary common-button">로그인</button>
        <button type="button" className="nes-btn common-button" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  );
}