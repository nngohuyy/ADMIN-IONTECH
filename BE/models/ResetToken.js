const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    token: String,
    expiresAt: Date
  });
module.exports = mongoose.model('ResetToken', resetTokenSchema);

  