const Dropdown = ({ options }) => {
    return (
        <select>
            {
                options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.value}
                    </option>
                ))
            }
        </select>
    );
};

export default Dropdown;
