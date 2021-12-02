import { useState } from 'react';
import styles from '../styles/createAccount.module.css'
import axios from 'axios';

const createAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const newAccount = {
      email,
      password
    }
    setEmail('');
    setPassword('');
  }
  return (
    <div className={styles.container}>

      <div className={styles.imgdiv}>
        <img src='https://i.postimg.cc/QxWPMByG/signup-image.jpg' />
      </div>

      <div className={styles.formdiv}>
        <h1>&lt;/Salt&gt;</h1>
        <form onSubmit={handleSubmit}>
          <label><strong>Email</strong></label><br />
          <input value={email} onChange={({ target: { value } }) => setEmail(value)} className={styles.input} />
          <hr />
          <label><strong>Password</strong></label><br />
          <input type='password' value={password} onChange={({ target: { value } }) => setPassword(value)} className={styles.input} />
          <hr />
          <button className={styles.button} type='submit'>Create Account</button>
        </form>
      </div>

    </div>
  )
};

export default createAccount;
