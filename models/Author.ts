import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
    name: String,
    icon: String,
    url: String,
})

const authorSchema = new mongoose.Schema({
    slug: String,
    name: String,
    job: String,
    description: String,
    avatar: String,
    socials: [socialSchema]
})

export default authorSchema;