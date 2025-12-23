import mongoose from "mongoose";


const ServiceSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: String,   // TODO: mongoose.Schema.Types.ObjectId
            trim: true,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
        },
        amc: {
            type: Number,
        },
    },
    { _id: false }
);

const BillEntrySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    engineer_name: {
        type: String,
        trim: true,
        required: true
    },
    bill_no: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    services: {
        type: [ServiceSchema],
        required: true,
        validate: [arr => arr.length > 0, "At least one service is required"],
    },
    customer_name: {
        type: String,
        trim: true,
        required: true
    },
    phone_number: {
        type: String,
        trim: true,
        required: true
    },
    notes: {
        type: String,
        trim: true,
        required: true
    },
    call_type: {
        type: String,
        trim: true,
        required: true
    },
    updatedAt: {
        type: Number,
        default: Date.now
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
});

export default mongoose.model("BillEntry", BillEntrySchema);