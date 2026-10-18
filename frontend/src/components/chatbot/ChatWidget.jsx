import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const WELCOME = {
  role: "assistant",
  content: "مرحباً! أنا مساعد شعلة. كيف أقدر أساعدك؟",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const { pathname } = useLocation(); 
  // keep the newest message in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    // previous conversation, without the welcome text and error messages
    const history = messages
      .filter((m) => m !== WELCOME && !m.isError)
      .slice(-10)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/chat",
        { message: text, history },
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      const content =
        err.response?.status === 401
          ? "يرجى تسجيل الدخول لاستخدام المساعد."
          : "عذراً، المساعد غير متاح حالياً. حاول مرة أخرى لاحقاً.";
      setMessages((prev) => [...prev, { role: "assistant", content, isError: true }]);
    } finally {
      setLoading(false);
    }
  };
const hiddenOn = ["/superadmindashboard"];          // ← new
  if (hiddenOn.some((p) => pathname.toLowerCase().startsWith(p))) {
    return null;
  }
  return (
    <div className="fixed bottom-6 left-6 z-50" dir="rtl">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <span className="font-semibold">مساعد شعلة</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="إغلاق"
              className="text-xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  dir="auto"
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : m.isError
                      ? "bg-red-50 text-red-700"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-end">
                <div className="animate-pulse rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-500">
                  جارٍ الكتابة...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t border-gray-200 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك..."
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              إرسال
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="فتح المحادثة"
        className="h-14 w-14 rounded-full bg-blue-600 text-2xl text-white shadow-lg hover:bg-blue-700"
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}