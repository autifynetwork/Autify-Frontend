export default function Step({ heading, text, isActive, onClick, isComplete, lastStep, icon }: any) {
    return (
        <li
            onClick={() => onClick()}
            className={
                'grid grid-cols-4 h-full w-full gap-x-1 place-items-center justify-between cursor-pointer ' +
                (lastStep
                    ? ''
                    : "after:content-[''] after:absolute after:place-self-end after:mr-[32px] after:-mb-[90px] after:h-[82px] after:border-[0.5px] after:inline-block " +
                      (isActive || isComplete ? 'after:border-primary-600' : 'after:border-dark-300'))
            }>
            <div className="flex flex-col text-end col-span-3">
                <p className={'font-semibold text-lg ' + (isActive ? 'text-primary-600' : 'text-dark-400')}>
                    {heading}
                </p>
                <p className={'font-light text-lg text-dark-400'}>{text}</p>
            </div>

            <div
                className={
                    'col-span-1 relative p-6 rounded-full ' +
                    (isComplete
                        ? 'bg-primary-500 border-2 border-primary-600'
                        : isActive
                        ? 'border-2 border-primary-600 bg-light-100'
                        : 'bg-light-100')
                }>
                {isComplete ? (
                    <i className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-light-100 fas fa-check"></i>
                ) : (
                    <i
                        className={
                            icon +
                            ' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg' +
                            (isActive && ' text-primary-500')
                        }></i>
                    // <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-[5px] bg-primary-600"></span>
                )}
            </div>
        </li>
    );
}
