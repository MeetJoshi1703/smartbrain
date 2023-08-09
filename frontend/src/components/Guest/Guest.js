import './Guest.css'

export default function Guest({loadUser,onRouteChange}){
    const guest = {
        id:"guest",
        name:"Guest",
        email:"",
        entries:0,
        joined: ""
    }
    const guestLogin=()=>{
        loadUser(guest);
        onRouteChange('home');
    }


    return(
        <p onClick={guestLogin} className="f4 link dim black underline pa3 pointer guest" >Sign In as a guest ?</p>
    );
}