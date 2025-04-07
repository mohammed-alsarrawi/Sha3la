import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
    serviceType: "استفسار", // القيمة الافتراضية
    requestedDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // تأكد من استبدال URL بالعنوان المناسب للـ backend
      const response = await axios.post("http://localhost:5000/api/heating-service-requests", formData);
      setSuccess(response.data.message);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: "",
        serviceType: "استفسار",
        requestedDate: "",
      });
    } catch (err) {
      setError("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
    }
    setLoading(false);
  };

  return (
    <div className="lg:w-1/3 bg-white p-6 rounded shadow sticky top-4 self-start">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 text-right">
        طلب استفسار / معاينة / صيانة
      </h2>
      <form className="space-y-4 text-right" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-gray-700">الاسم الكامل:</label>
          <input
            type="text"
            name="fullName"
            placeholder="أدخل اسمك"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">رقم الهاتف:</label>
          <input
            type="tel"
            name="phone"
            placeholder="أدخل رقم هاتفك"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">البريد الإلكتروني:</label>
          <input
            type="email"
            name="email"
            placeholder="example@domain.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">نوع الخدمة:</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="استفسار">استفسار</option>
            <option value="معاينة">طلب معاينة</option>
            <option value="صيانة">صيانة</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">
            تاريخ الطلب (اختياري):
          </label>
          <input
            type="date"
            name="requestedDate"
            value={formData.requestedDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">
            رسالتك أو استفسارك:
          </label>
          <textarea
            name="message"
            rows="3"
            placeholder="اكتب أي ملاحظات أو تفاصيل إضافية"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {loading ? "جاري الإرسال..." : "إرسال الطلب"}
        </button>
      </form>
    </div>
  );
};

