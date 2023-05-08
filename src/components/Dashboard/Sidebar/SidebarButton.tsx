import { useRouter } from 'next/router';

export default function SidebarButton({ icon, text, path }: any) {
    const router = useRouter();
    const active = router.pathname == path;

    return (
        <div
            className={
                'flex items-center px-4 py-2 gap-x-3 rounded-md ' +
                (active ? 'bg-primary-600' : 'hover:bg-primary-600 cursor-pointer transition duration-300')
            }
            onClick={() => {
                if (!active) {
                    router.push(path);
                }
            }}>
            {icon}
            {text}
        </div>
    );
}
