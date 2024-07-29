require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

const multer = require('multer');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME , 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_PASSWORD
});

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
})

const upload = multer({ storage: storage });

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


app.use(cors());

app.use(express.json({limit:'50mb'}));

app.use(express.urlencoded({ extended: false }));

app.post('/upload',upload.single(),async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload_large(req.body.image,{
            folder: '',
            resource_type: 'image'
        });
        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get('/upload', async (req, res) => {
    res.send('shit');
})

app.post('/', async (req, res) => {
    const user = await new collections(req.body);
    new_user = await user.save();
    res.send(new_user);
});

app.get('/', async (req, res) => {
    const users = await collections.find();
    await res.status(200).json(users);
});

app.delete('/', async (req, res) => {
    const user = await collections.findByIdAndDelete(req.body.id);
    res.send(user);
})

app.get('/product', async (req, res) => {
    const users = await products.find();
    await res.status(200).json(users);
});

app.post('/product', async (req, res) => {
    const user = await new products(req.body);
    new_user = await user.save();
    res.send(new_user);
});

app.delete('/product', async (req, res) => {
    const user = await products.findByIdAndDelete(req.body.id);
    res.send(user);
})

app.listen(3000||process.env.PORT,()=>{
    console.log('Server started on port 3000');
});
