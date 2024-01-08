import React, { useState } from "react";
import Login from "../Pages/Login";
import { auth } from "../db/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginContainer = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginDetails = { email, password };

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        alert("You are logged in successfully");
        // navigate("/category");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          alert("Sorry, we couldn't find an account with that email address.");
        } else {
          alert("Sorry, there was an error logging you in. Please try again later.");
        }
      });

    console.log(loginDetails);
  };

  return (
    <div>
      <Login
        email={email}
        password={password}
        emailHandler={emailHandler}
        passwordHandler={passwordHandler}
        submitHandler={submitHandler}
        error={error}
      />
    </div>
  );
};

export default LoginContainer;
