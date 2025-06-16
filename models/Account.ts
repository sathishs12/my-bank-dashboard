import mongoose, { Document, Schema, model, models } from "mongoose";

// The TypeScript interface for our data shape
export interface IAccount extends Document {
  _id: string; // <-- ADD THIS LINE
  name: string;
  accountNo: string;
  currentBalance: number;
  status: 'active' | 'inactive' | 'closed';
  updatedAt: Date; // from timestamps
}

// The rest of the file remains the same...
const AccountSchema = new Schema<IAccount>(
  {
    name: { type: String, required: true },
    accountNo: { type: String, required: true, unique: true },
    currentBalance: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['active', 'inactive', 'closed'], default: 'active' },
  },
  { timestamps: true }
);

const Account = models.Account || model<IAccount>("Account", AccountSchema);

export default Account;