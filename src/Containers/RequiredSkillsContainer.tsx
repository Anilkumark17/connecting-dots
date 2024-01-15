import React, { useState } from "react";
import { supabase } from "../db/supabase";
import RequiredSKills from "../Features/RequiredSKills";

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

  const sendNotification = (email: string, username: string) => {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification("New Connection Request", {
          body: `${username} is interested in connecting with you to build a project. Contact details will be provided.`,
        });

        // You can handle additional logic when the notification is clicked, etc.
        notification.onclick = () => {
          console.log("Notification clicked");
        };
      }
    });
  };

  const sendNotificationsToSelectedStudents = () => {
    selectMail.forEach((email) => {
      const username = "YourUsername"; // Replace with your username or any dynamic value
      sendNotification(email, username);
    });
  };

  return (
    <div>
      <RequiredSKills
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
      </div>

      <button onClick={sendNotificationsToSelectedStudents}>
        Send Notifications
      </button>
    </div>
  );
};

export default RequiredSkillsContainer;
