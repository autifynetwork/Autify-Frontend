const Table = ({ heading = 'Table' }) => {
    const data = [
        { id: 1, name: 'Category 1', image: '', status: 'active' },
        { id: 2, name: 'Category 2', image: '', status: 'active' },
        { id: 3, name: 'Category 3', image: '', status: 'active' },
        { id: 4, name: 'Category 4', image: '', status: 'active' },
    ];

    return (
        <div className="flex flex-col rounded-[30px] bg-light-100 pt-5 pb-8">
            <span className="px-10 text-xs font-semibold">{heading}</span>

            <table id="myTable" className="w-full table mt-4">
                <thead className="bg-[#F1F3F9]">
                    <tr>
                        <th className="py-3 text-sm font-normal text-[#8898AA] text-start pl-10">SL No</th>
                        <th className="py-3 text-sm font-normal text-[#8898AA] text-start">Name</th>
                        <th className="py-3 text-sm font-normal text-[#8898AA] text-start">Product Image</th>
                        <th className="py-3 text-sm font-normal text-[#8898AA] text-start">Status</th>
                        <th className="py-3 text-sm font-normal text-[#8898AA] text-start">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data &&
                        data.map((item) => (
                            <tr key={item.id}>
                                <td className="pl-10">{item.id}</td>
                                <td>
                                    <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-sm">{item.name}</div>
                                </td>
                                <td>
                                    {item.image ? (
                                        <img src={item.image} alt="category image" />
                                    ) : (
                                        <div
                                            className={`bg-primary-300 opacity-40 w-14 h-14 flex items-center justify-center rounded-lg text-light-100 text-xl`}>
                                            <i className="fa-solid fa-image"></i>
                                        </div>
                                    )}
                                </td>
                                <td>{item.status}</td>
                                <td className="flex gap-x-4 mt-3 items-center justify-start">
                                    <button
                                        type="button"
                                        className="bg-[#E1F3FFD4] py-2 px-4 rounded-md text-primary-500 text-sm">
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-[#E1F3FFD4] py-2 px-4 rounded-md text-primary-500 text-sm">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
