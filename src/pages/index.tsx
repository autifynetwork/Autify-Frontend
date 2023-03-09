import Router from 'next/router';
import Button from '@/components/ui/Button';

export default function Home():JSX.Element {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-light-100">
            <div className="w-full max-w-[1920px] h-screen flex flex-col">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-1/5">
                        <Button variant="primary" onClick={() => Router.push('/auth/admin-login')}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
