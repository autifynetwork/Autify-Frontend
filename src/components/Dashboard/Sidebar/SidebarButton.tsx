import { useRouter } from 'next/router';

export default function SidebarButton({ icon, text, path }: any) {
    const router = useRouter();
    const active = router.pathname == path;

    return (
        <div
            className={
                'inline-block align-middle px-4 py-2 rounded-md ' +
                (active ? 'bg-primary-600' : 'hover:bg-primary-600 cursor-pointer transition duration-300')
            }
            onClick={() => {
                if (!active) {
                    router.push(path);
                }
            }}>
            {icon}
            <span className="ml-3">{text}</span>
        </div>
    );
}
