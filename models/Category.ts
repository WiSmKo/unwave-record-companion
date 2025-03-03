import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    slug: { type: String, required: true },
    title: { type: String, required: true, maxlength: 60 },
    titleShort: { type: String, required: false, MaxLength: 20 },
    description: { type: String, required: true, maxlength: 160 },
    descriptionShort: { type: String, required: false, maxlength: 60 }, //optional
})

export default categorySchema;