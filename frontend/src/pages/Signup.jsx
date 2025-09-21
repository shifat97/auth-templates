import { useState } from "react";
import API from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form.username, form.email, form.password);
    try {
      const res = await API.post("/auth/signup", form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Signup</button>
      <p>{msg}</p>
    </form>
  );
}
