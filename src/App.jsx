import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <div className='common-label'>아이디</div>
        <div class="nes-field" className="common-input">
          <input type="text" id="name_field" class="nes-input common-input-box" />
        </div>
        <div className='common-label'>비밀번호</div>
        <div class="nes-field" className="common-input">
          <input type="text" id="name_field" class="nes-input common-input-box" />
        </div>
        <button type="button" className="nes-btn is-primary common-button">로그인</button>
        <button type="button" className="nes-btn common-button">회원가입</button>
      </div>
    </div>
  );
}

export default App;
