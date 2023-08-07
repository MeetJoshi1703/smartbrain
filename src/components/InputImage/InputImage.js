import React, { useState } from 'react';
import axios from 'axios';
import { FormControl,Button } from 'react-bootstrap';

export default function InputImage(props) {
    const {setOutputs,setImageToPredict}=props;     
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
            // alert(JSON.stringify(res.data));
        }).catch((err)=>{
            alert(err);
        })
    }

    return (
        <div>
            <FormControl 
                className="mb-3"
                value={imageUrl} 
                placeholdr="Image URL" 
                aria-label="Image URL" 
                onChange={hadleChangeImageUrl}
            />
            <Button variant="primary" onClick={predictImage} >
                Submit
            </Button>
        </div>
    );
}
