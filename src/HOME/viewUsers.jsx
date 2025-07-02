import { useState, useEffect } from 'react';
import styles from './styles/createUser.module.css';

const ViewUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toggling, setToggling] = useState(null); // id of user being toggled

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(import.meta.env.VITE_GET_ALLUSERS);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      // Expecting { users: [...] }
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      setError('Could not fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (user) => {
    setToggling(user.id);
    try {
      const response = await fetch(import.meta.env.VITE_TOGGLE_STATUS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email || user.Email })
      });
      const data = await response.json();
      // Update the user's status in the UI
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, status: data.status } : u
        )
      );
    } catch (err) {
      window.alert('Failed to toggle user status.');
    } finally {
      setToggling(null);
    }
  };

  return (
    <div className={styles.main_cont}>
      <h1>All Users</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className={styles.message}>{error}</p>}
      {!loading && !error && (
        <div className={styles.form} style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Type</th>
                <th>Path</th>
                <th>Status</th>
                <th>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{user.username}</td>
                    <td>{user.type}</td>
                    <td>{user.path}</td>
                    <td>{user.status}</td>
                    <td>
                      <button
                        disabled={toggling === user.id}
                        onClick={() => handleToggle(user)}
                        style={{
                          background: user.status === 'active' ? '#43a047' : '#bdbdbd',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.4em 1em',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        {toggling === user.id ? 'Toggling...' : user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5}>No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className={styles.btn_group}>
        <button type="button" className={styles.cancelBtn} onClick={props.FunctCancel}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewUsers; 