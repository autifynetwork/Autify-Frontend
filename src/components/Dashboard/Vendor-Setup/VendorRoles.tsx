import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import PermissionCheckbox from '@/components/Dashboard/Vendor-Setup/PermissionCheckbox';
import Button from '@/components/ui/Button';

const VendorRoles = () => {
    const [vendorRolesData, setVendorRolesData] = useState({ name: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setVendorRolesData({ ...vendorRolesData, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative flex flex-col h-full items-start justify-start gap-8 p-10 rounded-[20px] bg-light-100">
            <div className="w-1/2">
                <TextInput
                    label={'Add Role Name'}
                    type={'text'}
                    value={vendorRolesData.name}
                    name={'name'}
                    onFieldChange={onFieldChange}
                    placeholder="Ex. Manufacturer"
                    required={true}
                />
            </div>

            <div className="mt-8 grid grid-cols-4 gap-x-20 gap-y-8">
                <div className="font-bold text-[13px]">CATEGORY SETUP</div>
                <div className="font-semibold">Read</div>
                <div className="font-semibold">Write</div>
                <div className="font-semibold">Status Update</div>

                <div className="text-[15px]">Categories</div>
                <PermissionCheckbox id={1} />
                <PermissionCheckbox id={2} />
                <PermissionCheckbox id={3} />

                <div className="text-[15px]">Sub-Categories</div>
                <PermissionCheckbox id={4} />
                <PermissionCheckbox id={5} />
                <PermissionCheckbox id={6} />

                <div className="font-bold text-[13px] mt-8">PRODUCT SETUP</div>
                <div className="font-semibold mt-8">Read</div>
                <div className="font-semibold mt-8">Write</div>
                <div className="font-semibold mt-8">Status Update</div>

                <div className="text-[15px]">Product List</div>
                <PermissionCheckbox id={7} />
                <PermissionCheckbox id={8} />
                <PermissionCheckbox id={9} />

                <div className="text-[15px]">Product Attribute</div>
                <PermissionCheckbox id={10} />
                <PermissionCheckbox id={11} />
                <PermissionCheckbox id={12} />

                <div className="text-[15px]">Bulk Import</div>
                <PermissionCheckbox id={13} />
                <PermissionCheckbox id={14} />
                <PermissionCheckbox id={15} />

                <div className="text-[15px]">Product SKU</div>
                <PermissionCheckbox id={16} />
                <PermissionCheckbox id={17} />
                <PermissionCheckbox id={18} />

                <div className="font-bold text-[13px] mt-8">USER MANAGEMENT</div>
                <div className="font-semibold mt-8">Read</div>
                <div className="font-semibold mt-8">Write</div>
                <div className="font-semibold mt-8">Status Update</div>

                <div className="text-[15px]">Vendor Setup</div>
                <PermissionCheckbox id={19} />
                <PermissionCheckbox id={20} />
                <PermissionCheckbox id={21} />

                <div className="text-[15px]">Vendor Roles</div>
                <PermissionCheckbox id={22} />
                <PermissionCheckbox id={23} />
                <PermissionCheckbox id={24} />

                <div className="text-[15px]">Send Notifications</div>
                <PermissionCheckbox id={25} />
                <PermissionCheckbox id={26} />
                <PermissionCheckbox id={27} />

                <div className="font-bold text-[13px] mt-8">HELP & SUPPORT</div>
                <div className="font-semibold mt-8">Read</div>
                <div className="font-semibold mt-8">Write</div>
                <div className="font-semibold mt-8">Status Update</div>

                <div className="text-[15px]">Full Module</div>
                <PermissionCheckbox id={28} />
                <PermissionCheckbox id={29} />
                <PermissionCheckbox id={30} />

                <div className="font-bold text-[13px] mt-8">ORDER MANAGEMENT</div>
                <div className="font-semibold mt-8">Read</div>
                <div className="font-semibold mt-8">Write</div>
                <div className="font-semibold mt-8">Status Update</div>

                <div className="text-[15px]">Create</div>
                <PermissionCheckbox id={31} />
                <PermissionCheckbox id={32} />
                <PermissionCheckbox id={33} />

                <div className="text-[15px]">Track</div>
                <PermissionCheckbox id={34} />
                <PermissionCheckbox id={35} />
                <PermissionCheckbox id={36} />

                <div className="text-[15px]">Complete</div>
                <PermissionCheckbox id={37} />
                <PermissionCheckbox id={38} />
                <PermissionCheckbox id={39} />
            </div>

            <div className="self-center w-fit flex gap-x-6 mb-16 mt-10">
                <Button
                    type={'button'}
                    variant={'primary'}
                    outline={true}
                    classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                    CLEAR DATA <i className="fa-solid fa-eraser ml-2"></i>
                </Button>
                <Button type={'button'} variant={'primary'} classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                    SAVE & UPDATE <i className="fa-regular fa-floppy-disk ml-2"></i>
                </Button>
            </div>
        </div>
    );
};

export default VendorRoles;
