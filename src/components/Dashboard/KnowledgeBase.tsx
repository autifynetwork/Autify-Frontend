import Image from 'next/image';
import Link from 'next/link';
import Underline from '@/components/ui/Underline';

const Card = ({ title, slug, icon, description }: any) => {
    return (
        <Link
            href={`/knowledge-base/${slug}`}
            className="bg-light-100 rounded-lg px-6 py-5 cursor-pointer hover:bg-gray-200/90 transition duration-300">
            <span className="relative flex items-center justify-center w-[70px] h-[70px] bg-gray-100 rounded-full">
                <Image src={icon} alt="icon" width="28" height="28" />
            </span>

            <div className="text-lg mt-4">{title}</div>
            <div className="text-sm mt-3 font-normal">{description}</div>
        </Link>
    );
};

const KnowledgeBase = () => {
    return (
        <>
            <div>
                <h1 className="text-xl text-primary-500 font-semibold">Knowledge Base</h1>
                <Underline color={'blue'} />
            </div>

            <div className="grid grid-cols-4 gap-6">
                <Card
                    title={'Accounts'}
                    slug={'accounts'}
                    icon={'/faqs/4.svg'}
                    description={'Lorem ipsum dolor sit amet, consetetur sadipscing'}
                />
                <Card
                    title={'Roles & Permissions'}
                    slug={'roles-permissions'}
                    icon={'/faqs/2.svg'}
                    description={'Lorem ipsum dolor sit amet, consetetur sadipscing'}
                />
                <Card
                    title={'Integration'}
                    slug={'integration'}
                    icon={'/faqs/3.svg'}
                    description={'Lorem ipsum dolor sit amet, consetetur sadipscing'}
                />
                <Card
                    title={'Accounts'}
                    slug={'accounts'}
                    icon={'/faqs/4.svg'}
                    description={'Lorem ipsum dolor sit amet, consetetur sadipscing'}
                />
                <Card
                    title={'Chat Bots'}
                    slug={'chat-bots'}
                    icon={'/faqs/5.svg'}
                    description={'Lorem ipsum dolor sit amet, consetetur sadipscing'}
                />
                <Card
                    title={'In-App Messaging'}
                    slug={'in-app-messaging'}
                    icon={'/faqs/7.svg'}
                    description={'Lorem ipsum dolor sit amet, consetetur sadipscing'}
                />
                <Card
                    title={'Manuals'}
                    slug={'manuals'}
                    icon={'/faqs/8.svg'}
                    description={'Lorem ipsum dolor sit amet, consetetur sadipscing'}
                />
                <Card
                    title={'Automation'}
                    slug={'automation'}
                    icon={'/faqs/5.svg'}
                    description={'Lorem ipsum dolor sit amet, consetetur sadipscing'}
                />
            </div>
        </>
    );
};

export default KnowledgeBase;
