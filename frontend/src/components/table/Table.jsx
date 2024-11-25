import "./table.css";

const Table = ({ columns, data }) => {

    return (
        <div className="custom-table-wrapper ">
            <table className="custom-table">
                <thead>
                    <tr>
                        {
                            columns.map((col) => (
                                <th key={col.field}>{col.header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Producto 1</td>
                        <td>Producto 1</td>
                        <td>Producto 1</td>
                    </tr>
                    <tr>
                        <td>Producto 1</td>
                        <td>Producto 1</td>
                        <td>Producto 1</td>
                    </tr>
                    <tr>
                        <td>Producto 1</td>
                        <td>Producto 1</td>
                        <td>Producto 1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
