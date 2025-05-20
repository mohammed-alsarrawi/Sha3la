import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterRole, setFilterRole] = useState("all");

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
      await axios.put(
        `http://localhost:5000/api/users/${id}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );

      // Use a more subtle notification instead of alert
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg";
      notification.textContent = "تم تحديث الدور بنجاح";
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    } catch (error) {
      // Show error notification
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg";
      notification.textContent = "حدث خطأ أثناء تحديث الدور";
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const deleteUser = async (id) => {
    // Confirmation dialog
    if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));

      // Success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg";
      notification.textContent = "تم حذف المستخدم بنجاح";
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    } catch (error) {
      // Error notification
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg";
      notification.textContent = "حدث خطأ أثناء حذف المستخدم";
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            مدير
          </span>
        );
      case "agency":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            وكالة
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
            مستخدم
          </span>
        );
    }
  };

  const getStatusBadge = (isApproved) => {
    return isApproved ? (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
        مفعل
      </span>
    ) : (
      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
        غير مفعل
      </span>
    );
  };

  const filteredUsers =
    filterRole === "all"
      ? users
      : users.filter((user) => user.role === filterRole);

  return (
    <div className="bg-gray-50 min-h-screen py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                إدارة المستخدمين
              </h1>
              <div className="mt-3 sm:mt-0 flex space-x-2 space-x-reverse">
                <select
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">جميع المستخدمين</option>
                  <option value="admin">مدراء</option>
                  <option value="agency">وكالات</option>
                  <option value="user">مستخدمين عاديين</option>
                </select>
                <button
                  onClick={fetchUsers}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  تحديث
                </button>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 p-4 m-4 rounded-md">
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                لا يوجد مستخدمين
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                لم يتم العثور على مستخدمين مطابقين للمعايير المحددة
              </p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && filteredUsers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الاسم والبريد الإلكتروني
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الدور
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الحالة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.isApproved)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="relative inline-block text-right">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                              onClick={() => {
                                const dropdown = document.getElementById(`dropdown-${user._id}`);
                                dropdown.classList.toggle('hidden');
                              }}
                            >
                              <span>تغيير الدور</span>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <div
                              id={`dropdown-${user._id}`}
                              className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                            >
                              <div className="py-1" role="menu" aria-orientation="vertical">
                                <button
                                  onClick={() => {
                                    updateRole(user._id, "user");
                                    document.getElementById(`dropdown-${user._id}`).classList.add('hidden');
                                  }}
                                  className="w-full text-right px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                                  role="menuitem"
                                >
                                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  مستخدم
                                </button>
                                <button
                                  onClick={() => {
                                    updateRole(user._id, "agency");
                                    document.getElementById(`dropdown-${user._id}`).classList.add('hidden');
                                  }}
                                  className="w-full text-right px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                                  role="menuitem"
                                >
                                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                  وكيل
                                </button>
                                <button
                                  onClick={() => {
                                    updateRole(user._id, "admin");
                                    document.getElementById(`dropdown-${user._id}`).classList.add('hidden');
                                  }}
                                  className="w-full text-right px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                                  role="menuitem"
                                >
                                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  مدير
                                </button>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="حذف المستخدم"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
