import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AgencyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/agency-requests", {
        withCredentials: true,
      });
      setRequests(res.data.requests);
      console.log(res.data.requests);
      setLoading(false);
    } catch (err) {
      setError("حدث خطأ أثناء جلب طلبات الوكالات");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/agency-requests/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );

      // Show success message
      if (newStatus === "مقبولة") {
        Swal.fire({
          title: "تم قبول الطلب بنجاح",
          text: "تم تحديث دور المستخدم إلى وكالة",
          icon: "success",
          confirmButtonText: "موافق"
        });
      } else if (newStatus === "مرفوضة") {
        Swal.fire({
          title: "تم رفض الطلب",
          text: "تم تحديث حالة الطلب إلى مرفوض",
          icon: "info",
          confirmButtonText: "موافق"
        });
      }
    } catch (err) {
      Swal.fire({
        title: "حدث خطأ",
        text: "حدث خطأ أثناء تحديث حالة الطلب",
        icon: "error",
        confirmButtonText: "موافق"
      });
    }
  };

  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  const getStatusBadge = (status) => {
    switch (status) {
      case "مقبولة":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            مقبولة
          </span>
        );
      case "مرفوضة":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            مرفوضة
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            قيد المراجعة
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                طلبات تسجيل الوكالات
              </h1>
              <div className="mt-3 sm:mt-0 flex space-x-2 space-x-reverse">
                <select
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">جميع الطلبات</option>
                  <option value="مقبولة">مقبولة</option>
                  <option value="مرفوضة">مرفوضة</option>
                  <option value="قيد المراجعة">قيد المراجعة</option>
                </select>
                <button
                  onClick={fetchRequests}
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
          {!loading && !error && filteredRequests.length === 0 && (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                لا توجد طلبات
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                لم يتم العثور على طلبات تسجيل للوكالات
              </p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && filteredRequests.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      اسم الوكالة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      معلومات الاتصال
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      العنوان
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                    >
                      الصورة
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
                  {filteredRequests.map((req) => (
                    <tr key={req._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {req.agencyName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {req.phoneNumber}
                        </div>
                        <div className="text-sm text-gray-500">{req.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {req.address}
                        </div>
                        <div className="text-sm text-gray-500">
                          {req.location}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {req.licenseImage ? (
                          <img
                            src={`http://localhost:5000/uploads/${req.licenseImage}`}
                            alt="ترخيص الوكالة"
                            className="h-16 w-16 object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-400 italic">لا يوجد</span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(req.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {req.status !== "مقبولة" && (
                          <button
                            onClick={() => updateStatus(req._id, "مقبولة")}
                            className="text-green-600 hover:text-green-900 ml-4"
                          >
                            قبول
                          </button>
                        )}
                        {req.status !== "مرفوضة" && (
                          <button
                            onClick={() => updateStatus(req._id, "مرفوضة")}
                            className="text-red-600 hover:text-red-900"
                          >
                            رفض
                          </button>
                        )}
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

export default AgencyRequests;
