import "./Particle.css"
import Particles from "react-tsparticles"
import {loadFull} from "tsparticles"

export default function Particle(){
    const particlesInit= async (main)=>{
        console.log(main);
        await loadFull(main);
    };
    const particlesLoaded= (container)=>{
        console.log(container);
    };
    return(
        <div className="particle">
        <Particles 
            id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={
                    {
                        background: {
                    color: {
                        rgba:(13, 71, 161, 0),
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {  
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#FDFEFF",
                    },
                    links: {
                        color: "#FDFEFF",
                        distance: 130,
                        enable: true,
                        opacity: 0.5,
                        width: 0.6,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1.2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1000,
                        },
                        value: 140,
                    },
                    opacity: {
                        value: 0.8,
                    },
                    shape: {
                        type: "",
                    },
                    size: {
                        value: { min: 1, max: 1 },
                    },
                },
                detectRetina: true,
                    }
                }
                
        />
        </div>
    );
}