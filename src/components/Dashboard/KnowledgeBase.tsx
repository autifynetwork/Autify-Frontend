import { Faqs } from '@/config/constants';
import Underline from '@/components/ui/Underline';

const KnowledgeBase = () => {
    const FaqAccordion = Faqs.map((elem: any, idx: number) => {
        return (
            <div key={idx} className={'rounded-xl p-4 border bg-light-100 text-dark-800 border-[#E8E8E8]'}>
                {/* FAQ Item Heading */}
                <h2 className="mb-0" id={elem.content_heading}>
                    <button
                        type="button"
                        className="group relative flex w-full items-center rounded-t-[15px] py-4 px-5 text-left text-xl font-medium transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary-500"
                        data-te-collapse-init
                        data-te-collapse-collapsed={idx == 0 ? 'false' : 'true'}
                        data-te-target={'#' + elem.content_id}
                        aria-controls={elem.content_id}>
                        {elem.heading}
                        <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 motion-reduce:transition-none fill-blue-300 group-[[data-te-collapse-collapsed]]:fill-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </button>
                </h2>
                {/* FAQ Item Content */}
                <div
                    id={elem.content_id}
                    className={'hidden !visible'}
                    data-te-collapse-item
                    aria-labelledby={elem.content_heading}
                    data-te-parent="#knowledgeBaseAccordion">
                    <div className="py-4 px-5">{elem.body}</div>
                </div>
            </div>
        );
    });

    return (
        <>
            <div>
                <h1 className="text-xl text-primary-500 font-semibold">Knowledge Base</h1>
                <Underline color={'blue'} />
            </div>

            <div id="knowledgeBaseAccordion" className="flex flex-col gap-y-6">
                {FaqAccordion}
            </div>
        </>
    );
};

export default KnowledgeBase;
