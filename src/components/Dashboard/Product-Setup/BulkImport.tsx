import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';

const BulkImport = () => {
    return (
        <>
            <div className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <div>
                    <h1 className="text-xl text-primary-500 font-semibold">INSTRUCTIONS</h1>
                    <Underline color={'blue'} />
                </div>

                <div className="flex flex-col">
                    <ol className="list-decimal space-y-4 list-inside">
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    </ol>
                </div>
            </div>

            <div className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <h1 className="text-lg text-center text-primary-500 hover:text-primary-600 font-semibold underline cursor-pointer">
                    DOWNLOAD CSV TEMPLATE
                </h1>

                <div className="w-full flex flex-col justify-center items-center px-10 py-20 rounded-md border-2 border-primary-400 border-dashed cursor-pointer">
                    <i className="fa-solid fa-cloud-arrow-up text-6xl text-primary-500"></i>
                    <p className="mt-4 text-primary-500 font-semibold">Upload CSV</p>
                </div>
            </div>

            <div className="flex self-center -mt-6">
                <Button type="button" variant="primary">
                    Submit
                </Button>
            </div>
        </>
    );
};

export default BulkImport;
