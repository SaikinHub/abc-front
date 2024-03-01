import TableRowBrowseCard from '../cards/TableRowBrowseCard';

const Table = ({ type, headings, list }) => {
    return (
        <table className="browse-detail__wrapper">
            <thead>
                <tr>
                    {headings &&
                        headings.map((item, i) => (
                            <th key={i} scope="col">
                                {item}
                            </th>
                        ))}
                </tr>
            </thead>
            <tbody>
                {list ? (
                    list.map((item, i) => (
                        <TableRowBrowseCard key={i} type={type} media={item} />
                    ))
                ) : (
                    <tr>
                        <td>No Courses yet !</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
