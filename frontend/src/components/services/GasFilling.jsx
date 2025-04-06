import React, { useState } from "react";
import axios from "axios";

// مكون مُساعد لحقول الإدخال العامة
const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  ...rest
}) => (
  <div className={`form-group ${className}`}>
    {label && <label className="block mb-1 text-gray-700">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded"
      {...rest}
    />
  </div>
);

const GasFilling = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    area: "",
    date: "",
    timePreference: "",
    quantity: 200, // الحد الأدنى للطلب 200 لتر
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // التعامل مع تغيير المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // التعامل مع تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(formData.quantity) < 200) {
      alert("الكمية يجب أن تكون 200 لتر أو أكثر للتوصيل المجاني");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/vehicles/request", formData);
      alert("تم تقديم طلب تعبئة الغاز بنجاح!");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تقديم الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen py-16"
      dir="rtl"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
        {/* العمود الأيمن: المحتوى التفصيلي */}
        <div className="lg:w-2/3 bg-white p-6 rounded shadow overflow-y-auto">
          {/* مقدمة الخدمة */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800 text-right">
              طلب سيارات تعبئة الغاز
            </h1>
            <p className="text-gray-700 text-right mt-4">
              نقدم خدمة تعبئة الغاز باستخدام سيارات مجهزة بأحدث التقنيات لتلبية
              احتياجات المنازل والشركات والمطاعم. سيارات تعبئة الغاز هي التي
              تقوم بتعبئة تنكات الغاز المركزية بدقة وجودة عالية لضمان حصولكم على
              الغاز النقي والكميات المطلوبة.
            </p>
            <img
              src="https://images.unsplash.com/photo-1656988826404-bbb5ccb779bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="سيارة تعبئة الغاز"
              className="w-full h-auto rounded-lg shadow-md mt-4"
            />
          </section>

          {/* شرح الخدمة */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              تجهيز سيارات تعبئة الغاز
            </h2>
            <p className="text-gray-700 text-right mb-4">
              تعتبر سيارات تعبئة الغاز جزءًا حيويًا من منظومة خدمات الغاز؛ إذ
              تتيح للعملاء تعبئة الغاز بسرعة وكفاءة دون الحاجة للتوجه لمحطات
              الوقود. تعتمد سياراتنا على تكنولوجيا متقدمة لمراقبة ضغط وجودة
              الغاز أثناء عملية التعبئة.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  فوائد الخدمة
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-right">
                  <li>تعبئة سريعة وآمنة للغاز</li>
                  <li>خدمة متوفرة على مدار الساعة</li>
                  <li>فحص جودة الغاز قبل التعبئة</li>
                  <li>أسعار تنافسية مع متابعة فنية دقيقة</li>
                  <li>
                    خيارات دفع مريحة عبر البطاقة البنكية والمحافظ الإلكترونية
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://thumbs.dreamstime.com/b/fuel-delivery-tanker-to-gas-station-delivers-s-load-gasoline-143172577.jpg"
                  alt="عملية تعبئة الغاز"
                  className="w-110 h-70 rounded-lg shadow-md"
                />
              </div>
            </div>
          </section>

          {/* دليل خطوة بخطوة */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              دليل خطوة بخطوة لطلب تعبئة الغاز
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 text-right">
              <li>
                <strong>الخطوة 1:</strong> تقديم الطلب عبر النموذج أو الاتصال
                بخدمة العملاء.
              </li>
              <li>
                <strong>الخطوة 2:</strong> تحديد موقع العميل وتفاصيل العنوان
                بدقة.
              </li>
              <li>
                <strong>الخطوة 3:</strong> إرسال سيارة تعبئة الغاز إلى الموقع
                المحدد.
              </li>
              <li>
                <strong>الخطوة 4:</strong> إجراء فحص جودة الغاز وضبط الضغط أثناء
                التعبئة.
              </li>
              <li>
                <strong>الخطوة 5:</strong> تأكيد عملية التعبئة وإصدار فاتورة
                إلكترونية.
              </li>
            </ol>
          </section>

          {/* لماذا تختار خدمتنا */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              لماذا تختار خدمتنا؟
            </h2>
            <p className="text-gray-700 text-right">
              نحن نوفر سيارات تعبئة مجهزة بأحدث الأنظمة مع فريق فني متخصص لضمان
              تعبئة الغاز بكفاءة وأمان. نضمن لكم تعبئة الغاز النقي، متابعة فنية
              دقيقة، وخدمة عملاء متوفرة على مدار الساعة.
            </p>
          </section>
        </div>

        {/* العمود الأيسر: نموذج الطلب */}
        <div className="lg:w-1/3 bg-white p-6 rounded shadow sticky top-4 self-start">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-right">
            نموذج طلب تعبئة الغاز
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <InputField
              label="الاسم الكامل:"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="أدخل اسمك"
              required
            />
            <InputField
              label="رقم الهاتف:"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="أدخل رقم هاتفك"
              required
            />
            <div className="form-group">
              <label className="block mb-1 text-gray-700">
                عنوان الشارع / الحي:
              </label>
              <InputField
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="أدخل عنوان الشارع"
                required
              />
              <InputField
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="أدخل اسم الحي"
                className="mt-2"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InputField
                label="التاريخ:"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <div className="form-group">
                <label className="block mb-1 text-gray-700">
                  الفترة المفضلة:
                </label>
                <select
                  name="timePreference"
                  value={formData.timePreference}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">اختر الفترة</option>
                  <option value="صباحية">صباحية</option>
                  <option value="مسائية">مسائية</option>
                </select>
              </div>
            </div>
            <InputField
              label="كمية الغاز (باللتر):"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="أدخل الكمية"
              min="200"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {isSubmitting ? "جاري التقديم..." : "إرسال الطلب"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GasFilling;
