import React, { useState } from "react";
import { supabase } from "../db/supabase";
import RequiredSkills from "../Features/RequiredSKills";
import emailjs from "emailjs-com";

interface RequiredSkillsContainerProps {}

const RequiredSkillsContainer: React.FC<RequiredSkillsContainerProps> = () => {
  const [skillsRequire, setSkillsRequired] = useState<string[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectMail, setSelectedMail] = useState<any[]>([]);

  const requireHandler = (selectedSkills: string[]) => {
    setSkillsRequired(selectedSkills);
  };

  const selectMailHandler = (selectedMail: string) => {
    setSelectedMail((prevSelectedMail) => {
      if (prevSelectedMail.includes(selectedMail)) {
        return prevSelectedMail.filter((mail) => mail !== selectedMail);
      } else {
        return [...prevSelectedMail, selectedMail];
      }
    });
  };

  const requireSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      if (skillsRequire.length === 0) {
        console.error("No skills selected.");
        return;
      }
      const { data, error } = await supabase
        .from("students")
        .select("id, name, skills, email")
        .contains("skills", skillsRequire);

      if (error) {
        throw error;
      }

      console.log("Fetched Data:", data);
      setStudents(data || []);
    } catch (error: any) {
      console.error("Error fetching students:", error.message);
    }
  };

  const sendEmailsToSelected = async () => {
    try {
      if (selectMail.length === 0) {
        console.error("No emails selected for sending.");
        return;
      }

      // Email.js integration
      const templateParams = {
        to_email: selectMail.join(","),
        // Add any other template parameters here
      };

      await emailjs.send(
        "service_3t7wnbs",
        "template_28hdrrb",
        templateParams,
        "qzcSDOs7ULSmx0dj5UdHb"
      );

      console.log("Emails sent successfully!");

    } catch (error:any) {
      console.error("Error sending emails:", error.message);
    }
  };

  return (
    <div>
      <RequiredSkills
        skills={skillsRequire}
        requireHandler={requireHandler}
        submit={requireSubmitHandler}
      />

      <div>
        <h2>Students with Required Skills:</h2>
        {students.map((student) => (
          <li key={student.id}>
            <strong>Name:</strong> {student.name}, <strong>Skills:</strong>{" "}
            {JSON.stringify(student.skills)}
            <strong>Email:</strong> {student.email}
            <input
              type="checkbox"
              checked={selectMail.includes(student.email)}
              onChange={() => selectMailHandler(student.email)}
            />
          </li>
        ))}
        <button onClick={sendEmailsToSelected}>Send Emails to Selected</button>
      </div>
    </div>
  );
};

export default RequiredSkillsContainer;
