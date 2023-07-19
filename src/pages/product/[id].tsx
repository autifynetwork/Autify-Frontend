import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from '@solana/qr-code-styling';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';

export default function Product(): JSX.Element {
    const [fileExt, setFileExt] = useState('png');
    const ref = useRef(null);

    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: 'svg',
        image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
        margin: 16,
        dotsOptions: {
            color: '#3B76EF',
            type: 'rounded',
        },
        backgroundOptions: {
            color: '#FFFFFF',
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            margin: 16,
        },
        cornersSquareOptions: {
            type: 'extra-rounded',
        },
        cornersDotOptions: {
            type: 'dot',
        },
    });

    useEffect(() => {
        // @ts-ignore
        qrCode.append(ref.current);
    }, []);
    const router = useRouter();

    useEffect(() => {
        qrCode.update({
            data: window.location.href,
        });
    }, [router.pathname]);

    const onExtensionChange = (event: any) => {
        setFileExt(event.target.value);
    };

    const onDownloadClick = () => {
        qrCode.download({
            // @ts-ignore
            extension: fileExt,
        });
    };

    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper hideRightSidebar={true}>
                <div className="flex flex-col justify-center items-center gap-x-20 gap-y-10">
                    <div id="qr-code">
                        <div ref={ref} />
                    </div>
                    <div className="w-full flex space-x-10 justify-center">
                        <div className="flex justify-center items-center bg-white rounded-md px-3">
                            <select
                                onChange={onExtensionChange}
                                value={fileExt}
                                className="rounded-md px-3 outline-none">
                                <option value="png">PNG</option>
                                <option value="jpeg">JPEG</option>
                                <option value="webp">WEBP</option>
                            </select>
                        </div>
                        <div>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onDownloadClick}
                                classes="text-md px-4 py-2">
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
            </DashboardWrapper>
        </PageWrapper>
    );
}
