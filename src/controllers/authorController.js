const Author = require('../models/author')

exports.createAuthor = async (req, res) => {
    try{
        const author = new Author({name: req.body.name});
        await author.save();
        return res.status(201).json({
            status: "success",
            data: author
        })
    } catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.readAuthor = async (req, res) => {
    try{
        const authors = await Author.find();
        return res.status(200).json({
            status: "success",
            data: authors
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.updateAuthor = async (req, res) => {
    try{
        const author = await Author.findByIdAndUpdate(req.params.id,
            {name: req.body.name},
            {new: true}
            );
        return res.status(201).json({
            status: "success",
            data: author
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.deleteAuthor = async (req, res) => {
    try{
        await Author.findByIdAndDelete(req.params.id);
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