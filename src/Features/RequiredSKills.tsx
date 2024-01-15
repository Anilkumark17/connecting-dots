import React from "react";
import { Select } from "antd";
import { Skills } from "../db/Skills";

interface RequiredSKillsProps {
  skills: string[];
  requireHandler: (selectedSkills: string[]) => void;
  submit: React.FormEventHandler<HTMLFormElement>;

}

const RequiredSKills: React.FC<RequiredSKillsProps> = ({ skills, requireHandler, submit }) => {
  return (
    <div className="feature-main">
      <div className="select-feield">
        <Select
          mode="multiple"
          style={{ width: "230px" }}
          placeholder="Select skills"
          value={skills}
          onChange={requireHandler}
        >
          {Skills.map((skill) => (
            <Select.Option key={skill.value} value={skill.value}>
              {skill.label}
            </Select.Option>
          ))}
        </Select>
        <button className="find-students" onClick={(e:any) => submit(e)}>Find</button>
      </div>
      <div className="displayStudents"></div>
    </div>
  );
};

export default RequiredSKills;
