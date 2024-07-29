const express = require('express');

const app = express();

const cors = require('cors');

const multer = require('multer');

const cloudinary = require('./cloudinary.js');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
})

const upload = multer({ storage: storage });

const modules = require('./mongo');

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
    const user = await new modules.collections(req.body);
    new_user = await user.save();
    res.send(new_user);
});

app.get('/', async (req, res) => {
    const users = await modules.collections.find();
    await res.status(200).json(users);
});

app.delete('/', async (req, res) => {
    const user = await modules.collections.findByIdAndDelete(req.body.id);
    res.send(user);
})

app.get('/product', async (req, res) => {
    const users = await modules.products.find();
    await res.status(200).json(users);
});

app.post('/product', async (req, res) => {
    const user = await new modules.products(req.body);
    new_user = await user.save();
    res.send(new_user);
});

app.delete('/product', async (req, res) => {
    const user = await modules.products.findByIdAndDelete(req.body.id);
    res.send(user);
})

app.listen(3000||process.env.PORT,()=>{
    console.log('Server started on port 3000');
});
