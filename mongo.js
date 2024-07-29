require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_KEY).then(()=>{
    console.log('love');
}).catch(()=>{
    console.log('no love');
});

const schema = mongoose.Schema({
    catagory :{
        type : String,
        required : true
    }
})

const catagory = mongoose.Schema({
    catagory :{
        type : String,
        required : true
    }
})
const product = mongoose.Schema({
    catagory :{
        type : String,
        required : true
    },
    image :{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    id :{
        type : String,
        required : true
    },
    discription :{
        type : String,
        required : true
    },
    specs :{
        type : Array,
        required : true
    }

})

const collections = new mongoose.model('collections', catagory);

const products = new mongoose.model('products',product);

module.exports = {collections , products};