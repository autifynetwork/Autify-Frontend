const BomCard = ({
    heading = 'Nulla volutpat aliquam velit',
    content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..',
    initials = 'OZ',
    type = 1,
    timeContent = null,
}: any) => {
    return (
        <div className="w-full bg-light-100 shadow-xl rounded-lg p-3 border-[0.5px]">
            <p className="text-[#646678] text-sm">{heading}</p>
            <p className="text-[#646678] text-xs mt-2 font-normal">{content}</p>
            <div className="mt-4 w-full flex justify-between items-end">
                <p
                    className={
                        'w-fit rounded-full p-[6px] text-[10px] text-light-100 ' +
                        (type == 1
                            ? 'bg-blue-500'
                            : type == 2
                            ? 'bg-purple-500'
                            : type == 3
                            ? 'bg-cyan-500'
                            : type == 4
                            ? 'bg-indigo-500'
                            : 'bg-blue-500')
                    }>
                    {initials}
                </p>
                {timeContent}
            </div>
        </div>
    );
};

export default BomCard;
