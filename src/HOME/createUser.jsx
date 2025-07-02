import { useState } from 'react';
import styles from './styles/createUser.module.css';

const CreateUser = (props) => {
  const [user, setUser] = useState({
    Name: '',
    email: '',
    password: '',
    type: '',
    path: '',
    admin_password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.Name || !user.email || !user.password || !user.type || !user.path) {
      setMessage('Please fill out all fields.');
      return;
    }

    if (!sessionStorage.getItem('masterLOGGED')) {
      window.alert('Cannot Execute This Function In Base');
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_CREATE_TRANSP_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user.Name,
          Email: user.email,
          Password: user.password,
          Type: user.type,
          Path: user.path,
          admin_password: user.admin_password
        }),
      });

      const data = await response.json();
      console.log(data)

      data.error ? setMessage(data.error) : setMessage(data.message);
      setUser({ Name: '', email: '', password: '', type: '', path: '', admin_password: '' });
    } catch (err) {
      setMessage('An error occurred unexpectedly.');
    }
  };

  const handleCancel = () => {
    setUser({ Name: '', email: '', password: '', type: '', path: '', admin_password: ''  });
    setMessage('');
    props.FunctCancel?.();
  };

  return (
    <div className={styles.main_cont}>
      <h1>Create User</h1>

      <div className={styles.form}>
        <input
          type="text"
          name="Name"
          placeholder="Enter User Name"
          value={user.Name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter User Email"
          value={user.email}
          onChange={handleChange}
        />
        <select
          name="type"
          value={user.type}
          onChange={handleChange}
          className={styles.select_optn}
        >
          <option value="" disabled>Select Type</option>
          <option value="event">Event</option>
          <option value="transport">Transport</option>
        </select>
        <input
          type="text"
          name="path"
          placeholder="Enter URL Path (e.g. /transport/buscompany)"
          value={user.path}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter User Password"
          value={user.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="admin_password"
          placeholder="Enter Admin Password"
          value={user.admin_password}
          onChange={handleChange}
        />
        <div className={styles.btn_group}>
          <button type="submit" onClick={handleSubmit}>
            Create User
          </button>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default CreateUser;
