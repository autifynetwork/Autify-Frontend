import { useState } from 'react';

const PermissionCheckbox = ({ id }: any) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                name={id}
                className="hidden"
                // onClick={() => {
                // 	setRadioState(radioId1);
                // }}
                // checked={radioState === radioId1}
                onChange={(e) => {
                    setIsChecked(e.target.checked);
                }}
            />
            <label
                htmlFor={id}
                className="flex items-center font-normal cursor-pointer font-secondary text-xs text-[#B4B4B4]">
                <span className="inline-block w-4 h-4 mr-2 border-2 rounded-full border-[#86a6e7] flex-no-shrink"></span>
                {isChecked ? 'Selected' : 'Deselected'}
            </label>
        </div>
    );
};

export default PermissionCheckbox;
