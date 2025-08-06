import { QRCodeCanvas } from 'qrcode.react';

export const UserQRCodePage = () => {
    const [id, gender, point] = ["test-id", "test-gender", "test-point"]
    console.log(id)
    const data = JSON.stringify({ id, gender, point });

    return (
    <div className="App">
        <div className="App-body">
            <div className='Main-qr'>
                <QRCodeCanvas className='Main-qr-box' value={data} size={200} />
                <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center' }}>
                    <i class="nes-icon coin" style={{ marginRight: 48}}></i>
                    <h1>3000 P</h1>
                </div>
            </div>
        </div>
    </div>
    );
};