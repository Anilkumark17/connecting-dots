import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../db/supabase";

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const { email } = location.state as any;
  const [userdata, setUserData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("email", email)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        setUserData(data);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="profile-main">
      <h2>Profile Page</h2>
      <p>Email: {email}</p>
      {userdata && (
        <div>
          <p>Name: {userdata.name}</p>
          <p>Email: {userdata.email}</p>
          <p>Skills: {userdata.skills}</p>
          <p>Description: {userdata.describe}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
