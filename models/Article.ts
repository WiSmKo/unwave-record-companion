import mongoose from "mongoose";
import Image, { StaticImageData } from "next/image";
import categorySchema from "./Category";
import authorSchema from "./Author";

const imageSchema = new mongoose.Schema({
    src: String,
    urlRelative: String,
    alt: String
});

const articleSchema = new mongoose.Schema({
    slug: { type: String, required: true },
    title: { type: String, required: true, maxlength: 60 },
    description: { type: String, required: true, maxlength: 160 },
    categories: [categorySchema],
    author: authorSchema,
    publishedAt: String,
    image: imageSchema,
    content: String
});

export default mongoose.models.Article || mongoose.model("Article", articleSchema);
