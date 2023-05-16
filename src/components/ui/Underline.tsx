const Underline = ({ color }: any) => {
    return (
        <div className="w-full flex mt-2">
            <p className={'w-[103px] border-b-2 ' + (color == 'blue' ? 'border-primary-500' : 'border-dark-400')}></p>
            <p className={'w-[160px] border-b ' + (color == 'blue' ? 'border-primary-400' : 'border-[#6A6A6A]')}></p>
        </div>
    );
};

export default Underline;
