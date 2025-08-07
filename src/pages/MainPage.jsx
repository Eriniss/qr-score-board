import { QRCodeCanvas } from 'qrcode.react';

export const UserQRCodePage = () => {
    const [id, gender, name, group, point] = ["test_id", "남", "가나다", "라마", "3000"]
    const data = JSON.stringify({ id, gender, name, group, point });

    return (
    <div className="App">
        <nav
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            height: '72px',
            width: '100%',
            zIndex: '100',
            padding: '0 16px',
            color: 'white'
        }}
        >
        {/* 좌측 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="nes-icon trophy" />
            <p style={{ margin: 0, fontWeight: 'bold' }}>{name} ({gender})</p>
        </div>
        {/* 우측 */}
        <div style={{ fontWeight: 'bold' }}>{group} 목장</div>
        </nav>
        <div className="App-body">
            <div className='Main-qr'>
                <QRCodeCanvas className='Main-qr-box' value={data} size={200} />
                <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center' }}>
                    <i class="nes-icon coin" style={{ marginRight: 48}}></i>
                    <h1>{point} P</h1>
                </div>
            </div>
        </div>
    </div>
    );
};