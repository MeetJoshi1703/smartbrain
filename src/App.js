import {useState} from 'react'
import {Container,Stack} from "react-bootstrap";
import Output from "./components/Output/Output";
import './App.css';
import tachyons from 'tachyons';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particle from './components/Particle/Particle';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Guest from './components/Guest/Guest';



function App() {
  const [outputs,setOutputs]=useState([]);
  const [imageToPredict,setImageToPredict]=useState("");
  const [route,setRoute]=useState('signIn')
  const [user,setUser]=useState({
    id:"",
    name:"",
    email:"",
    entries:0,
    joined: ""
  })

 
 const loadUser=(data)=>{
  setUser({
    id:data.id,
    name:data.name,
    email:data.email,
    entries:data.entries,
    joined: data.joined
  }) 
 } 
 const onRouteChange=(route)=>{
  setRoute(route)
 }

  return (
    <div className="App"> 
      <Particle />      
      <Navigation 
        onRouteChange={onRouteChange} 
        loadUser={loadUser} 
        setOutputs={setOutputs} 
        setImageToPredict={setImageToPredict} 
        route={route} 
      />
      { route==='home' 
      ?<div>

          <Rank 
            name={user.name} 
            entries={user.entries} 
          />

          <ImageLinkForm
            setOutputs={setOutputs} 
            setImageToPredict={setImageToPredict}
            user={user}
            loadUser={loadUser}
          />

          <div>
            <Container>
              <div className="mt-3" />
              <Stack gap={2}>
              <Output 
                outputs={outputs} 
                imageToPredict={imageToPredict}   
              />
              </Stack>
            </Container>
          </div>
        </div>
      :(
        route==='signIn'
        ?<div>
          <SignIn 
            onRouteChange={onRouteChange} 
            loadUser={loadUser} 
          />
          <Guest 
            onRouteChange={onRouteChange} 
            loadUser={loadUser}
          />
        </div>
        :<div>
          <Register 
            onRouteChange={onRouteChange} 
            loadUser={loadUser} 
          />
          <Guest 
            onRouteChange={onRouteChange} 
            loadUser={loadUser}    
          />
        </div>
      )
      }
    </div>
  );
}

export default App;
