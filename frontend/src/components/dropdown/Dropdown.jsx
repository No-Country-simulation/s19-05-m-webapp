const Dropdown = ({ options, value, onChange, name, disabled }) => {
  return (
    <select name={name} value={value} onChange={onChange} disabled={disabled}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
