const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    client: { type: String, required: true },
    completion_date: { type: String, required: true },
    description: { type: String, required: true }
}, { 
    timestamps: true 
});

projectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Project', projectSchema);
