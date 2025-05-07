import { useState } from 'react';
import styles from './style.module.css';
import { Link, Outlet } from 'react-router-dom';

function Login() {
    // State to store the input values
    const [ptnCode, setPtnCode] = useState('');
    const [password, setPassword] = useState('');
    const[selectedOption, setSelectedOption] = useState('');
    const[Logged, SetLogged] = useState(false);

    // Function to handle changes in the PTN Code input
    const handlePtnCodeChange = (event) => {
        setPtnCode(event.target.value);
    };

    // Function to handle changes in the Password input
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    //function to send data to server for validation
    const sendData = async () =>{

        const input_data = {
            ptncode: ptnCode,
            password:password,
        }

        try{
            const response = await fetch(import.meta.env.VITE_AdminlogVerifyURL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input_data),
            });
    
            if(!response.ok){
                throw new Error('eror caught')
            }
            const data = await response.json();

            
            if(data.response === 'success'){
                SetLogged(true);
                
                if(selectedOption != "SCANTICKET006") {
                    sessionStorage.setItem('Logged',import.meta.env.VITE_LoggedStatus);
                    window.location.reload();
                }
                else if(selectedOption === 'SCANTICKETS006'){
                    sessionStorage.setItem('CamActive',import.meta.env.VITE_CamActive);
                    window.location.reload();
                }

            }
            else if(data.response === 'failed'){
                window.alert('Invalid Details try again....');
            }

        }
        catch(err){
            window.alert("Internal Error Occured please contact Devs");
            console.log(err)
        }
    }

    if(Logged === true){
        return(
            <div>
                <p>Login Successful.......</p>
            </div>
        );
    }

    return (
        <div className={styles.main_cont}>
            <p className={styles.main_txt}>ADMIN LOGIN</p>
            <input
                className={styles.input_field}
                type="text"
                placeholder="Enter PTN Code"
                minLength="0"
                maxLength="5"
                required
                value={ptnCode}
                onChange={handlePtnCodeChange}
            />
            <input
                className={styles.input_field}
                type="password"
                placeholder="Enter Password"
                required
                minLength="0"
                value={password}
                onChange={handlePasswordChange}
            />
            
            <button className={styles.login_btn} onClick={sendData} >Login</button>
            
            <Outlet/>
        </div>
    );   
}

export default Login;
