import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      setError("حدث خطأ أثناء جلب المستخدمين");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, newRole) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${id}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      setUsers(prev =>
        prev.map(user => (user._id === id ? { ...user, role: newRole } : user))
      );
      alert("تم تحديث الدور");
    } catch (error) {
      alert("حدث خطأ أثناء تحديث الدور");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        withCredentials: true,
      });
      setUsers(prev => prev.filter(user => user._id !== id));
      alert("تم حذف المستخدم");
    } catch (error) {
      alert("حدث خطأ أثناء حذف المستخدم");
    }
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-right">
        إدارة المستخدمين
      </h1>
      {loading && <p>جاري تحميل المستخدمين...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && users.length > 0 ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">الاسم</th>
              <th className="border p-3">البريد الإلكتروني</th>
              <th className="border p-3">الدور</th>
              <th className="border p-3">الحالة</th>
              <th className="border p-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3">{user.role}</td>
                <td className="border p-3">{user.isApproved ? "مفعل" : "غير مفعل"}</td>
                <td className="border p-3">
                  {/* أزرار لتحديث الدور */}
                  <select
                    value={user.role}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="admin">admin</option>
                    <option value="agency">agency</option>
                    <option value="user">user</option>
                  </select>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="text-center">لا توجد مستخدمين حالياً</p>
      )}
    </div>
  );
};

export default UserManagement;
