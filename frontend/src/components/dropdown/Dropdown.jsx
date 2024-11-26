const Dropdown = ({ options, value, onChange, name }) => {
  return (
    <select name={name} value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
