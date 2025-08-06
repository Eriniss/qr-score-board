import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
    const navigate = useNavigate();

    return(
        <div className="App">
            <div className="App-body">
                <div className='common-label'>아이디</div>
                <div className="nes-field common-input">
                    <input type="text" id="username" className="nes-input common-input-box" />
                </div>
                <div className='common-label'>비밀번호</div>
                <div className="nes-field common-input">
                    <input type="password" id="username" className="nes-input common-input-box" />
                </div>
                <div className='common-label'>비밀번호 확인</div>
                <div className="nes-field common-input">
                    <input type="password" id="username" className="nes-input common-input-box" />
                </div>
                <div className='common-label'>목장</div>
                <div className="nes-field common-input">
                    <input type="text" id="username" className="nes-input common-input-box" />
                </div>
                <div className='common-label'>성별</div>
                <div class="nes-select common-select">
                <select required id="default_select" class="common-select-box">
                    <option value="" disabled selected hidden>Select...</option>
                    <option value="0">남</option>
                    <option value="1">여</option>
                </select>
                </div>
                <button type="button" className="nes-btn is-success common-button">회원가입</button>
                <button type="button" className="nes-btn common-button" onClick={() => navigate('/')}>취소</button>
            </div>
        </div>
    )
}