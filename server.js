const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


// The disk storage engine gives you full control on storing files to disk.

const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    cb(null, 'uploads');
  },
  filename:  (req, file, cb)=> {
    console.log(file)
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'))




let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/signup",upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file.path);

  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });

    await User.insertMany([newUser]);
    res.json({ status: "Success", msg: "User created Successfully" });
  } catch (error) {
    res.json({
      status: "Failure",
      msg: " Unable to create an account",err:err
     
    });
  }
});


app.post("/login",upload.none(), async (req,res)=>{
  console.log(req.body);

  let userDetails = await User.find().and({email:req.body.email});

  console.log(userDetails);

  if(userDetails.length > 0 ){

    if(userDetails[0].password == req.body.password){

      let token = jwt.sign({email:req.body.email,password:req.body.password},"naidu");

      let userDataToSend = {
        firstName:userDetails[0].firstName,
        lastName:userDetails[0].lastName,
        age:userDetails[0].age,
        email:userDetails[0].email,
        mobileNo:userDetails[0].mobileNo,
        profilePic:userDetails[0].profilePic,
        token:token,

      };
      res.json({status:"Success",data:userDataToSend});

    
   }else{
      res.json({status:"Failure",msg:"Invalid Password"});
    }

  }else{
    res.json({status:"Failure",msg:"User does not exist"});
  }



});

app.post("/loginWithToken",upload.none(), async(req,res)=>{
  console.log(req.body);


  let decryptedToken = jwt.verify(req.body.token,"naidu");

  console.log(decryptedToken);

  let userDetails= await User.find().and({email:decryptedToken.email});

  if(userDetails.length > 0){

    if(userDetails[0].password == decryptedToken.password){

      let userDataToSend = {
        firstName:userDetails[0].firstName,
        lastName:userDetails[0].lastName,
        age:userDetails[0].age,
        email:userDetails[0].email,
        mobileNo:userDetails[0].mobileNo,
        profilePic:userDetails[0].profilePic,
      };
      res.json({status:"Success",data:userDataToSend});

    

    }else{
      res.json({status:"Failure",msg:"Invalid Token"});
    }

  }else{
    res.json({status:"Failure",msg:"Invalid Token"});
  }

});






app.listen(process.env.port, () => {
  console.log(`Listening to port ${process.env.port}`);
});

let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.mdburl);
    console.log("Successfully connected to MDB");
  } catch (err) {
    console.log("Unable to  connect to MDB");
  }
};

connectToMDB();
