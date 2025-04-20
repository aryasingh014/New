import React from "react";

const TagSelector = ({ selectedTag, tags, onChange }) => {
  return (
    <select value={selectedTag} onChange={e => onChange(e.target.value)}>
      {tags.map(tag => (
        <option key={tag} value={tag}>{tag}</option>
      ))}
    </select>
  );
};

export default TagSelector;

