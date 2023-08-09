
export default function Navigation({onRouteChange,loadUser,setOutputs,setImageToPredict,route}){

    const data = {
        id:"",
        name:"",
        email:"",
        entries:0,
        joined: ""
    }

    const handleSignout=()=> {
        loadUser(data);
        onRouteChange('signIn');
        setImageToPredict("");
        setOutputs([]);
    }

   
    return(
        <div>
            {
                route==='home'
                ?<div style={{display:'flex',justifyContent:'flex-end'}} >
                    <p onClick={handleSignout} className="f3 link dim black underline pa3 pointer" >Sign Out</p>
                 </div>
                :<div>
                    <div style={{display:'flex',justifyContent:'flex-end'}} >
                        <p onClick={()=>onRouteChange('signIn')} className="f3 link dim black underline pa3 pointer" >SignIn</p>
                        <p onClick={()=>onRouteChange('register')} className="f3 link dim black underline pa3 pointer" >Register</p>
                    </div>
                </div>
            }
                 
        </div>
        
    );
}