const db = require('../connectDB/connectDB')
const bcrypt = require('bcrypt-nodejs')
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();   
const metadata = new grpc.Metadata();
require('dotenv').config('../.env')
metadata.set("authorization", `Key ${process.env.API}`);




function predictImages(inputs){
    return new Promise((resolve,reject)=>{
        stub.PostModelOutputs(
            {
                // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                model_id: "aaa03c23b3724a16a56b629203edc62c",
                inputs: inputs
            },
            metadata,
            (err, response) => {
                if (err) {
                    reject("Error: " + err);
                    return;
                }
        
                if (response.status.code !== 10000) {
                    reject("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }

                let result=[];
                for (const c of response.outputs[0].data.concepts) {
                    result.push({
                        name:c.name,
                        value:c.value
                    })
                }
                resolve(result);
            }
        );
    })
}










const home = async (req,res)=>{
    res.json(database.users);
}



const signinUser =async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json('incorrect form submission')
    }

    db.select('email','hash').from('login')
    .where('email' ,'=', email)
    .then(data=>{
        const isValid=bcrypt.compareSync(password , data[0].hash);
        if(isValid){
            return db.select('*').from('users')
                .where('email','=',email)
                .then(user=>{
                    res.json(user[0]);
                })
                .catch(err=>{
                    res.status(400).json(err);
                })
            
        }
        else{
            res.status(400).send('wrong password')
        }
    })
    .catch(err=>{
        res.status(400).json(err)
    })    
}


const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;

    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission')
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginemail=>{
            return db('users')
            .returning('*')
            .insert({
                name:name,
                email:loginemail[0].email,
                joined: new Date()
            })
            .then(user=>{
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
            .catch(err=>{
                //critical to give err 
                res.status(400).json("unable to register")
            })
}

const userId = async (req,res)=>{
    const {id} = req.params;
   
    db.select('*').from('users')
    .where({id})
    .then(user=>{
        if(user.length){
            res.json(user[0]);
        }
        else{
            res.status(400).json("Not found")
        }
        
    })
   
}

const imageUpdate = async (req,res)=>{
    const {id} = req.body;
    
    db('users').where({id},'=',id)
    .increment('entries', 1)
    .returning('*')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=>{
        res.status(400).json("error")
    })

}

const predictImage = async (req,res,next)=>{
    try{
        const { imageUrl } = req.body;
        const inputs = [
            {
                data: {
                    image: {
                        url: imageUrl
                    }
                }
            }
        ];
        const result=await predictImages(inputs);
        return res.send({
            result
        })
    }catch (err){
        return res.status(400).send({
            error:err
        })
    }
}



module.exports = {
    signinUser:signinUser,
    registerUser:registerUser,
    userId:userId,
    imageUpdate:imageUpdate,
    predictImage:predictImage,
    home:home
}