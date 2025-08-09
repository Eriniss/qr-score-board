import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_ENDPOINT_PORT = process.env.REACT_APP_API_ENDPOINT_PORT ?? "8080";
const API_ENDPOINT_PROTOCOL = process.env.REACT_APP_API_ENDPOINT_PROTOCOL ?? "https";
const hostname = window.location.hostname;

export const UserQRCodePage = () => {
    const [point, setPoint] = useState("");
    const [userData, setUserData] = useState({ id: "", gender: "", name: "", group: "" });
    const navigate = useNavigate();

    const baseURL = `${API_ENDPOINT_PROTOCOL}://${hostname}:${API_ENDPOINT_PORT}`;

    // 세션에서 user 데이터 불러오기
    useEffect(() => {
        const sessionData = sessionStorage.getItem('user');
        if (sessionData) {
            try {
                const parsed = JSON.parse(sessionData);
                setUserData({
                    id: parsed.id,
                    gender: parsed.gender,
                    name: parsed.name,
                    group: parsed.group
                });
            } catch (err) {
                console.error("세션 데이터 파싱 오류:", err);
            }
        }
    }, []);

    const fetchPoint = async () => {
            try {
                const response = await axios.get(`${baseURL}/auth/user/${userData.id}`);
                console.log("불러오기 성공:", response.data);
                setPoint(response.data.point);
            } catch (error) {
                console.error("불러오기 실패:", error);
            }
        };

    // point 불러오기
    useEffect(() => {
        if (!userData.id) return; // id 없으면 API 호출 안 함
        fetchPoint();
    }, [userData.id]); // id가 세팅된 이후에만 실행

    // QR 코드 데이터
    const data = JSON.stringify({ ...userData, point });

    const handleClickLogout = () => {
        sessionStorage.clear();
        window.alert('로그아웃 되었습니다')
        navigate('/')
    }

    return (
        <div className="App">
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                height: '72px',
                width: '100%',
                zIndex: '100',
                padding: '0 16px',
                color: 'white'
            }}>
                {/* 좌측 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="nes-icon trophy" />
                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                        {userData.name} ({userData.gender})
                    </p>
                </div>
                {/* 우측 */}
                <div style={{ fontWeight: 'bold' }}>{userData.group} 목장</div>
            </nav>
            <div className="App-body">
                <div className='Main-qr'>
                    <QRCodeCanvas className='Main-qr-box' value={data} size={200} />
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <i className="nes-icon coin" style={{ marginRight: 48 }}></i>
                        <h1>{point} P</h1>
                        <div style={{ marginLeft: '10px'}}>
                            <button className='nes-btn is-primary' onClick={() => fetchPoint()}>NEW</button>
                        </div>
                    </div>
                </div>
                <button className='nes-btn' onClick={() => handleClickLogout()}>로그아웃</button>
            </div>
        </div>
    );
};
