import { countryCodes } from '@/config/constants';

const PhoneNumber = ({ label = '', value, onFieldChange }: any) => {
    return (
        <div className="w-full flex flex-col justify-end">
            <p className="text-dark-700 font-medium mb-2">{label}</p>
            <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 flex items-center focus:ring-primary-500 focus:border-primary-500">
                    <select
                        id="countryCode"
                        name="countryCode"
                        className="focus:ring-primary-500 focus:border-primary-500 outline-none h-full py-0 px-4 border-r border-dark-500 bg-transparent text-dark-500 text-sm rounded-l-xl cursor-pointer">
                        {countryCodes.map((countryCode) => {
                            return (
                                <option key={countryCode} value={countryCode}>
                                    {countryCode}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={value}
                    onChange={onFieldChange}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    className="focus:ring-primary-500 focus:border-primary-500 outline-none block w-full pl-24 py-[14px] border rounded-xl border-dark-500 shadow-md"
                    placeholder="910 000 0000"
                />
            </div>
        </div>
    );
};

export default PhoneNumber;
