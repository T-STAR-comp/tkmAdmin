import styles from './styles/logout.module.css';

const LOG_OUT = (props)=>{
    return(
        <div className={styles.main_cont}>
            <div className={styles.container}>
                <p className={styles.query_}>Are You Sure You Want To Log Out?</p>
                <div className={styles.btns_main_div}>
                    <button onClick={props.FunctLogOut} className={styles.logOut_btns}>Yes</button>
                    <button onClick={props.FunctCancel} className={styles.logOut_btns}>No</button>
                </div>
            </div>
        </div>
    );
}

export default LOG_OUT;