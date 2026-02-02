import Movie from '../models/movie.model.js'
const createMovie = async(req,res) =>{
    try{//********DOUBT*****************/
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            success:true,
            error:{},
            data: movie,
            message: 'Successfully created a new movie',
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: true,
            error: err,
            data:{},
            message: 'Something went wrong'
        });
    }

};
export default createMovie;
