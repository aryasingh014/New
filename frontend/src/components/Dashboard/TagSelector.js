import React from "react";

const TagSelector = ({ selectedTag, tags, onChange }) => {
  return (
    <div>
      <label className="font-semibold">Select Tag: </label>
      <select value={selectedTag} onChange={(e) => onChange(e.target.value)} className="ml-2 px-2 py-1 border rounded">
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagSelector;