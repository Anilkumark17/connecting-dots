import React from "react";
import { Select, AutoComplete ,Input} from "antd";
import { Skills } from "../db/Skills";
import { Branch } from "../db/Branch";
import "../Styles/registration.css";

interface RegistrationProps {
  name: string;
  email: string;
  password: string;
  selectedSkills: string[];
  selectedBranch: string;
  describe: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectSkills: (value: string[]) => void;
  handleSelectBranch: (value: string) => void;
  handleDescribeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}


const Registration: React.FC<RegistrationProps> = ({
  name,
  email,
  password,
  selectedSkills,
  selectedBranch,
  describe,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleSelectSkills,
  handleSelectBranch,
  handleDescribeChange,
  handleSubmit,
}) => {
  return (
    <div className="Registration-main">
      <div className="register">
        <form action="" className="registration" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name of the User"
            className="feild"
            value={name}
            onChange={handleNameChange}
          />
          <Input
            type="email"
            placeholder="Student email"
            className="feild"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="password"
            placeholder="Password"
            className="feild"
            value={password}
            onChange={handlePasswordChange}
          />
          <Select
            mode="multiple"
            style={{ width: "230px" }}
            placeholder="Select skills"
            onChange={handleSelectSkills}
            value={selectedSkills}
          >
            {Skills.map((skill) => (
              <Select.Option key={skill.value} value={skill.value}>
                {skill.label}
              </Select.Option>
            ))}
          </Select>
          <AutoComplete
            options={Branch}
            placeholder="Select the branch"
            style={{ width: "230px" }}
            value={selectedBranch}
            onSelect={handleSelectBranch}
          />
          <Input
            type="text"
            placeholder="Describe yourself"
            className="feild-d"
            value={describe}
            onChange={handleDescribeChange}
          />
          <Input type="submit" value="Submit" className="feild-s" style={{backgroundColor:'rgb(250, 208, 129)'}} />
        </form>
      </div>
    </div>
  );
};

export default Registration;
