import tachyons from 'tachyons';
import { useState } from 'react';
import './Register.css'

export default function Register({onRouteChange,loadUser}){


    const [formvalue,setFormvalue]=useState(
        {
            name:'',
            email:'',
            password:''
        
        }
    )

    const handleInput=(e)=>{
        const {name,value}=e.target;
        setFormvalue({...formvalue,[name]:value})
        
    }

    const handleFormsubmit=(e)=>{
        e.preventDefault();
            // console.log(formvalue);
        fetch('http://localhost:8080/register',{
            method:'post',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                name:formvalue.name,
                email:formvalue.email,
                password:formvalue.password
            })
        })
        .then(response=>response.json())
        .then(user=>{
            if(user.id){
                loadUser(user);
                onRouteChange('home');
            }
        })

        
    }



    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                <fieldset
                id="sign_up"
                className="ba b--transparent ph0 mh0"
                >
                <legend className="f1 fw6 ph0 mh0">
                Register
                </legend>
                <div className="mt3">
                <label
                className="db fw6 lh-copy f6"
                for="name"
                >
                Name
                </label>
                <input
                className="pa2 input-reset ba bg-transparent  hover-bg-black hover-white w-100 name-input"
                type="text"
                name="name"
                value={formvalue.name}
                id="name"
                onChange={handleInput}
                />
                </div>
                <div className="mt3">
                <label
                className="db fw6 lh-copy f6"
                for="email"
                >
                Email
                </label>
                <input
                className="pa2 input-reset ba bg-transparent  hover-bg-black hover-white w-100 email-input"
                type="email"
                name="email"
                value={formvalue.email}
                id="email"
                onChange={handleInput}
                />
                </div>
                <div className="mv3">
                <label
                className="db fw6 lh-copy f6"
                for="password"
                >
                Password
                </label>
                <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 password-input"
                type="password"
                name="password"
                value={formvalue.password}
                id="password"
                onChange={handleInput}
                />
                </div>

                </fieldset>
                <div className="">
                <input
                onClick={handleFormsubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                />
                </div>
                </form>
            </main>
        </article>
    );
}