import React, { useState } from "react";
import Registration from "../Pages/Registration";
import { db } from "../db/firebase";
import { addDoc, collection } from "firebase/firestore";


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

    const userCollection = collection(db, "users");

    const userDoc = {
      name,
      email,
      password,
      skills: selectedSkills,
      describe,
    };

    try {
      const docRef = await addDoc(userCollection, userDoc);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
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
