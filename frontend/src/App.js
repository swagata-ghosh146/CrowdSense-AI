import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    location: 0,
    day: 6,
    hour: 18,
    temperature: 32,
    holiday: 1,
    event: 1
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });
  };

  const predict = async () => {
    const res = await axios.get("http://127.0.0.1:8000/predict", {
      params: form
    });
    setResult(res.data);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      
      <div style={{
        background: "#1e293b",
        padding: "30px",
        borderRadius: "15px",
        width: "350px",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
      }}>
        
        <h1 style={{ marginBottom: "20px" }}>
          CrowdSense AI 🚀
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input name="location" placeholder="Location" onChange={handleChange} />
          <input name="day" placeholder="Day (1-7)" onChange={handleChange} />
          <input name="hour" placeholder="Hour" onChange={handleChange} />
          <input name="temperature" placeholder="Temperature" onChange={handleChange} />
          <input name="holiday" placeholder="Holiday (0/1)" onChange={handleChange} />
          <input name="event" placeholder="Event (0/1)" onChange={handleChange} />
        </div>

        <button
          onClick={predict}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Predict Crowd
        </button>

        {result && (
          <div style={{ marginTop: "20px" }}>
            <h2>{result.crowd_level}</h2>
            <p>Predicted Crowd: {result.predicted_crowd}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;