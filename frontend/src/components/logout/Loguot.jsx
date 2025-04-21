// src/components/Logout.jsx
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/auth/logout",
          {},
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        navigate("/");
      }
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      جاري تسجيل الخروج...
    </div>
  );
}
