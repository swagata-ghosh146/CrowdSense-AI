import { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [form, setForm] = useState({
    location: 0,
    day: 6,
    hour: 18,
    temperature: 32,
    holiday: 1,
    event: 1,
  });

  const [result, setResult] = useState(null);

  const chartData = [
    { day: "Mon", crowd: 180 },
    { day: "Tue", crowd: 220 },
    { day: "Wed", crowd: 260 },
    { day: "Thu", crowd: 310 },
    { day: "Fri", crowd: 420 },
    { day: "Sat", crowd: 520 },
    { day: "Sun", crowd: 480 },
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const predict = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/predict", {
        params: form,
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Backend is not running!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
          width: "700px",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          CrowdSense AI 🚀
        </h1>

        <div
          style={{
            display: "grid",
            gap: "12px",
          }}
        >
          <label>Location</label>
          <select name="location" onChange={handleChange}>
            <option value="0">Eco Park</option>
            <option value="1">South City Mall</option>
            <option value="2">Victoria Memorial</option>
            <option value="3">Howrah Station</option>
            <option value="4">Science City</option>
          </select>

          <label>Day</label>
          <select name="day" onChange={handleChange}>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
            <option value="7">Sunday</option>
          </select>

          <label>Hour</label>
          <input
            type="number"
            name="hour"
            placeholder="Enter hour (0-23)"
            onChange={handleChange}
          />

          <label>Temperature</label>
          <input
            type="number"
            name="temperature"
            placeholder="Temperature"
            onChange={handleChange}
          />

          <label>Holiday</label>
          <select name="holiday" onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

          <label>Event</label>
          <select name="event" onChange={handleChange}>
            <option value="0">No Event</option>
            <option value="1">Event</option>
          </select>

          <button
            onClick={predict}
            style={{
              marginTop: "10px",
              padding: "12px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Predict Crowd
          </button>
        </div>

        {result && (
          <div
            style={{
              marginTop: "20px",
              background: "#334155",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>{result.crowd_level}</h2>

            <p>
              <strong>Predicted Crowd:</strong>{" "}
              {result.predicted_crowd}
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: "20px",
            background: "#334155",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>Weekly Crowd Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="crowd"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
