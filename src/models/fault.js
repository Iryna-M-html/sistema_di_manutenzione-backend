import { model, Schema } from 'mongoose';
import { TYPE_FAULT } from '../constants/typeFault.js';

const faultSchema = new Schema(
  {
    id_fault: {
      type: String,
      required: true,
      trim: true,
    },
    nameOperator: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    dataCreated: {
      type: String,
      required: true,
    },
    timeCreated: {
      type: String,
      required: true,
      trim: true,
    },

    plantId: {
      type: String,
      required: true,
      trim: true,
    },
    partId: {
      type: String,
      required: true,
    },
    typefault: {
      type: String,
      enum: TYPE_FAULT,
      required: true,
      default: 'Produzione',
    },
    comment: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false },
);

faultSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.password;
  return obj;
};
export const Fault = model('Fault', faultSchema);
