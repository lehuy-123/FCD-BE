const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    specs: { type: Object, default: {} }
}, { 
    timestamps: true 
});

// Compound index for search + filter optimization
productSchema.index({ name: 'text', category: 1 });

// Transform _id to id so frontend mapping works seamlessly without refactors
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Product', productSchema);
