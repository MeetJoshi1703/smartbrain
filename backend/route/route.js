const express = require('express')
const router = express.Router()
const {signinUser,registerUser,userId,imageUpdate,predictImage,home}=require("../controllers/contollers")
const cors = require('cors');

router.use(cors())


router.get('/',home)

router.post("/signin",signinUser)

router.post('/register',registerUser)

router.get('/profile/:id',userId)

router.put('/image',imageUpdate)

router.post('/predict',predictImage)


module.exports=router