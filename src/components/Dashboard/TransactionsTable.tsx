const TransactionsTable = ({ header, heading, tableData }: any) => {
    const tableRowClasses = `py-3`;

    return (
        <div className="flex flex-col rounded-[30px] bg-light-100 pt-5 pb-8">
            <div className="flex justify-between items-center px-10">
                {heading && <span className="text-xs font-semibold">{heading}</span>} {header}
            </div>

            <table id="myTable" className="w-full table mt-4">
                <thead className="bg-[#F1F3F9]">
                    <tr>
                        {tableData.head &&
                            tableData.head.map((item: any, index: number) => (
                                <th
                                    key={index}
                                    className={
                                        'py-3 text-sm font-normal text-[#8898AA] text-start ' +
                                        (index == 0 ? 'pl-10' : '')
                                    }>
                                    {item}
                                </th>
                            ))}
                    </tr>
                </thead>

                <tbody>
                    {tableData.body &&
                        tableData.body.map((item: any, index: number) => (
                            <tr
                                key={item.id}
                                className={
                                    index % 2 == 0 ? 'bg-white h-[60px] text-sm' : 'bg-[#F7FAFC] h-[60px] text-sm'
                                }>
                                {Object.keys(item).map((key, idx) => (
                                    <td key={key} className={tableRowClasses + (idx == 0 ? ' pl-10' : '')}>
                                        {key == 'date' ? (
                                            <span className="h-[120px]">{item.date}</span>
                                        ) : key == 'name' ? (
                                            item.name && (
                                                <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-[13px] font-semibold">
                                                    {item.name}
                                                </div>
                                            )
                                        ) : key == 'type' ? (
                                            item.type
                                        ) : key == 'quantity' ? (
                                            item.quantity
                                        ) : key == 'transactionType' ? (
                                            item.transactionType
                                        ) : key == 'price' ? (
                                            item.price
                                        ) : key == 'amount' ? (
                                            item.amount
                                        ) : null}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;
