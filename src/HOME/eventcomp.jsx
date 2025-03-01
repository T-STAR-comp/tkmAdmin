import styles from './styles/eventcomp.module.css';
import LineGraph from './chart.jsx';
import url from '../URL/url.js';
import EditEvent from './createEvent.jsx';
import { useState, useEffect } from 'react';

function EventComp (props) {
    
    const[details , setDetails] = useState({display:'none'});
    const[Editmode, SetEditmode] = useState({display:"none"});
    const[Editmode2, SetEditmode2] = useState({display:'flex'});
    const[BtnStyle, SetBtnStyle] = useState({display:'none'});
    const[statusRGB, SetStatusRGB] = useState("#434343");
    const[day, setDay] = useState(null);
    const[Month, setMonth] = useState(null);
    const[Year, setYear] = useState(null);
    const[Loading, SetLoading] = useState(false);

    
    function status(){
        const eventStatus = props.EVENTSATATUS;
        
        if(eventStatus === 1){
            SetStatusRGB("#0000F5");
        }
        else if(eventStatus === 0){
            SetStatusRGB("#434343");
        }
    }
    
    const EventEditmode = () =>{
        SetEditmode({display:'flex'});
        SetEditmode2({display:"none"});
    };
    
    const EditeventModecancel = () => {
        SetEditmode({display:'none'});
        SetEditmode2({display:"flex"});
    }

    useEffect(() => {
        status();
    }, []);
    const ChangeDetailsStyle = ()=>{
        setDetails({display:'flex'});
        getDate();
    }
    const ActiveOn = async()=>{
        const info = {
            V: 1,
            E: props.EVENTNAME,
        };
        if(sessionStorage.getItem('masterLOGGED')){
             try {
            const res = await fetch(import.meta.env.VITE_AdminUpdataDataURL,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });
            const data = await res.json();
            if(data.status === "ok"){
                location.reload();
            }
        }
        catch(err){
            null
        }}
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
            }
    }
    const ActiveOff = async ()=>{
        const info = {
            V: 0,
            E: props.EVENTNAME,
        };
        if(sessionStorage.getItem('masterLOGGED')){
            try {
            const res = await fetch(import.meta.env.VITE_AdminUpdataDataURL,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });
            const data = await res.json();
            if(data.status === "ok"){
                location.reload();
            }
        }
        catch(err){
            null
        }}
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
        }
    }
    const ChangeDetailsStyleNormal = ()=>{
        setDetails({display:'none'});
    }
    const DeleteEvent = async()=>{
        const info = props.EVENTNAME;
        if(sessionStorage.getItem('masterLOGGED')){
            try {
            SetLoading(true);
            const res = await fetch (import.meta.env.VITE_AdminDeleteDataURL,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    info
                }),
            });

            const data = await res.json();
            if(data.status === "ok"){
                location.reload();
                
            }
        }
        catch(err){
            console.log(err);
        }}
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
        }
    }
    const getDate = ()=>{
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');   // Day with leading zero if needed
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month with leading zero if needed
        const year = currentDate.getFullYear();
        setDay(day);
        setMonth(month);
        setYear(year);
    }
    //

    if(Loading) {
        return(     
            <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
            </div>)
    }

    return (
        <>

            <div className={styles.main_event_cont_div}>
                <div className={styles.main_div}>
                    <div className={styles.text_holder_div}>
                        <p className={styles.event_name}>{props.EVENTNAME}</p>
                        <p className={styles.edit_event_btn} onClick={ChangeDetailsStyle}>Edit Event</p>
                    </div>
                
                    <div style={details} className={styles.detailsl_main_cont}>
                        <p className={styles.manage_event_hd_txt}>Manage Event </p>
                        <p onClick={ActiveOff}  className={styles.inactive_icon}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#EA3323"><path d="M186.67-120q-27.5 0-47.09-19.58Q120-159.17 120-186.67v-586.66q0-27.5 19.58-47.09Q159.17-840 186.67-840h586.66q12 0 22 4.5t17 10.83l-54 54v-2.66H186.67v586.66h586.66V-504L840-570.67v384q0 27.5-19.58 47.09Q800.83-120 773.33-120H186.67ZM461-285.33 237.67-508.67l46.66-46.66L461-378.67l377-377 47 46.34-424 424Z"/></svg></p>
                        <p onClick={ActiveOn} className={styles.active_icon}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#75FB4C"><path d="M186.67-120q-27.5 0-47.09-19.58Q120-159.17 120-186.67v-586.66q0-27.5 19.58-47.09Q159.17-840 186.67-840h586.66q12 0 22 4.5t17 10.83l-54 54v-2.66H186.67v586.66h586.66V-504L840-570.67v384q0 27.5-19.58 47.09Q800.83-120 773.33-120H186.67ZM461-285.33 237.67-508.67l46.66-46.66L461-378.67l377-377 47 46.34-424 424Z"/></svg></p>
                        <p className={styles.status_check}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill={statusRGB}><path d="M480-80q-84.33 0-157.33-30.83-73-30.84-127-84.84t-84.84-127Q80-395.67 80-480q0-83.67 30.83-156.67 30.84-73 84.84-127t127-85.16Q395.67-880 480-880q71.67 0 134.33 22.33Q677-835.33 728-796l-48 48.33q-42-31.33-92.33-48.5-50.34-17.16-107.67-17.16-141 0-237.17 96.16Q146.67-621 146.67-480t96.16 237.17Q339-146.67 480-146.67t237.17-96.16Q813.33-339 813.33-480q0-26-3.66-51-3.67-25-11-48.67L851-632q14.33 35.33 21.67 73.33 7.33 38 7.33 78.67 0 84.33-31.17 157.33-31.16 73-85.16 127t-127 84.84Q563.67-80 480-80Zm-58-217.33L255.33-464.67 304-513.33l118 118L831.33-805l49.34 48.67-458.67 459Z"/></svg></p>
                        <p className={styles.close_svg} onClick={ChangeDetailsStyleNormal}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></p>
                            
                        <div className={styles.manage_event_main}>
                            <div className={styles.manage_ev_left_div}>
                                <img src={props.EVENTIMG} alt='img' />
                                <p className={styles.manage_ev_date}>{day}/{Month}/{Year}</p>
                                <p onClick={DeleteEvent} className={styles.settings_icon}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></p>
                            </div>

                            {/*<div className={styles.manage_ev_right_div} style={Editmode}>
                                <p onClick={EditeventModecancel} className={styles.close_editmode}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></p>
                                <EditEvent
                                    Hidebtn={{display:'none'}}
                                    btnStyle={BtnStyle}
                                />
                            </div>*/}
                                
                            
                            <div className={styles.manage_ev_right_div} style={Editmode2} >
                                <p className={styles.fincnial_div_hd_txt}>Financial</p>
                                <p className={styles.download_icon} onClick={null}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#255290"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></p>

                                <p className={styles.total_txts}>Total tickets sold : {sessionStorage.getItem('masterLOGGED') ? `${props.TICKETSSOLD}TK` : 'NULL'}</p>
                                <p className={styles.total_txts}>Total Revenue Today : <p className={styles.green_txt}>{sessionStorage.getItem('masterLOGGED') ? `Mwk${props.DAILYREVENUE}` : 'NULL'}</p></p>
                                <p className={styles.total_txts}>Total Revenue : <p className={styles.green_txt}>{sessionStorage.getItem('masterLOGGED')? `Mwk ${props.TOTALREVENUE}` : 'NULL'}</p></p>
                                {/*<LineGraph/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventComp;