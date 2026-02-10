import Movie from '../models/movie.model.js';
const createMovie =  async (data)=>{
    const movie = await Movie.create(data);
    return movie;
}
const deleteMovie = async(id) =>{
    const response = await Movie.findByIdAndDelete(id);
}
const getMovieById = async (id)=>{
    const movie = await Movie.findById(id);
    if(!movie){
        return {
            err: "No movie found for the corresponding id provided",
            code:404
        };
    }
    return {
        data: movie,
        code:200
    };
};
export {getMovieById,createMovie,deleteMovie}