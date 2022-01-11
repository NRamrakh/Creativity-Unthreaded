const model = require('../models/event');


exports.contact =(req,res)=>{
    res.render('./contact')
};

exports.about=(req,res)=>{
    res.render('./about')
};


exports.home=(req,res)=>{
    res.render('./index.ejs')
};

exports.main = (req, res)=>{
    res.render('./index');
    };
    