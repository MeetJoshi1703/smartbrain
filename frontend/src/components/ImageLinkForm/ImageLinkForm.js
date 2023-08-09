import './ImageLinkForm.css'
import React, { useState } from 'react';
import axios from 'axios';
import { FormControl,Button } from 'react-bootstrap';

export default function ImageLinkForm(props){

    const {setOutputs,setImageToPredict,loadUser,user}=props;     
    const [imageUrl,setImageUrl]=useState("https://samples.clarifai.com/dog2.jpeg")

    const hadleChangeImageUrl=(e)=>{
        setImageUrl(e.target.value);
    }
    
    const predictImage = () =>{
        setImageToPredict(imageUrl);
        axios.post('/predict',{
            imageUrl:imageUrl
        }).then((res)=>{
            setOutputs(res.data.result);
            if(user.id=='guest'){
                return
            }
            else{
            if(res){
                fetch('http://localhost:8080/image',{
                    method:'put',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify({
                        id:user.id,
                    })
                })
                .then(response=>response.json())
                .then(users=>{
                    
                    loadUser(Object.assign(user,{entries:users.entries}))
                })
            }
        }
            
        }).catch((err)=>{
            alert(err);
        })

    }


    return(
        <div>
            <p className="f3">
                {'This app will detect the object in your image. Give it a try!'}
            </p>
            <p>
                (Get more images to test from <a style={{color:'black'}} href='https://unsplash.com/' target='_blank'>Unsplash</a>)
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5" >
                    <input 
                        className="f4 pa2 w-70 center"
                        type="text" 
                        value={imageUrl} 
                        placeholdr="Image URL" 
                        aria-label="Image URL" 
                        onChange={hadleChangeImageUrl}    
                    />

                    <button 
                        onClick={predictImage} 
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}