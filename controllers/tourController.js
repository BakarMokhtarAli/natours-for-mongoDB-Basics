const Tour = require("../model/tourModel");

const APIFeatures = require('../utils/apiFeatures');

exports.get_five_cheap_tour = (req,res,next) => {
    req.query.limit = '5';
    req.query.sort = "-price,-duration,name",
    req.query.fields = "name,price,duration,difficulty",
    next();
}

exports.getAllTours = async(req,res) => {
    try {
        // const queryObj = {...req.query};
        // const excludedFields = ['page','sort','limit','fields'];
        // excludedFields.forEach(el => delete queryObj[el]);

        // let queryString = JSON.stringify(queryObj);
        // queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        // let query = Tour.find(JSON.parse(queryString));

        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(",").join(" ");
        //     query = query.sort(sortBy);
        // }else{
        //     query = query.sort("-createdAt");
        // }

        // if(req.query.fields){
        //     const fields = req.query.fields.split(",").join(" ");
        //     query = query.select(fields);
        // }else{
        //     query = query.select("-__v");
        // };

        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page -1 ) * limit;

        // query = query.skip(skip).limit(limit);
        const features = new APIFeatures(Tour.find(),req.query)
        .filter()
        .limitingFields()
        .sort()
        .paginate()

        const tours = await features.query;
        res.status(200).json({
            status: `success`,
            results: tours.length,
            data: {
                tours,
            }
        })
    } catch (err) {
        res.status(404).json({
            status: `Fail`,
            message: `Something Went Wrong!`,
            error: err
        })
    }
};

exports.getTour = async (req,res) => {
    try{
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            }
        })
    }catch(err){
        res.status(404).json({
            status: `Fail`,
            message: `Something Went Wrong!`,
            error: err
        })
    }
};

exports.createTour = async(req,res) => {
    try{
        const tour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'tour created success',
            data: {
                tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: `Fail`,
            message: `Something Went Wrong!`,
            error: err
        })
    }
};

exports.updateTour = async(req,res)=>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            message: 'a tour updated success',
            data: {
                tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: `Fail`,
            message: `Something Went Wrong!`,
            error: err
        })
    }
};

exports.deleteTour = async (req,res) => {
    try{
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'a tour deleted success'
        })
    }catch(err){
        res.status(404).json({
            status: `Fail`,
            message: `Something Went Wrong!`,
            error: err
        })
    }
}