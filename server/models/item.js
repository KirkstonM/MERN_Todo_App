import mongoose from "mongoose";

const todoItemSchema = mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    timestamps : {
        type: String,
        default : Date.now()
    }
}
);


const todoItemModal = mongoose.model('items', todoItemSchema);
export default todoItemModal;