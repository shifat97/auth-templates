import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/protected")
      .then((res) => setData(res.data.message))
      .catch(() => navigate("/login"));
  }, [navigate]);

  return <h2>{data}</h2>;
}
