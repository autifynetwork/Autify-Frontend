export default function TextInput({
    label,
    type = 'text',
    value = '',
    name,
    onFieldChange,
    placeholder = '',
    required = true,
    variant = 'blue',
    error = false,
    success = false,
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
                className={
                    variant === 'blue'
                        ? 'w-full bg-light-100 text-dark-300 outline-none focus:ring-primary-500 focus:border-primary-500 border-2 border-primary-300 text-sm rounded-md cursor-text form-input block transition duration-300 py-[0.5rem] px-[0.75rem]'
                        : 'w-full bg-light-100 border transition duration-300 focus:ring-primary-500 focus:border-primary-500 outline-0 rounded-xl px-3 py-[14px] normal-case shadow-md ' +
                          (error ? 'border-error-400' : success ? 'border-success-400' : 'border-dark-500')
                }
            />
        </div>
    );
}
