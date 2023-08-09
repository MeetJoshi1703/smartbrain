import { Tilt } from 'react-tilt'
import brain from './brain.png'
import './Logo.css'

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            55,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

export default function Logo(){
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={defaultOptions} style={{ height: 150, width: 150 }}>
                <div className="Tilt=inner"><img src={brain} alt='logo' style={{paddingTop:'40px',height:'120px'}} /> </div>
            </Tilt>
        </div>  
    );
}