import Movie from '../models/movie.model.js';
const createMovieService = async (data) => {
    try {
        console.log(data);
        const movie = await Movie.create(data);
        console.log(movie);
        return movie;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                console.log(error.errors[key]);
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return { err: err, code: 422 };
        } else {
            throw error;
        }
    }
}
const deleteMovieService = async (id) => {
    const response = await Movie.findByIdAndDelete(id);
}
const getMovieByIdService = async (id) => {
    const movie = await Movie.findById(id);
    if (!movie) {
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        };
    }
    return {
        data: movie,
        code: 200
    };
};
//----------------------------------------------------------------------------------------------
const updateMovieService = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return movie;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                console.log(error.errors[key]);
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return { err: err, code: 422 };
        } else {
            throw error;
        }

    }

}
//----------------------------------------------------------------------------------------------------
const fetchMoviesService = async (filter)=>{
    let query ={};
    if(filter.name){
        query.name = filter.name;
    }
    let movies = await Movie.find(query);
    if(!movies){
        return {
            err:"Not able to find the queries movies",
            code: 404
        }
    }
    return movies;
}
export { getMovieByIdService, createMovieService, deleteMovieService, updateMovieService,fetchMoviesService }