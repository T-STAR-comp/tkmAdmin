import { useState } from 'react';
import styles from './styles/createEvent.module.css';

const CreateEvent = (props) => {
    const[Loading, SetLoading] = useState(false);

    const [eventData, setEventData] = useState({
        eventName: '',
        imageUrl: '',
        venue: '',
        location: '',
        firstDate: '',
        secondDate: '',
        time: '',
        standardPrice: '',
        vipPrice: '',
        QRcodeURL: import.meta.env.VITE_CreateTicketURL,
        standardBaseId: '',
        vipBaseId: '',
        eventUrl: '',
        eventDescription: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const CreateAnEvent = async()=>{
        
        if(sessionStorage.getItem('masterLOGGED')){
            if(Object.values(eventData).every(value => value !== '' || null)){

                try{
                    SetLoading(true);
                    const response = await fetch(import.meta.env.VITE_CreateEventURL,{
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(eventData),
                    });
                    const data = await response.json();
                    if(data){

                        if(response.ok){
                            window.location.href = '/';
                            SetLoading(false);
                        }
                    }
                }
                catch(err){
                    window.alert(err);
                }
            }
            else if(Object.values(eventData).every(value => value > 0)) {
                window.alert('ALL FIELDS MUST BE FILLED!!');
            };
        }
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
        }
          
    };

    const UpdateAnEvent = async()=>{
        
        if(sessionStorage.getItem('masterLOGGED')){
            if(Object.values(eventData).every(value => value !== '' || null)){

                try{
                    SetLoading(true);
                    const response = await fetch (import.meta.env.VITE_UpdateEventURL,{
                        method:'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(eventData),
                    });
                    const data = await response.json();
                    console.log(data)
    
                    window.alert(data.message);
                    if(data){
                        console.log(data)
                        if(data.status === 'ok'){
                            SetLoading(false);
                        }
                    }
            
                }
                catch(err){
                    window.alert(err);
                }
                finally{
                    SetLoading(false);
                    //window.location.href = '/';
                }
            }
            else if(Object.values(eventData).every(value => value > 0)) {
                window.alert('ALL FIELDS MUST BE FILLED!!');
            };
        }
        else if(!sessionStorage.getItem('masterLOGGED')){   
            window.alert('Cannot Execute This Function In Base');
        }
          
    };

    if(Loading) {
        return(     
            <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
            </div>)
    }

    return (
        <div className={styles.main_cont}>
            <div className={styles.input_main_div}>
                <div className={styles.input_second_div}>
                    <div className={styles.inner_div}>
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="eventName"
                            value={eventData.eventName}
                            onChange={handleChange}
                            placeholder="Event Name"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="imageUrl"
                            value={eventData.imageUrl}
                            onChange={handleChange}
                            placeholder="Image Url"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="venue"
                            value={eventData.venue}
                            onChange={handleChange}
                            placeholder="Venue Eg civo stadium"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            placeholder="Location Eg area 47,Lilongwe"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="firstDate"
                            value={eventData.firstDate}
                            onChange={handleChange}
                            placeholder="First Date Eg 18 sep"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="secondDate"
                            value={eventData.secondDate}
                            onChange={handleChange}
                            placeholder="Second Date Eg 18 sep 2024"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="time"
                            value={eventData.time}
                            onChange={handleChange}
                            placeholder="Time Eg 10:30"
                            required
                        />
                    </div>

                    <div className={styles.inner_div}>
                        <input
                            className={styles.details_events_inputs}
                            type="number"
                            name="standardPrice"
                            value={eventData.standardPrice}
                            onChange={handleChange}
                            placeholder="Standard Price"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="number"
                            name="vipPrice"
                            value={eventData.vipPrice}
                            onChange={handleChange}
                            placeholder="Vip Price"
                            required
                        />
                        <select
                            className={styles.select_optn}
                            name="qrurl"
                            id="qrurl"
                            onChange={handleChange}
                        >
                            <option value={null}>
                                SELECT GEN SERVER ENGINE URL
                            </option>

                            <option value={import.meta.env.VITE_CreateTicketURL}>
                                SERVER ENGINE URL LIVE
                            </option>
                        </select>
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="standardBaseId"
                            value={eventData.standardBaseId}
                            onChange={handleChange}
                            placeholder="Standard Base ID"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="vipBaseId"
                            value={eventData.vipBaseId}
                            onChange={handleChange}
                            placeholder="Vip Base ID"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="eventUrl"
                            value={eventData.eventUrl}
                            onChange={handleChange}
                            placeholder="Event URL/Path"
                            required
                        />
                        <input
                            className={styles.details_events_inputs}
                            type="text"
                            name="eventDescription"
                            value={eventData.eventDescription}
                            onChange={handleChange}
                            placeholder="Event Description"
                            maxLength="5000"
                            required
                        />
                    </div>
                </div>
                <button style={props.Hidebtn} onClick={CreateAnEvent} className={styles.create_ev_btn}>Create Event</button>
                <button style={props.Hidebtn} onClick={props.FunctCancel} className={styles.create_ev_btn}>
                    Cancel
                </button>
                <button onClick={UpdateAnEvent} className={styles.create_ev_btn}>Update Event</button>
            </div>
        </div>
    );
};

export default CreateEvent;
