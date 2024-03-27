import React, { useState } from "react";
import { useAuth } from "../components/account/AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setUsername(e.target.value);
    setErrEmail("");
  };
  const { signin } = useAuth();

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username) {
      setErrEmail("Username không được bỏ trống");
    }
    if (!password) {
      setErrPassword("Mật khẩu không được bỏ trống");
    }

    await signin(username, password);
    setLoading(false);
  };
  return (
    <div className="container mt-5">
      <form>
        <div className="row mb-3">
          <label for="inputEmail3" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              onChange={handleEmail}
              value={username}
              className="form-control"
              id="inputEmail3"
            />
            {errEmail && (
              <p className="text-danger font-monospace">{errEmail}</p>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              onChange={handlePassword}
              value={password}
              type="password"
              className="form-control"
              id="inputPassword3"
            />
            {errPassword && (
              <p className="text-danger font-monospace">{errPassword}</p>
            )}
          </div>
        </div>

        <button onClick={handleSignUp} className="btn btn-primary">
          Đăng nhập{" "}
        </button>
      </form>
    </div>
  );
};

export default Login;
