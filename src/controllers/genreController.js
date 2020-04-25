const Genre = require('../models/genre')

exports.createGenre = async (req, res) => {
    try{
        const genre = new Genre({genre: req.body.genre})
        await genre.save();
        return res.status(201).json({
            status: "success",
            data: genre
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.readGenres = async (req, res) => {
    try{
        const genres = await Genre.find();
        return res.status(200).json({
            status: "success",
            data: genres
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.updateGenre = async (req, res) => {
    try{
        const genre = await Genre.findByIdAndUpdate(req.params.id, 
            {genre: req.body.genre},
            {new: true}
            );
        return res.status(201).json({
            status: "success",
            data: genre
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.deleteGenre = async (req, res) => {
    try{
        console.log('req.params', req.params)
        await Genre.findByIdAndDelete(req.params.id);
        return res.status(204).json({
            status: "success",
            data: null
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}