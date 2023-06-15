import UploadFile from '@/components/ui/Input/UploadFile';

const UploadDocuments = ({ formValues, handleFileUpload, handleFileCancel }: any) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <UploadFile
                    label={'CIN'}
                    file={formValues.cinFile}
                    name="cinFile"
                    handleFileUpload={handleFileUpload}
                    handleFileCancel={handleFileCancel}
                />

                <UploadFile
                    label={'Business PAN'}
                    file={formValues.businessPANFile}
                    name="businessPANFile"
                    handleFileUpload={handleFileUpload}
                    handleFileCancel={handleFileCancel}
                />

                <UploadFile
                    label={'Business TAN'}
                    file={formValues.businessTANFile}
                    name="businessTANFile"
                    handleFileUpload={handleFileUpload}
                    handleFileCancel={handleFileCancel}
                />

                <UploadFile
                    label={'MOA/AOA'}
                    file={formValues.moaFile}
                    name="moaFile"
                    handleFileUpload={handleFileUpload}
                    handleFileCancel={handleFileCancel}
                />
            </div>

            <p className="text-dark-700 font-medium mt-6 text-start">Certifications</p>

            <div className="relative w-full flex flex-col gap-8 rounded-[20px] bg-light-100">
                <div className="w-full flex flex-col justify-center items-center px-10 py-8 rounded-md border-2 border-primary-400 border-dashed cursor-pointer">
                    <i className="fa-solid fa-cloud-arrow-up text-5xl text-primary-500"></i>
                    <p className="mt-4 text-primary-500 font-semibold">Upload Reference</p>
                </div>
            </div>
        </>
    );
};

export default UploadDocuments;
