const {v4:uuidv4}=require('uuid');

const events =[
    {   id: '1',
        name:'Baby Shower',
        topic:'Decoration Events',
        details:'Raw materials will be provided',
        date:'12/12/2021',
        start_time: '10:00',
        end_time: '12:00',
        host_name: 'Nisha Ramrakhyani',
        venue: 'Freedom Park',
        image: '/images/babyshower.jpg'
    },
    {
        id: '2',
        name:'Wedding',
        topic:'Decoration Events',
        details:'Raw materials will be provided',
        date:'12/15/2021',
        start_time: '10:00',
        end_time: '12:00',
        host_name: 'Sumit Shewani',
        venue: 'Aurora',
        image: '/images/wedding.jpg'
     
    },
    {
        id: '3',
        name:'Birthday Party',
        topic:'Decoration Events',
        details:'Raw materials will be provided',
        date:'11/11/2021',
        start_time: '10:00',
        end_time: '12:00',
        host_name: 'Monica Tiwari',
        venue: 'Fort mill',
        image: '/images/birthday.jpeg'
     
    },
    {
        id: '4',
        name:'Resin Art',
        topic:'Art Workshops',
        details:'You can learn to make Resin clock and coasters as shown in the image. All the required materials will be provided during the workshop. Registration will remain open until 15th November 2021',
        date:'10/12/2021',
        start_time: '10:00',
        end_time: '12:00',
        host_name: 'Nisha Ramrakhyani',
        venue: 'Element Uptown',
        image: '/images/Resin.jpeg'
       
    },
    {
        id: '5',
        name:'Knife Painting',
        topic:'Art Workshops',
        details:'You can learn knife painting in this workshop as shown in the image. All the required materials will be provided during the workshop. Registration will remain open until 11th October 2021',
        date:'10/12/2021',
        start_time: '10:00',
        end_time: '12:00',
        host_name: 'Omkar Karande',
        venue: 'Woodward Hall',
        image: '/images/knifepainting.jpg'
       
    },
    {
        id: '6',
        name:'Alcohol Ink Art',
        topic:'Art Workshops',
        details:'You can learn to make Alcohol-ink clock and coasters as shown in the image. All the required materials will be provided during the workshop. Registration will remain open until 15th November 2021',
        date:'11/16/2021',
        start_time: '11:00',
        end_time: '01:00',
        host_name: 'Nisha Ramrakhyani',
        venue: 'Halton Theatre',
        image: '/images/alcoholink.jpg'
       
    }
];



exports.find=function(){
    return events;
    
}

exports.findById=function(id){
    return events.find(event=>event.id === id);
   
}

exports.save=(event) = function(event){
    event.id=uuidv4();
    console.log(event);
    events.push(event);
}
    

exports.updateById = function(id,newEvent){
    let event = events.find(event=>event.id === id);
    if (event){
        event.name = newEvent.name;
        event.details=newEvent.details;
        event.date= newEvent.date;
        event.start_time = newEvent.start_time;
        event.end_time = newEvent.end_time;
        event.host_name= newEvent.host_name;
        event.venue = newEvent.venue;
        event.image = newEvent.image;
        return true;

    }
    else{
        return false;
    }
       

}

exports.deleteById = function(id){
    let index = events.findIndex(event=>event.id === id);
    if(index !== -1){
        events.splice(index,1)
        return true;
    }
    else{
        return false;
    }
}
