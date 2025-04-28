import styles from './styles/console.module.css';
import { useState, useEffect } from 'react';

const Console = (props) => {
    const [Details, SetDetails] = useState([]);
    const [Email, SetEmail] = useState('');
    const [Customers, SetCustomers] = useState([]);
    const [SingleSearch, SetSingleSearch] = useState(false);

    const handleChange = (e) => {
        const { value } = e.target;
        SetEmail(value);
    };

    const fetchdata = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_GetConsoleData);
            const data = await response.json();
            if (data && data.state !== 'none') {
                SetDetails(data);
                SetSingleSearch(false);
                SetEmail('');
            }
        } catch (err) {
            window.alert(err);
        }
    };

    const fetchCustomer = async () => {
        if (Email !== '') {
            try {
                const response = await fetch(import.meta.env.VITE_getConsoleDataSingle, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Email })
                });
                const data = await response.json();
                if (data) {
                    SetCustomers(data);
                    SetSingleSearch(true);
                    SetEmail('');
                }
            } catch (err) {
                window.alert(`There was an Error: ${err}`);
            }
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const displayedData = SingleSearch ? Customers : Details;

    return (
        <div className={styles.main_cont}>
            <p onClick={props.close} className={styles.close_txt}>Close</p>
            <p onClick={fetchdata} className={styles.refresh_txt}>Refresh</p>
            <input
                value={Email}
                onChange={handleChange}
                className={styles.customer_search_input}
                type="text"
                placeholder="Search Customer"
            />
            <button onClick={fetchCustomer} className={styles.customer_search_btn}>Search</button>

            <div className={styles.table_container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>EMAIL</th>
                            <th>NAME</th>
                            <th>NUM OF TICKETS</th>
                            <th>MAIN UID</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData && displayedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name} {item.surname}</td>
                                <td>{item.num_tickets}</td>
                                <td>{item.ticket_UID}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Console;
