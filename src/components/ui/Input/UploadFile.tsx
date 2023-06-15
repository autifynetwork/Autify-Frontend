export default function UploadFile({ label, file, handleFileUpload, handleFileCancel, required = true }: any) {
    return (
        <div className="w-full flex flex-col justify-end">
            <p className="text-dark-700 font-medium mb-2 text-start">{label}</p>

            <input
                onChange={(e) => handleFileUpload(e)}
                accept="image/*,.pdf"
                type="file"
                className="hidden"
                id="fileToUpload"
                name="coverArt"
                required={required}
            />

            <label
                htmlFor="fileToUpload"
                className="w-full h-full flex justify-between bg-light-100 border border-dark-500 transition duration-300 focus:ring-primary-500 focus:border-primary-500 outline-0 rounded-xl normal-case shadow-md outline-none cursor-pointer">
                <div className="h-full flex items-center justify-center text-sm text-dark-100/60 px-3 py-[14px]">
                    {file ? file?.name.substr(0, 20) + (file?.name.length > 20 ? '...' : '') : 'Choose your file'}
                </div>
                <div className="w-1/3 flex justify-end items-center gap-x-4">
                    {file && (
                        <i
                            className="fa-solid fa-xmark text-lg"
                            onClick={(e) => {
                                handleFileCancel();
                                e.stopPropagation();
                            }}></i>
                    )}
                    <div className="w-full flex items-center justify-center bg-primary-400 h-full font-semibold rounded-r-xl">
                        {file ? <i className="fa-solid fa-circle-check text-primary-500 text-xl"></i> : 'Upload'}
                    </div>
                </div>
            </label>
        </div>
    );
}
