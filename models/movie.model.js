import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl:{
        type:String,
        required: true
    },
    language: {
        type:String,
        required: true,
     },
     releaseDate: {
        type: String,
        required: true
     },
     director:{
        type: String,
        required: true
     },
     releaseStatus:{
        type:String,
        required: true,
        default: "RELEASED",
     }//TIMESTAMP IS TRUE HERE WHAT IS THE FUNCTION OF TIMESTAMP
},{timestamps: true});
const Movie = mongoose.model('Movie',movieSchema)// yaha phle model ka nam then schema pass then collection name
export default Movie