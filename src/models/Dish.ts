import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDish extends Document {
  name: string;
  description: string;
  price: number;
  category: 'Appetizers' | 'Main Course' | 'Desserts' | 'Drinks';
  image: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DishSchema = new Schema<IDish>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Appetizers', 'Main Course', 'Desserts', 'Drinks'],
      default: 'Main Course',
    },
    image: { type: String, default: '/images/default-dish.jpg' },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Dish: Model<IDish> =
  mongoose.models.Dish || mongoose.model<IDish>('Dish', DishSchema);

export default Dish;
