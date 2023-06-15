export default function TableSearch({ type = 'text', value = '', name, onFieldChange, placeholder = '' }: any) {
    return (
        <div className="relative flex justify-start items-center group">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onFieldChange}
                placeholder={placeholder}
                className="w-[240px] bg-light-100 text-dark-300 outline-none border border-primary-500 text-xs rounded-full cursor-text form-input block transition duration-300 shadow-sm py-[0.4rem] px-[0.8rem]"
            />
            <span className="absolute right-1 flex items-center justify-center p-2 duration-300 rounded-full cursor-pointer text-light-200 w-6 h-6 bg-primary-500 group-hover:bg-primary-600">
                <i className="fas fa-search text-xs"></i>
            </span>
        </div>
    );
}
