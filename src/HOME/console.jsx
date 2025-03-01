import styles from './styles/console.module.css';
import { useState, useEffect } from 'react';

const Console = (props) => {

    const[Details, SetDetails] = useState([]);
    const[Email, SetEmail] = useState('');
    const[Customers, SetCustomers] = useState([]);
    const[SingleSearch, SetSingleSearch] = useState(false);

    const handleChange = (e) => {
        const {value} = e.target;
        SetEmail(value);
    };

    const fetchdata = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_GetConsoleData);
            
            const data = await response.json();

            if (data) {
                 SetDetails(data);
                 SetSingleSearch(false);
                 SetEmail('');
            }

        }
        catch (err) {
            window.alert(err);
        };
    };

    const fetchCustomer = async ()=> {
        if (Email != '') {
            try {
                const response = await fetch(import.meta.env.VITE_getConsoleDataSingle,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Email})
                });
    
                const data = await response.json();
                
                if (data) {
                    SetCustomers(data);
                    SetSingleSearch(true);
                    SetEmail('');
                };
    
            }
            catch(err) {
                if (err) {
                    window.alert(`There was an Error: ${err}`);
                };
            };
        } 
    };

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div className={styles.main_cont}>
            
            <p onClick={props.close} className={styles.close_txt}>Close</p>
            <p onClick={fetchdata} className={styles.refresh_txt}>Refresh</p>
            <input value={Email} onChange={handleChange} className={styles.customer_serach_input} type="text" placeholder='Search Customer' />
            <button onClick={fetchCustomer} className={styles.customer_serach_btn}>Search</button>
            <div className={styles.titles_cont}>
                <p className={styles.tittles}>DATE</p>
                <p className={styles.tittles}>EMAIL</p>
                <p className={styles.tittles}>NAME</p>
                <p className={styles.tittles}>NUM OF TICKETS</p>
                <p className={styles.tittles}>MAIN UID</p>
                <p className={styles.tittles}>TOTAL</p>
            </div>

            {SingleSearch === false ? <div className={styles.details_cont}>
                {Details.map((Detail)=>(
                    <div className={styles.detail_cont}>
                    <p className={styles.detail_txt}>{Detail.date}</p>
                    <p className={styles.detail_txt}>{Detail.email}</p>
                    <p className={styles.detail_txt}>{Detail.first_name} {Detail.surname}</p>
                    <p className={styles.detail_txt}>{Detail.num_tickets}</p>
                    <p className={styles.detail_txt}>{Detail.ticket_UID}</p>
                    <p className={styles.detail_txt}>{Detail.total}</p>
                    </div>
                ))}
            </div>
            :
            <div className={styles.details_cont}>
                {Customers.map((Customer)=>(
                    <div className={styles.detail_cont}>
                    <p className={styles.detail_txt}>{Customer.date}</p>
                    <p className={styles.detail_txt}>{Customer.email}</p>
                    <p className={styles.detail_txt}>{Customer.first_name} {Customer.surname}</p>
                    <p className={styles.detail_txt}>{Customer.num_tickets}</p>
                    <p className={styles.detail_txt}>{Customer.ticket_UID}</p>
                    <p className={styles.detail_txt}>{Customer.total}</p>
                    </div>
                ))}
            </div>    
                }
            
        </div>
    );
};

export default Console;