import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    team: { type: String, required: true },
    category: { type: String, default: 0, required: true },
    price: { type: Number, default: 0, required: true },
    quantityInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
    numOfReviews: { type: Number, default: 0, required: true },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;