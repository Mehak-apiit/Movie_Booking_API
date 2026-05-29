import mongoose from "mongoose";

const ticketNotificationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true 
    },
    recepientEmails: {
        type: [String],
        required: true 
    },
    status: {
        type: String,
        enum: {
            values: ["SUCCESS", "FAILED", "PENDING"],
            message: "invalid ticket status"
        },
        default: "PENDING",
        required: true
    }
}, {timestamps: true});

const Notification = mongoose.model('TicketNotification', ticketNotificationSchema);
export default Notification;