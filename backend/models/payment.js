// models/payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethodId: {
    type: String,
    required: true
  },
  cardDetails: {
    last4: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    expMonth: {
      type: Number,
      required: true
    },
    expYear: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
