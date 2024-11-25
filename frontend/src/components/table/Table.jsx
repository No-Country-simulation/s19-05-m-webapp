import "./table.css";

const Table = ({ columns, data }) => {
    console.log(data)

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
                    {
                        data?.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;
