const Payment = require("../models/Payment");

// حذف استيراد Stripe

exports.createPaymentIntent = async (req, res) => {
  try {
    // بما أننا لن ننشئ PaymentIntent عبر Stripe،
    // يمكنك إعادة هذه الدالة لاستقبال بيانات الدفع مباشرة وحفظها
    // أو يمكن حذفها نهائياً إذا لم تعد بحاجة لها

    // مثال: إعادة رد بسيط أو رسالة بأن الخدمة غير متوفرة
    res
      .status(501)
      .json({ error: "PaymentIntent creation disabled. Stripe is removed." });
  } catch (error) {
    console.error("Error in createPaymentIntent:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.storePayment = async (req, res) => {
  try {
    const paymentData = req.body;
    
    // Create a new payment record
    const payment = new Payment({
      orderId: Date.now().toString(), // Generate a simple order ID
      amount: paymentData.amount,
      paymentMethodId: 'direct_payment',
      cardDetails: paymentData.cardDetails,
      status: 'completed',
      createdAt: new Date()
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: 'تم تخزين معلومات الدفع بنجاح',
      payment
    });
  } catch (error) {
    console.error('Error storing payment:', error);
    res.status(500).json({ 
      success: false,
      error: 'حدث خطأ أثناء تخزين معلومات الدفع'
    });
  }
};
