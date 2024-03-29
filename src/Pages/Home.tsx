import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../db/supabase";

import RequiredSkillsContainer from "../Containers/RequiredSkillsContainer";

const Home = () => {
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
    <div className="home-main">
      <div className="top"> Hii {userdata && <div>{userdata.name}</div>}</div>
      <div className="find">
        <RequiredSkillsContainer/>
      </div>
    </div>
  );
};

export default Home;
