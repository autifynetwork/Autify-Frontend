const StatusInfoCard = ({ icon = <i className="fa-solid fa-truck-ramp-box"></i>, text = 'Data', number = '40' }) => {
    return (
        <div className="min-h-[100px] flex justify-between items-center bg-[#BEE9FF] rounded-xl pt-4 pb-3 px-5 pr-8">
            <div className="flex flex-col gap-y-6">
                {icon}
                <span className="uppercase font-semibold">{text}</span>
            </div>
            <span className="text-2xl font-semibold text-primary-500">{number}</span>
        </div>
    );
};

export default StatusInfoCard;
