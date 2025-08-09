import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_ENDPOINT_PORT = process.env.REACT_APP_API_ENDPOINT_PORT ?? "443";
const API_ENDPOINT_PROTOCOL = process.env.REACT_APP_API_ENDPOINT_PROTOCOL ?? "https";
const API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME ?? window.location.hostname;

export const AdminListPage = () => {
    const navigate = useNavigate();
  const baseURL = `${API_ENDPOINT_PROTOCOL}://${API_HOSTNAME}:${API_ENDPOINT_PORT}`;

  const [users, setUsers] = useState([]);      // ✅ 사용자 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 메시지

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/auth/users`);
      // API 응답이 배열이라고 가정
      setUsers(Array.isArray(res.data) ? res.data : res.data?.users ?? []);
      setError(null);
    } catch (err) {
      console.error("불러오기 실패:", err);
      setError("유저 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="App-body">
        <div className="Admin-list">
          <div className="nes-table-responsive">
            <table className="nes-table is-bordered is-centered">
              <thead>
                <tr>
                  <th>아이디(Email)</th>
                  <th>이름(Name)</th>
                  <th>목장(Group)</th>
                  <th>성별(Gender)</th>
                  <th>포인트(Point)</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5}>불러오는 중...</td>
                  </tr>
                )}

                {error && !loading && (
                  <tr>
                    <td colSpan={5}>{error}</td>
                  </tr>
                )}

                {!loading && !error && users.length === 0 && (
                  <tr>
                    <td colSpan={5}>등록된 사용자가 없습니다.</td>
                  </tr>
                )}

                {!loading && !error && users.map((u, idx) => {
                  const email  = u.email  ?? u.Email  ?? "";
                  const name   = u.name   ?? u.Name   ?? "";
                  const group  = u.group  ?? u.Group  ?? "";
                  const gender = u.gender ?? u.Gender ?? "";
                  const point  = u.point  ?? u.Point  ?? 0;

                  return (
                    <tr key={u.id ?? u.ID ?? idx}>
                      <td>{email}</td>
                      <td>{name}</td>
                      <td>{group}</td>
                      <td>{gender}</td>
                      <td>{point}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="nes-btn" onClick={() => navigate("/admin/21232f297a57a5a743894a0e4a801fc3")} style={{ marginTop: 12, marginRight: 12 }}>QR스캔 페이지로</button>
            <button className="nes-btn" onClick={fetchUsers} style={{ marginTop: 12 }}>새로고침</button>
          </div>
        </div>
      </div>
    </div>
  );
};
