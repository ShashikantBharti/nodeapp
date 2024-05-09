const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ['individual', 'company', 'institute', 'bank'],
      default: 'individual',
    },
    sector: {
      type: String,
    },
    sub_sector: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
    leadership: {
      type: String,
    },
    website: {
      type: String,
    },
    rank: {
      type: Number,
      default: 0,
    },
    credit_score: {
      type: Number,
      default: 0,
    },
    bussness_score: {
      type: Number,
      default: 0,
    },
    competitors: {
      type: [],
    },
    similar_company: {
      type: [],
    },
    // real_state_own_ship: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'real_state_ownership',
    // },
    financial_statement: {
      type: String,
    },
    credit_reports: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('customer_schema', CustomerSchema);
