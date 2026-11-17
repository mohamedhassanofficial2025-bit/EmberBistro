import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  dishId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface IOrder extends Document {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'online';
  status: 'New' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  dishId: { type: Schema.Types.ObjectId, ref: 'Dish', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  specialInstructions: { type: String, default: '' },
});

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'online'], default: 'cash' },
    status: {
      type: String,
      enum: ['New', 'Preparing', 'Ready', 'Completed', 'Cancelled'],
      default: 'New',
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
