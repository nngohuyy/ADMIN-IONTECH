const mongoose = require('mongoose');



const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true, enum: ['Laptop', 'Smartphone', 'Tablet','Tai nghe','Phụ kiện'] },
    description: { type: String, required: true },
    netPrice: { type: Number, required: true },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    finalPrice: { type: Number, required: true }, // This can be calculated before saving
    image: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    releaseDate: { type: Date, required: true },
    specifications: {
      general: {
        model: { type: String},
        os: { type: String },
        processor: { type: String },
        ram: { type: String},
        storage: { type: String },
        expandableStorage: { type: String},
        graphics: { type: String },
        battery: { type: String },
        charging: { type: String },
      },
      display: {
        screenSize: { type: String },
        resolution: { type: String },
        panelType: { type: String },
        refreshRate: { type: String },
        touchscreen: { type: String },
        brightness: { type: String },
      },
      connectivity: {
        wifi: { type: String },
        bluetooth: { type: String },
        ports: { type: [String] },
        simSupport: { type: String },
        g5: { type: String },
      },
      camera: {
        rearCamera: { type: String },
        frontCamera: { type: String },
        videoRecording: { type: String },
      },
      audio: {
        speakers: { type: String },
        microphones: { type: String },
        audioJack: { type: String },
      },
      buildAndDesign: {
        material: { type: String },
        weight: { type: String },
        dimensions: { type: String },
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      others: {
        security: { type: String },
        keyboard: { type: String },
        penSupport: { type: String },
        cooling: { type: String },
        warranty: { type: String },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
