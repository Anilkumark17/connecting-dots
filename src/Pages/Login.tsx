import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import "../Styles/login.css";

interface LoginProps {
  email: string;
  password: string;
  emailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  error:any
}

const Login: React.FC<LoginProps> = ({
  email,
  password,
  emailHandler,
  passwordHandler,
  submitHandler,
}) => {
  return (
    <div className="login-page">
      <div className="login-box">
        <form action="" className="login-form" onSubmit={submitHandler}>
          <Input
            type="email"
            value={email}
            onChange={emailHandler}
            placeholder="Enter your email"
            className="feild"
          />
          <Space direction="vertical">
            <Input.Password
              value={password}
              onChange={passwordHandler}
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Space>
          <Input
            type="submit"
            value="submit"
            className="feild"
            style={{
              backgroundColor: "rgb(250, 208, 129)",
              color: "#F7F7F7",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
