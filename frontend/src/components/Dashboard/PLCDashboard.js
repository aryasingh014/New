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
  const [tags] = useState(["Sinusoid1", "Random1", "Triangle1"]);

  const fetchData = async () => {
    if (!from || !to) return;
    const result = await fetchPLCData(tag, from, to);
    setData(result.data);
  };

  useEffect(() => {
    if (from && to) fetchData();
  }, [tag, from, to]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">PLC Data Dashboard</h2>
      <TagSelector selectedTag={tag} tags={tags} onChange={setTag} />
      <DateRangePicker from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      <Graph data={data} />
    </div>
  );
};

export default PLCDashboard;
