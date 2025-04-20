import React, { useState, useEffect } from "react";
import TagSelector from "./TagSelector";
import DateRangePicker from "./DateRangePicker";
import Graph from "./Graph";
import { fetchPLCData } from "@/utils/fetchData";

const PLCDashboard = () => {
  const [tag, setTag] = useState("Sinusoid1");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState([]);
  const [tags] = useState(["temperature", "oil level", "pressure"]);

  const fetchData = async () => {
    if (!from || !to) return;
    const result = await fetchPLCData(tag, from, to);
    setData(result.data);
  };

  useEffect(() => {
    if (from && to) fetchData();
  }, [tag, from, to]);

  const getStatus = (tag) => {
    // Example logic (you can replace it with actual values/thresholds)
    const latest = data[data.length - 1];
    if (!latest) return "Normal";
    if (tag === "oil level" && latest.value > 30) return "Alarm";
    return "Normal";
  };

  const getColor = (status) => {
    return status === "Alarm" ? "text-red-500" : "text-green-500";
  };

  const now = new Date().toLocaleTimeString();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Visualization Dashboard</h2>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Connection</p>
          <p className="text-green-600 font-semibold">● Normal Online</p>
          <p className="text-sm text-gray-400">PLC IP: 198.162.0.1:102 (OPCUA)</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Parameters</p>
          <p className="text-blue-600 font-semibold">2 Normal</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Warnings</p>
          <p className="text-yellow-500 font-semibold">0 Parameters</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Alarms</p>
          <p className="text-red-500 font-semibold">1 Parameter</p>
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">2 unacknowledged</span>
        </div>
      </div>

      {/* Tag Pills */}
      <div>
        <p className="text-lg font-semibold">Selected Parameters</p>
        <div className="flex gap-2 mt-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1 rounded-full ${
                tag === t ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tags.map((t) => {
          const status = getStatus(t);
          return (
            <div key={t} className="bg-white rounded-xl shadow p-4">
              <p className="text-sm text-gray-500">{t}</p>
              <p className={`text-sm font-medium ${getColor(status)}`}>{status}</p>
              <p className="text-3xl font-bold mt-2">
                {data.length ? data[data.length - 1].value.toFixed(1) : "--"}
                {t === "temperature" ? "°C" : "p"}
              </p>
              <p className="text-xs text-gray-400 mt-1">{now}</p>
              <p className="text-xs text-gray-500 mt-2">
                Warning Range: {/* Add real values */}
              </p>
              <p className="text-xs text-gray-500">
                Alarm Range: {/* Add real values */}
              </p>
            </div>
          );
        })}
      </div>

      {/* Filters and Graph */}
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <TagSelector selectedTag={tag} tags={tags} onChange={setTag} />
        <DateRangePicker from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      </div>

      <Graph data={data} />
    </div>
  );
};

export default PLCDashboard;
