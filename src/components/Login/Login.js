import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const reducerEmail = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.vale, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const reducerPassword = (state, action) => {
  if (action.type === "PWD_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PWD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);

  const [stateEmail, dispatchEmail] = useReducer(reducerEmail, {
    value: "",
    isValid: null,
  });

  const [statePassword, dispatchPassword] = useReducer(reducerPassword, {
    value: "",
    isValid: null,
  });

  // to avoid validate after validate inputs
  const { isValid: emailIsValid } = stateEmail;
  const { isValid: passwordIsValid } = statePassword;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Check form validity!");
      setFormIsValid(stateEmail.isValid && statePassword.isValid);
    }, 500);
    // this allow user to take time for typing. after that we can handle requests
    return () => {
      clearTimeout(identifier);
      console.log("Cleanup!");
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    //setFormIsValid(stateEmail.value.includes("@") && statePassword.isValid);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({ type: "PWD_INPUT", val: event.target.value });
    //setFormIsValid(event.target.value.trim().length > 6 && stateEmail.isValid);
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(stateEmail.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(statePassword.value.trim().length > 6);
    dispatchPassword({ type: "PWD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(stateEmail.value, statePassword.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          label="E-Mail"
          type="email"
          id="email"
          isValid={stateEmail.isValid}
          value={stateEmail.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          label="Password"
          type="password"
          id="password"
          isValid={statePassword.isValid}
          value={statePassword.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
