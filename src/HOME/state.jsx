import React from "react";
import styles from './styles/state.module.css';
import { useState } from "react";

const State = (props) => {

    const[landingColor, SetLandingColor] = useState({color:'red'});
    const[MaintainanceColor, SetMaintainanceColor] = useState({color:'red'});

    const LandingOn = async ()=>{


        const info = {
            state:1
        }
        if(sessionStorage.getItem('masterLOGGED')){

            try{
                const res = await fetch(import.meta.env.VITE_landingStateURL,{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info),
                });
                const data = await res.json();
                
                if(data.status === 'ok'){
                    window.alert('Landing page active');
                }
            }
            catch(err){
                window.alert(err);
            };
        }
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
        }
    };

    const LandingOff = async()=>{
        const info = {
            state:1
        }
        if(sessionStorage.getItem('masterLOGGED')){

            try{
                const res = await fetch(import.meta.env.VITE_landingStateURL,{
                    method:"DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info),
                });
                const data = await res.json();

                if(data.status === 'ok'){
                    window.alert('Landing page inactive');
                }
            }
            catch(err){
                window.alert(err);
            };
        }
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
        }
    }

    const MaintainOn = async ()=>{


        const info = {
            state:1
        }
        if(sessionStorage.getItem('masterLOGGED')){

            try{
                const res = await fetch(import.meta.env.VITE_maintainanceStateURL,{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info),
                });
                const data = await res.json();

                if(data.message === 'ok'){
                    window.alert('maintainance page active');
                }
            }
            catch(err){
                window.alert(err);
            };
        }
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
        }
    };

    const MaintainOff = async()=>{
        const info = {
            state:1
        }
        if(sessionStorage.getItem('masterLOGGED')){

            try{
                const res = await fetch(import.meta.env.VITE_maintainanceStateURL,{
                    method:"DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info),
                });
                const data = await res.json();

                if(data.status === 'ok'){
                    window.alert('maintainance page inactive');
                }
            }
            catch(err){
                window.alert(err);
            };
        }
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
        }
    }

  return (
    <div className={styles.main_cont}>
        <p className={styles.headtxt}>Main App State</p>   

        <div className={styles.switch_cont}>

            <div className={styles.states_cont}>
                <p className={styles.tittles} style={landingColor}>L</p>
                <button onClick={LandingOn} className={styles.toggles}>ON</button>
                <button onClick={LandingOff} className={styles.toggles}>OFF</button>
            </div>

            <div className={styles.states_cont}>
                <p className={styles.tittles} style={MaintainanceColor}>M</p>
                <button onClick={MaintainOn} className={styles.toggles}>ON</button>
                <button onClick={MaintainOff} className={styles.toggles}>OFF</button>
            </div>
        </div>
    </div>
  );
};

export default State;
