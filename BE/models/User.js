const mongoose = require('mongoose');

// Định nghĩa User Schema
const userSchema = new mongoose.Schema({
  id_user: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  fullname: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'seller', 'admin'], 
    default: 'user' // Mặc định là user
  },
  requestedRole: { 
    type: String, 
    enum: ['user', 'seller'], 
    default: 'user' // Mặc định là user
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' }
  
}, { timestamps: true });

// Tạo Model từ Schema
const User = mongoose.model('User', userSchema);

module.exports = User;
