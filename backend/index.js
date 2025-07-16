const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// connection with Mongo Db
mongoose.connect("mongodb+srv://laibamajeed29:laiba123@cluster0.akmwoyj.mongodb.net/E-Commerce")

// API Creation

app.get("/", (req,res)=>{
    res.send("Express App is Running")
})

// image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// upload end point for uploading pictures

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success: 1,
        image_url: `${port}/images/${req.file.filename}`
    })
})

// Creating user schema
const Users = mongoose.model('Users', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  }
});

// Signup API
app.post('/createuser', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    const newUser = new Users({ name, email, password, confirmPassword });
    await newUser.save();
    console.log(newUser);

    const token = jwt.sign(
      { userId: newUser._id },
      'secret_ecom',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully.',
      token,
      user: { name: newUser.name, email: newUser.email }
    });

  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const user = await Users.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    // Create JWT token on successful login
    const token = jwt.sign(
      { userId: user._id },
      'secret_ecom', // keep this secret consistent or use process.env.JWT_SECRET
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: { name: user.name, email: user.email }
    });
    
    console.log("Login successful");

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


// Creating product schema

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})

const Orders = mongoose.model("Orders", {
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      size: String,
      image: String,
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// endpoint for adding products

app.post('/addproduct', async(req,res)=>{
    let products = await Product.find();
    let id;
    if(products.length>0){
        let lastProductArray = products.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id+1;
    }
    else{
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// endpoint for removing products

app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete(req.body.id);
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.get('/search', async (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const allProducts = await Product.find(); // Or however you're getting products
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    res.json(filtered);
    console.log(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// endpoint for getting all products

app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Place order endpoint
app.post('/placeorder', async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    // Basic validation
    if (
      !customer ||
      !customer.fullName ||
      !customer.email ||
      !customer.address ||
      !customer.paymentMethod ||
      !items ||
      !items.length ||
      !total
    ) {
      return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    // Create new order
    const newOrder = new Orders({ customer, items, total });
    await newOrder.save();

    res.json({ success: true, orderId: newOrder._id });
  } catch (err) {
    console.error('Order saving error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(port, '0.0.0.0', (error) => {
    if(!error){
        console.log("serving running on port "+port);
    }
    else{
        console.log("Error: "+error);
    }
})