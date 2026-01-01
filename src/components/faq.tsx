
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex flex-col lg:flex-row items-start justify-between gap-10 py-14">
            {/* Title */}
            <div className="w-full lg:w-1/2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white text-start">
                    Frequently Asked Questions About <br />
                    <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent font-normal">
                        TheClue®
                    </span>
                </h1>
            </div>

            {/* Accordion */}
            <div className="w-full lg:w-1/2">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-4 sm:space-y-6"
                    defaultValue="item-1"
                >
                    <AccordionItem value="item-1" className="border border-[#404040] px-4  rounded-lg bg-[#121212] hover:bg-[#121212]/60">
                        <AccordionTrigger className="text-lg sm:text-xl font-normal">
                            What makes TheClue unique?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2 sm:gap-4 text-balance">
                            <p className="text-sm sm:text-base text-[#aca6a6]">
                                We offer a comprehensive, all-encompassing approach to crypto education that combines engaging videos, live interactions, and community support.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border border-[#404040] px-4  rounded-lg bg-[#121212] hover:bg-[#121212]/60">
                        <AccordionTrigger className="text-lg sm:text-xl font-normal">
                            Is TheClue suitable for beginners?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2 sm:gap-4 text-balance">
                            <p className="text-sm sm:text-base text-[#aca6a6]">
                                Absolutely! Our content is tailored for all levels, starting from the very basics.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-[#404040] px-4  rounded-lg bg-[#121212] hover:bg-[#121212]/60">
                        <AccordionTrigger className="text-lg sm:text-xl font-normal">
                            How can I maximize the benefits of the referral Program?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2 sm:gap-4 text-balance">
                            <p className="text-sm sm:text-base text-[#aca6a6]">
                                Share your unique link widely - social media, friends, family. The more sign-ups you generate, the greater your rewards!
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border border-[#404040] px-4  rounded-lg bg-[#121212] hover:bg-[#121212]/60">
                        <AccordionTrigger className="text-lg sm:text-xl font-normal">
                            What if I have a question outside of the Q&A Sessions?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2 sm:gap-4 text-balance">
                            <p className="text-sm sm:text-base text-[#aca6a6]">
                                Our support team is available to help you anytime!
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
