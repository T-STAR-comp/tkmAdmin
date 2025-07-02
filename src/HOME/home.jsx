import styles from './styles/home.module.css';
import { useState, useEffect } from 'react';
import EventComp from './eventcomp.jsx';
import LOG_OUT from './logout.jsx';
import CreateEvent from './createEvent.jsx';
import State from './state.jsx';
import Console from './console.jsx';
import CreateUser from './createUser.jsx';
import ViewUsers from './viewUsers.jsx';
import url from '../URL/url.js';

function Home () {
    
    const[logout, SetLogout] = useState({display:'none'});
    const[CreateEv ,SetCreateEv] = useState({display:'none'});
    const[Events, SetEvents] = useState([]);
    const[Pin, setPin] = useState();
    const[pinIput, setPinInput] = useState({display:'none'});
    const[States, SetStates] = useState({display:'none'});
    const[stateon, setStateon] = useState({display:'flex'});
    const[console, Setconsole] = useState({display:'none'});
    const[loggingout, Setloggingout] = useState(false);
    const[Createuser, SetCreateuser] = useState({display:'none'});
    const[ViewUsersOpen, setViewUsersOpen] = useState(false);
    const handleChange = (e) => {
        const {value} = e.target;
        setPin(value);
    };

    const openConsole = ()=>{
        Setconsole({display:'flex'});
    }

    const closeConsole = ()=>{
        Setconsole({display:'none'});
    }

    const stateson = ()=>{
        SetStates({display:"flex"});
        setStateon({display:"none"});
    }

    const statesoff = ()=>{
        SetStates({display:'none'});
        setStateon({display:'flex'});
    }

    const insertPin =()=>{
        setPinInput({display:'flex'});
    }

    const cancelPinIN =()=>{
        setPinInput({display:'none'});
    }

    const openLogOut =()=>{
        SetLogout({display:'flex'});
    }

    const CloseLogOut =()=>{
        SetLogout({display:'none'});
    }

    const Logout =()=>{
        sessionStorage.removeItem('valid');
        sessionStorage.removeItem('masterLOGGED');
        sessionStorage.removeItem('Logged');
        sessionStorage.removeItem('CamActive');
        Setloggingout(true);
        window.location.reload();
    }

    const CreateEvOn =()=>{
        SetCreateEv({display:'flex'});
    }
    const CreateEvOff =()=>{
        SetCreateEv({display:'none'});
    }

    const ActivateMaster =async ()=>{
        const info = Pin;

        try{
            const res = await fetch(import.meta.env.VITE_MasterLogURL,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({info}),
            });
            const data = await res.json();

            if(data === 'valid'){
                sessionStorage.setItem('masterLOGGED',import.meta.env.VITE_masterLOGGED);
                setPinInput({display:'none'});
            }
            if(data != 'valid'){
                window.alert('Invalid Master Details!')
            }

        }
        catch(err){
            if(err){
                window.alert(err);
            }
        }
    }

    const GetData = async()=>{
        try {
            const res = await fetch (import.meta.env.VITE_AdminGetDataURL);
            const data = await res.json();

            if(data){
                if (data.state != 'none') {
                    SetEvents(data);
                }
            };

        }
        catch(err){
            if(err){
                window.alert(err);
            };
        };
    };
    
    useEffect(() => {
        GetData();
    }, []);

    if(loggingout === true){
        return(
            <p>
                Logging Out........
            </p>
        );
    }

    return (
        <div className={styles.main_cont}>

            <div style={logout} className={styles.Extra_divs}>
                <LOG_OUT
                FunctLogOut={Logout}
                FunctCancel={CloseLogOut}
                />
            </div>

            <div style={CreateEv} className={styles.Extra_divs}>
                <CreateEvent 
                FunctCancel={CreateEvOff}
                ReloadData={GetData}
                />
            </div>

            <div style={Createuser} className={styles.Extra_divs}>
                <CreateUser
                FunctCancel={()=>SetCreateuser({display: 'none'})}
                />
            </div>

            {ViewUsersOpen && (
                <div className={styles.Extra_divs}>
                    <ViewUsers FunctCancel={() => setViewUsersOpen(false)} />
                </div>
            )}

            <div className={styles.head_bar_cont}>
                <div className={styles.text_div}>
                <p className={styles.text1_}>Ticket Malawi</p>
                <p className={styles.text2_}>ADMIN ACCESS</p>
                <input style={pinIput} type='number' required onChange={handleChange} />
                <button onClick={ActivateMaster} style={pinIput} className={styles.verifyBnt}>Activate</button>
                <button style={pinIput} onClick={cancelPinIN} className={styles.verifyBnt}>Cancel</button>
                </div>
                <div className={styles.settings_home}>
                    {sessionStorage.getItem('masterLOGGED')? <p ><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5"><path d="m345.33-60-76-129.33-148.66-31.34 16-147.33L40-480l96.67-111.33-16-147.34L269.33-770l76-130L480-839.33 614.67-900l76.66 130 148 31.33-16 147.34L920-480l-96.67 112 16 147.33-148 31.34L614.67-60 480-120.67 345.33-60Zm29.34-86.67L480-191.33l108 44.66 63.33-98.66L766-274l-11.33-116.67L833.33-480l-78.66-91.33L766-688l-114.67-26.67L586-813.33l-106 44.66-108-44.66-63.33 98.66L194-688l11.33 116.67L126.67-480l78.66 89.33L194-272l114.67 26.67 66 98.66ZM480-480Zm-42.67 136L664-569.33 615.33-616l-178 176.67-92-94L296-484.67 437.33-344Z"/></svg></p>: null}
    
                    <p onClick={openLogOut} className={styles.header_icons}><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#255290"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg></p>
                    <p onClick={CreateEvOn} className={styles.header_icons}><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#255290"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></p>
                    <p onClick={insertPin}  className={styles.header_icons}><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#255290"><path d="M436.67-344 664-571.33l-47-46.34-178.33 178.34-95.34-95.34L295-486.33 436.67-344ZM480-80.67q-139.67-35-229.83-161.5Q160-368.67 160-520.67v-240l320-120 320 120v240q0 152-90.17 278.5Q619.67-115.67 480-80.67Zm0-69.33q111.33-36.33 182.33-139.67 71-103.33 71-231v-193.66L480-809.67l-253.33 95.34v193.66q0 127.67 71 231Q368.67-186.33 480-150Zm0-330Z"/></svg></p>
                    <p onClick={openConsole} className={styles.header_icons}><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#255290"><path d="M319.33-246.67h321.34v-66.66H319.33v66.66Zm0-166.66h321.34V-480H319.33v66.67ZM226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-666.66q0-27 19.83-46.84Q199.67-880 226.67-880H574l226 226v507.33q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm314-542.67v-190.66h-314v666.66h506.66v-476H540.67Zm-314-190.66v190.66-190.66 666.66-666.66Z"/></svg></p>
                    <p onClick={()=>SetCreateuser({display: 'flex'})} className={styles.header_icons}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#255290"><path d="M726.67-400v-126.67H600v-66.66h126.67V-720h66.66v126.67H920v66.66H793.33V-400h-66.66ZM360-480.67q-66 0-109.67-43.66Q206.67-568 206.67-634t43.66-109.67Q294-787.33 360-787.33t109.67 43.66Q513.33-700 513.33-634t-43.66 109.67Q426-480.67 360-480.67ZM40-160v-100q0-34.67 17.5-63.17T106.67-366q70.66-32.33 130.89-46.5 60.22-14.17 122.33-14.17T482-412.5q60 14.17 130.67 46.5 31.66 15 49.5 43.17Q680-294.67 680-260v100H40Zm66.67-66.67h506.66V-260q0-14.33-7.83-27t-20.83-19q-65.34-31-116.34-42.5T360-360q-57.33 0-108.67 11.5Q200-337 134.67-306q-13 6.33-20.5 19t-7.5 27v33.33ZM360-547.33q37 0 61.83-24.84Q446.67-597 446.67-634t-24.84-61.83Q397-720.67 360-720.67t-61.83 24.84Q273.33-671 273.33-634t24.84 61.83Q323-547.33 360-547.33Zm0-86.67Zm0 407.33Z"/></svg></p>
                    <p onClick={stateson}  style={stateon} className={styles.header_icons}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#255290"><path d="M480-360 280-559.33h400L480-360Z"/></svg></p>
                    <p onClick={statesoff} style={States} className={styles.header_icons}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#255290"><path d="m280-400 200-200.67L680-400H280Z"/></svg></p>
                    <p onClick={() => setViewUsersOpen(true)} className={styles.header_icons}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#255290"><path d="M640-402q-50.67 0-84.67-34t-34-84.67q0-50.66 34-84.66t84.67-34q50.67 0 84.67 34t34 84.66q0 50.67-34 84.67T640-402ZM400-160v-69.33q0-19.58 9.33-37.29 9.34-17.71 25.34-26.05 45-30.33 97.5-45.16 52.5-14.84 107.83-14.84t107.5 15.84q52.17 15.83 97.83 44.16 15.34 10.34 25 27Q880-249 880-229.33V-160H400Zm65.33-74v7.33h349.34V-234Q777-258 730-272t-90-14q-43 0-90.33 14-47.34 14-84.34 38ZM640-468.67q23 0 37.5-14.5t14.5-37.5q0-23-14.5-37.5t-37.5-14.5q-23 0-37.5 14.5t-14.5 37.5q0 23 14.5 37.5t37.5 14.5Zm0-52Zm0 294Zm-520-180v-66.66h310.67v66.66H120Zm0-326.66V-800h475.33v66.67H120ZM460.67-570H120v-66.67h373.33q-12 14.34-19.98 30.95-7.99 16.61-12.68 35.72Z"/></svg>
                    </p>
                </div>
            </div>

            <input className={styles.serach_input} type="text" placeholder='Search Event' />
            <hr />
            
            <div className={styles.states_div} style={States}>
                <State/>
            </div>

            <div className={styles.states_div} style={console}>
                <Console
                    close={closeConsole}
                />
            </div>

            {Events? Events.map((Event) => (
                <EventComp
                    ID= {Event.id}
                    EVENTNAME= {Event.EventName}
                    EVENTIMG= {Event.ImageURL}
                    TICKETSSOLD= {Event.TicketsSold}
                    DAILYREVENUE= {Event.DailyRev}
                    TOTALREVENUE= {Event.TotalRev}
                    EVENTSATATUS= {Event.Status}
                />
                
            )) : null}
            
        </div>
    );
}

export default Home;