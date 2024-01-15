import React, { useState } from "react";
import Login from "../Pages/Login";
import { supabase } from "../db/supabase";

import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setFormError] = useState<string | null>(null);

  const navigation = useNavigate();

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFormError(null);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setFormError(null);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("Please fill in the fields correctly");
      return;
    }

    try {
      // Check if the email exists in the database
      const { data: emailData, error: emailError } = await supabase
        .from("students")
        .select()
        .eq("email", email);

      if (emailError) {
        console.error("Error:", emailError);

        setFormError(
          "An error occurred while checking email. Please try again later."
        );
        return;
      }

      if (!emailData || emailData.length === 0) {
        setFormError("Email not found");
        alert("User is not registered");
        return;
      }

      // Email exists, now check the password
      const { data: passwordData, error: passwordError } = await supabase
        .from("students")
        .select()
        .eq("email", email)
        .eq("password", password);

      if (passwordError) {
        console.error("Error:", passwordError);
        setFormError(
          "An error occurred while checking password. Please try again later."
        );
        return;
      }

      if (passwordData && passwordData.length === 1) {
        navigation("/home/:id", {
          state: {
            email,
          },
        });
      } else {
        setFormError("Password does not match");
        console.log("Password does not match");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormError("An unexpected error occurred. Please try again later.");
    }
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
