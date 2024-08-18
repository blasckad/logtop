import React, { useState, useContext } from "react";
import {
  singup,
  login,
  token,
  confirmSingUP,
  confirmLogin,
} from "../../api/auth";
import { AuthContext } from "../../App";
import classes from "./AuthForm.module.css";
const AuthForm = () => {
  // const isUser = useContext(UserContext)

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [code, setCode] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [SlideBool, setSlideBool] = useState("SingUp");
  const [SlideStyle, setSlideStyle] = useState("");
  const [LoginStyle, setLoginStyle] = useState("");
  const [SingUpStyle, setSingUpStyle] = useState("solid 1px black");
  const [InsertSingUpCodeStyle, setInsertSingUpCodeStyle] = useState("none");
  const [InsertLoginCodeStyle, setInsertLoginCodeStyle] = useState("none");
  const [NotUserLoginStyle, setNotUserLoginStyle] = useState("none");
  const [ErrorLoginCode, setErrorLoginCode] = useState("none");
  const [ErrorSingUpCode, setErrorSingUpCode] = useState("none");
  
  // let width = document.documentElement.clientWidth;
  let width = 800;

  const { setAuth } = useContext(AuthContext);

  const SingUP = (e) => {
    e.preventDefault();
    const token = singup(email, name, telegram, code);
    token.then((result) => {
      if (result !== "Error Code") {
        localStorage.setItem("token", result.token);
        setAuth(true);
      } else {
        setErrorSingUpCode("block")
        setInsertSingUpCodeStyle("none")
      }
    });
  };

  const ConfirmSingUP = (e) => {
    e.preventDefault();
    setInsertSingUpCodeStyle("block")
    confirmSingUP(email);
  };

  const Login = (e) => {
    e.preventDefault();
    const token = login(loginEmail, loginCode);
    console.log(token);
    token.then((result) => {
      if (result !== "Error Code") {
        localStorage.setItem("token", result.token);
        setAuth(true);
      } else {
        setErrorLoginCode("block")
        setInsertLoginCodeStyle("none")
      }
    });
  };
  const ConfirmLogin = (e) => {
    e.preventDefault();
    const result = confirmLogin(loginEmail);
    result.then((result) => {
      if (result === "Not User") {
        setNotUserLoginStyle("block")
      } else {
        setInsertLoginCodeStyle("block")
      }
    });
  };

  const SlideToLogin = (e) => {
    e.preventDefault();
    if (SlideBool === "SingUp") {
      setSlideBool("Login");
      let style = "translateX(-" + width + "px";
      setSlideStyle(style);
      setLoginStyle("solid 1px black");
      setSingUpStyle("");
    }
  };

  const SlideToSingUp = (e) => {
    e.preventDefault();
    if (SlideBool === "Login") {
      setSlideBool("SingUp");
      setSlideStyle("");
      setLoginStyle("");
      setSingUpStyle("solid 1px black");
    }
  };

  return (
    <div className={classes.wrap} id="auth">
      <div className={classes.header}>
        <div onClick={SlideToSingUp}>
          <div style={{ borderBottom: SingUpStyle }}>Регистрация</div>
        </div>
        <div onClick={SlideToLogin}>
          <div style={{ borderBottom: LoginStyle }}>Вход</div>
        </div>
      </div>
      <div className={classes.wrapwrapcontent}>
        <div className={classes.wrapcontent} style={{ transform: SlideStyle }}>
          <div className={classes.singup}>
            <form className={classes.singupdata}>
              <input
                placeholder="Еmail"
                className={classes.input}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Как к вам обращаться"
                className={classes.input}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <input
              placeholder="Telegram"
                className={classes.input}
                type="text"
                onChange={(e) => setTelegram(e.target.value)}
              />
              <button className={classes.button} onClick={ConfirmSingUP}>
                Отправить
              </button>
            </form>
            <form className={classes.singupcode}>
              <input
                placeholder="Код подтверждения"
                className={classes.input}
                type="text"
                onChange={(e) => setCode(e.target.value)}
              />
              <div style={{display: InsertSingUpCodeStyle}} className={classes.insertcode}>Введите код</div>
              <div style={{display: ErrorSingUpCode}} className={classes.errorcode}>Неверный код</div>
              <button className={classes.button} onClick={SingUP}>
                Подтвердить
              </button>
            </form>
          </div>
          <div className={classes.login}>
            <form className={classes.logindata}>
              <input
                placeholder="Еmail"
                className={classes.input}
                type="text"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <div style={{display: NotUserLoginStyle}} className={classes.notuser}>Неправильный email</div>
              <button className={classes.button} onClick={ConfirmLogin}>
                Отправить
              </button>
            </form>
            <form className={classes.logincode}>
              <input
                placeholder="Код подтверждения"
                className={classes.input}
                type="text"
                onChange={(e) => setLoginCode(e.target.value)}
              />
              <div style={{display: ErrorLoginCode}} className={classes.errorcode}>Неверный код</div>
              <div style={{display: InsertLoginCodeStyle}} className={classes.insertcode}>Введите код</div>
              <button className={classes.button} onClick={Login}>
                Подтвердить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
