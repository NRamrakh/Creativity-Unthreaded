const model = require('../models/event');


exports.index =(req,res)=>{
    let data =[];
    let events = model.find();
    if (events.length){
        events.forEach(event => {
          
            let value = event.topic;

            if(data.length==0){
               let object = {};
               object[value]=[event];
                data.push(object);
            }else{
                let index = -1
                 data.map((x, i) =>{
                    if(Object.keys(x)[0] == value){
                        if(index == -1){
                            index = i;
                        }
                    }
                
                  });
                  
                if(index != -1){
                   
                    data[index][value].push(event)
                }else{
                    let object = {};
                    object[value]=[event];
                    data.push(object);
                   
                }

               
            }
            
        });

    }
    res.render('./events/index',{data})
    
};


exports.new =(req,res)=>{
    res.render('./events/new')
};


exports.create=(req,res)=>{
    let event=req.body;
    model.save(event);
    res.redirect('/events');
};


exports.show = (req,res,next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./events/show',{event});
    } else{
        let err = new Error('Cannot send event with id ' +id);
        err.status = 404;
        next(err);
    }
    
    
};

exports.edit=(req,res,next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./events/edit',{event});
    }
    else{

        let err = new Error('Cannot send event with id ' +id);
        err.status = 404;
        next(err);
    }
    
};



exports.update=(req,res,next)=>{
    let event = req.body;
    let id = req.params.id;
    if (model.updateById(id,event)){

        res.redirect('/events/' +id);
    } else{
        let err = new Error('Cannot send event with id ' +id);
        err.status = 404;
        next(err);
    }
    
};

exports.delete=(req,res,next)=>{
    let id = req.params.id;
    if (model.deleteById(id)){
        res.redirect('/events');
    }
    else{
        let err = new Error('Cannot send event with id ' +id);
        err.status = 404;
        next(err);

    }

};



