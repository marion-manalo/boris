import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IReport extends Document {
  userId: mongoose.Types.ObjectId;
  ticker: string;
  description: string;
  logoURL: string;
  notes: string;
  createdAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // reference to the user model
      required: true,
    },
    ticker: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logoURL: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'borisReports',
  }
);

const Report = models.Report || model<IReport>('Report', reportSchema);

export default Report;
