import { useState, useEffect } from 'react';

export default function Dropdown({
    label = '',
    id,
    name = '',
    options = [],
    objKey,
    setChoice,
    classes,
    defaultOption,
    variant = 'primary',
}: any) {
    const [dropdownOptions, setDropdownOptions] = useState(options);

    useEffect(() => {
        if (options && options.length > 0) setDropdownOptions(options);
    }, [options]);

    return (
        <div className={'flex flex-col items-start justify-start w-full ' + classes}>
            {label && (
                <label htmlFor={id} className="text-dark-700 font-medium mb-2 text-start">
                    {label}
                </label>
            )}
            <div className="w-full border-2 border-primary-300 focus:ring-primary-500 focus:border-primary-500 rounded-md">
                <select
                    id={id}
                    name={name}
                    className={
                        'block w-full bg-light-100 transition duration-300 rounded-md px-3 py-[10px] normal-case text-dark-300 text-sm font-medium cursor-pointer border-r-transparent border-r-[10px] outline-none ' +
                        (variant == 'secondary' ? 'bg-light-200/70 ' : 'bg-light-100 ') +
                        classes
                    }
                    onChange={(e) => setChoice && setChoice(e)}>
                    {defaultOption && <option className="text-light-200">{defaultOption}</option>}
                    {dropdownOptions.map((option: any, index: any) => {
                        return (
                            <option
                                key={objKey ? option[objKey] : option}
                                data-index={index}
                                value={objKey ? option[objKey] : option}>
                                {objKey ? option[objKey] : option}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
