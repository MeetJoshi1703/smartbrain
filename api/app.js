const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path=require('path');
const router  = require('./route/route');
const PORT = process.env.PORT || 8080
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/',router);
app.use(cors());


app.get('/',(req,res)=>{
    res.json("hello");
})



app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`);
})

