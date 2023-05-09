export default function TextInput({
    label,
    type = 'text',
    value = '',
    name,
    onFieldChange,
    placeholder = '',
    required = true,
}: any) {
    return (
        <div className="w-full flex flex-col justify-end">
            <p className="text-dark-700 font-medium mb-2 text-start">{label}</p>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onFieldChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-light-100 text-dark-300 outline-none focus:ring-primary-500 focus:border-primary-500 border-2 border-primary-300 text-sm rounded-md cursor-text form-input block transition duration-300 py-[0.5rem] px-[0.75rem]"
            />
        </div>
    );
}
