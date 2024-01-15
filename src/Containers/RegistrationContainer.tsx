import React, { useState } from "react";
import Registration from "../Pages/Registration";
import { supabase } from "../db/supabase";


interface RegistrationContainerProps {}

const RegistrationContainer: React.FC<RegistrationContainerProps> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [describe, setDescribe] = useState<string>("");

  const handleSelectSkills = (value: string[]) => {
    setSelectedSkills(value);
  };

  const handleSelectBranch = (value: string) => {
    setSelectedBranch(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDescribeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescribe(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password,
      selectedSkills,
      describe,
    });

    console.log(email, password, name);
    if (!name || !email || !password) {
      console.log("Please fill in the fields correctly");
      return;
    }

    const { data: existingUsers, error: fetchError } = await supabase
      .from("students")
      .select("email, password,name")
      .eq("email", email);

    if (fetchError) {
      console.log(fetchError);
      return;
    }

    if (existingUsers && existingUsers.length > 0) {
      console.log("Already exists");
      return;
    }

    const { data, error } = await supabase
      .from("students")
      .insert([
        {
          name: name,
          email: email,
          password: password,
          skills:selectedSkills,
          describe:describe,
  
        },
      ])
      .select();

    if (error) {
      console.log(error);
    } else if (data) {
      console.log("Data inserted successfully:", data);
      // setFormError(null);
      setEmail("");
      setPassword("");
      setName("");
      // setSemester("");
    }
  };

 
  return (
    <div>
      <Registration
        name={name}
        email={email}
        password={password}
        selectedSkills={selectedSkills}
        selectedBranch={selectedBranch}
        describe={describe}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSelectSkills={handleSelectSkills}
        handleSelectBranch={handleSelectBranch}
        handleDescribeChange={handleDescribeChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default RegistrationContainer;