const HeatingSystem = () => {
  return (
    <div
      className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen py-16"
      dir="rtl"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
        {/* في بيئة RTL، العنصر الأول يظهر على اليمين */}
        {/* المحتوى التفصيلي لنظام التدفئة (سيظهر على اليمين) */}
        <div className="lg:w-2/3 bg-white p-6 rounded shadow overflow-y-auto">
          {/* مقدمة الصفحة */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800 text-right">
              تجهيز نظام تدفئة مركزية قبل أو بعد التشطيب
            </h1>
            <p className="text-gray-700 text-right mt-4">
              يعد تركيب وتجهيز نظام تدفئة مركزية أحد الأنظمة الأساسية التي تتكون
              منها كل شقة أو منزل أو فيلا أو منشأة تجارية أو خاصة أو عامة، ويضمن
              الراحة الحرارية خلال الفترات الباردة من السنة.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4 text-right">
              <p>
                توفر أنظمة التدفئة المركزية بالغاز الطبيعي كفاءة حرارية عالية مع
                تقليل استهلاك الطاقة، مما يساهم في خفض فواتير التدفئة وتحقيق
                استدامة بيئية.
              </p>
            </div>
          </section>

          {/* المكونات الأساسية للنظام */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              ما هي المكونات الأساسية لنظام التدفئة المركزية؟
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-right">
              <li>مصدر الحرارة: (غلاية أو سخان مركزي)</li>
              <li>نظام التوزيع: (الأنابيب والمواسير)</li>
              <li>مستقبلات الحرارة: (المشعاعات أو الدفايات)</li>
              <li>مضخات المياه وخزان التمدد</li>
              <li>نظام التحكم: (الترموستات وصمامات التحكم)</li>
            </ul>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <img
                src="https://greenwell-eg.com/wp-content/uploads/2024/03/%D8%A3%D9%86%D8%B8%D9%85%D8%A9-%D8%A7%D9%84%D8%AA%D8%AF%D9%81%D8%A6%D8%A9-%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%BA%D8%A7%D8%B2-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A.jpeg"
                alt="الغلاية"
                className="w-full h-40 rounded shadow"
              />
              <img
                src="https://mdsgrouptr.com/wp-content/uploads/2023/11/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A8%D8%AF%D9%88%D9%86-%D8%B9%D9%86%D9%88%D8%A7%D9%86.jpg"
                alt="المشعاعات"
                className="w-full h-40 rounded shadow"
              />
              <img
                src="https://static.labeb.com/images/articles/345/central-min637640483204216178-w960.jpg"
                alt="الأنابيب"
                className="w-full h-40 rounded shadow"
              />
            </div>
          </section>

          {/* المعدات والقطع المطلوبة */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              ما الذي ستحتاجه لتثبيت نظام التدفئة المركزية؟
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-right">
              <li>
                <strong>غلاية مركزية بنظام تحكم:</strong> تتميز الغلايات الحديثة
                بكفاءة عالية وتوفير للطاقة، لكنها تتطلب مساحة أكبر.
              </li>
              <li>
                <strong>سخان مركزي:</strong> يعمل فوريًا عند فتح الماء ولا يحتاج
                لمساحة كبيرة، مما يجعله خيارًا اقتصاديًا.
              </li>
              <li>
                <strong>مشعات (دفايات):</strong> اختيار الحجم والنمط يعتمد على
                الديكور والميزانية.
              </li>
              <li>
                <strong>شبكة الأنابيب:</strong> يُفضل استخدام أنابيب نحاسية أو
                من مواد عالية الجودة مع عزل حراري.
              </li>
              <li>
                <strong>مضخة تدوير وخزان تمدد:</strong> لضمان تدفق متساوٍ وضبط
                الضغط داخل النظام.
              </li>
              <li>
                <strong>نظام التحكم والترموستات:</strong> لضبط درجة الحرارة بدقة
                في جميع أنحاء المبنى.
              </li>
            </ul>
          </section>

          {/* دليل خطوة بخطوة لتركيب النظام */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              تركيب التدفئة المركزية: دليل خطوة بخطوة
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 text-right">
              <li>
                <strong>الخطوة 1:</strong> إنشاء خريطة التدفئة – تحديد مواقع
                المرجل والمشعاعات وفقاً لاحتياجات المبنى.
              </li>
              <li>
                <strong>الخطوة 2:</strong> تثبيت المشعاعات – تركيبها على الجدران
                أو الأرضية مع وضع الصمامات للتحكم.
              </li>
              <li>
                <strong>الخطوة 3:</strong> تركيب الأنابيب – تمديدها بشكل يضمن
                عزل الحرارة وتوزيعها بالتساوي.
              </li>
              <li>
                <strong>الخطوة 4:</strong> إعداد نظام التحكم – تركيب الترموستات
                وربط النظام لضبط درجة الحرارة تلقائيًا.
              </li>
              <li>
                <strong>الخطوة 5:</strong> تركيب المرجل – وضع الغلاية وتوصيلها
                بمصدر الغاز والمياه مع تثبيت المضخة وخزان التمدد.
              </li>
              <li>
                <strong>الخطوة 6:</strong> تشغيل النظام – تعبئة النظام بالماء،
                اختبار الضغط، وتنفيس الهواء لضمان التشغيل الأمثل.
              </li>
              <li>
                <strong>الخطوة 7:</strong> تسليم المشروع والتدريب – شرح استخدام
                النظام لصاحب المبنى وتقديم تعليمات الصيانة الدورية.
              </li>
            </ol>
          </section>

          {/* تقديرات زمنية وتكلفة التركيب */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              الوقت والتكلفة المتوقعة
            </h2>
            <p className="text-gray-700 text-right mb-4">
              تختلف مدة تركيب نظام التدفئة المركزية من مشروع لآخر، وقد يستغرق من
              2-3 أيام لشقة صغيرة إلى أسبوعين أو أكثر للمباني الكبيرة. كما تختلف
              التكلفة بشكل كبير تبعاً لنوع النظام والمعدات والعمالة، لذا ينصح
              بالحصول على عروض أسعار مفصلة.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-right font-semibold text-gray-700">
                      حجم المشروع
                    </th>
                    <th className="border border-gray-300 p-3 text-right font-semibold text-gray-700">
                      المساحة التقريبية
                    </th>
                    <th className="border border-gray-300 p-3 text-right font-semibold text-gray-700">
                      المدة التقريبية
                    </th>
                    <th className="border border-gray-300 p-3 text-right font-semibold text-gray-700">
                      التكلفة التقديرية (دينار أردني)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      project: "شقة صغيرة",
                      area: "80-120 م²",
                      duration: "3-4 أيام",
                      cost: "1,800 - 2,500",
                    },
                    {
                      project: "شقة متوسطة",
                      area: "120-180 م²",
                      duration: "5-7 أيام",
                      cost: "2,800 - 3,900",
                    },
                    {
                      project: "فيلا صغيرة",
                      area: "200-300 م²",
                      duration: "7-10 أيام",
                      cost: "4,500 - 6,500",
                    },
                    {
                      project: "فيلا كبيرة",
                      area: "300-450 م²",
                      duration: "10-14 يوم",
                      cost: "7,000 - 9,500",
                    },
                    {
                      project: "فيلا فاخرة",
                      area: "450-600 م²",
                      duration: "14-21 يوم",
                      cost: "9,000 - 13,000",
                    },
                    {
                      project: "مبنى تجاري صغير",
                      area: "300-500 م²",
                      duration: "15-25 يوم",
                      cost: "12,000 - 18,000",
                    },
                    {
                      project: "مطعم/كافيه",
                      area: "150-300 م²",
                      duration: "10-18 يوم",
                      cost: "8,000 - 12,000",
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      <td className="border border-gray-200 p-3 text-right font-medium">
                        {row.project}
                      </td>
                      <td className="border border-gray-200 p-3 text-right text-gray-600">
                        {row.area}
                      </td>
                      <td className="border border-gray-200 p-3 text-right">
                        {row.duration}
                      </td>
                      <td className="border border-gray-200 p-3 text-right font-bold text-blue-600">
                        {row.cost} دينار
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="highlight-box">
              <h4 className="text-xl font-bold">ملاحظات هامة:</h4>
              <ul className="list-disc list-inside">
                <li>الأسعار تقديرية وتختلف حسب المعدات والعمالة.</li>
                <li>يشمل السعر توريد وتركيب المكونات الأساسية.</li>
                <li>
                  الخدمات الإضافية مثل الحصول على تصاريح قد تزيد من التكلفة.
                </li>
              </ul>
            </div>
          </section>

          {/* خدمات الصيانة والدعم الفني */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              خدمات الصيانة والدعم الفني
            </h2>
            <p className="text-gray-700 text-right mb-4">
              لا نكتفي بتركيب النظام فقط، بل نقدم أيضًا خدمات صيانة دورية ودعم
              فني متكامل لضمان استمرارية عمل النظام بكفاءة عالية. تشمل خدماتنا:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-right">
              <li>فحص وتنظيف الغلاية والمشعاعات بانتظام</li>
              <li>التأكد من سلامة الأنابيب وصمامات الأمان</li>
              <li>ضبط نظام التحكم وتركيب الأجهزة الذكية</li>
              <li>استجابة سريعة لأي طوارئ أو أعطال تقنية</li>
              <li>تقديم استشارات دورية لتحديث النظام وفق أحدث التقنيات</li>
            </ul>
          </section>

          {/* الخاتمة */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-right">
              الخلاصة
            </h2>
            <p className="text-gray-700 text-right">
              عند اختيار نظام التدفئة المركزية بالغاز الطبيعي، تأكد من تقييم
              احتياجاتك وتحديد المواصفات المثلى بالتعاون مع الخبراء. يوفر النظام
              كفاءة عالية ودفء متوازن مع تقليل تكاليف التشغيل على المدى الطويل،
              مما يجعله استثماراً ذكياً لمستقبل منزلك أو منشأتك.
            </p>
            <p className="text-gray-700 text-right">
              إذا كنت بحاجة إلى استشارة فنية أو عروض أسعار مفصلة، لا تتردد في
              التواصل معنا عبر نموذج الطلب الموجود على الجانب الأيسر.
            </p>
          </section>
        </div>

        {/* في بيئة RTL، العنصر الثاني سيظهر على اليسار */}
        <ContactForm />
      </div>
    </div>
  );
};

export default HeatingSystem;
