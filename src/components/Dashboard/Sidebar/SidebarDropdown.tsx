import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SidebarDropdown({ icon, text, path, options }: any) {
    const router = useRouter();
    const [open, setOpen] = useState(router.pathname.startsWith(path));

    return (
        <div className="flex flex-col">
            <div
                className={
                    'flex items-center justify-between px-4 py-2 gap-x-4 rounded-md cursor-pointer hover:bg-primary-600'
                }
                onClick={() => setOpen(!open)}>
                <div className="inline-block align-middle items-center gap-2">
                    {icon}
                    <span className="ml-3">{text}</span>
                </div>
                <i className="fa-solid fa-chevron-down -mt-1"></i>
            </div>

            {open && options && (
                <div className="flex flex-col gap-y-1 mt-2">
                    {options.map((option: any, index: number) => {
                        const active = router.pathname == option.path;

                        return (
                            <div
                                key={index}
                                className={
                                    'w-11/12 self-end inline-block align-middle px-4 py-2 gap-x-3 rounded-md ' +
                                    (active
                                        ? 'bg-primary-600 uppercase'
                                        : 'hover:bg-primary-600 cursor-pointer transition duration-300')
                                }
                                onClick={() => {
                                    if (!active) {
                                        router.push(option.path);
                                    }
                                }}>
                                <i
                                    className={
                                        'fa-solid fa-circle text-xs ' + (active ? 'text-light-100' : 'text-primary-600')
                                    }></i>
                                <span className="ml-3">{option.name}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
