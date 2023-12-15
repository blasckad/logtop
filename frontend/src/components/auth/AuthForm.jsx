import React, {useState} from 'react';
import { singup, login, token, confirm } from '../../api/auth';

const AuthForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [telegram, setTelegram] = useState('');
    const [code, setCode] = useState('');

    const SingUp = (e) => {
        e.preventDefault()
        confirm(email);
        // const token = singup(email, password, name, telegram);
        // token.then((resutl) => {
        //   localStorage.setItem("token", resutl.token)
        // });
    }

    const Login = (e) => {
      e.preventDefault() 
      const token = login(email, password);

      token.then((result) => {
        if (result !== "Not User") {
          localStorage.setItem("token", result.token)
        }
      });
    }

    const Confirm = (e) => {
      e.preventDefault()
      const token = singup(email, password, name, telegram, code);
      token.then((result) => {
        if (result !== "Error Code") {
          localStorage.setItem("token", result.token)
        }
      });
    }

  return (
    <div>
        <form>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
            <input type="text" onChange={e => setPassword(e.target.value)}/>
            <input type="text" onChange={e => setName(e.target.value)}/>
            <input type="text" onChange={e => setTelegram(e.target.value)}/>
            <button onClick={SingUp}>Отправить</button>
      </form>
      <form>
      <input type="text" onChange={e => setCode(e.target.value)}/>
        <button onClick={Confirm}>Подтвердить</button>
    </form>
      <form>
        <input type="text" onChange={e => setEmail(e.target.value)}/>
        <input type="text" onChange={e => setPassword(e.target.value)}/>
        <button onClick={Login}>Отправить</button>
    </form>
    
  </div>
  );
};
export default AuthForm;