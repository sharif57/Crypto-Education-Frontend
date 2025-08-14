
"use client";
import Image from "next/image";


export default function TestimonialsSection() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [testimonialText, setTestimonialText] = useState("");
  // const handleShare = () => {
  //   // Handle testimonial submission
  //   console.log("Testimonial submitted:", testimonialText);
  //   setTestimonialText("");
  //   setIsModalOpen(false);
  // };
  return (
    <div>
      <div id="testimonials" className="min-h-screen     text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto -z-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-6">
              What Our Learners Are{" "}
              <span className="text-text">Saying</span>
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              Join thousands of people worldwide who&lsquo;ve transformed their
              understanding of Web3 with us.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 -z-20 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 lg:mt-[200px] mt-[100px] ">
            {/* Column 1 */}
            <div className="space-y-6">
              {/* Theresa Webb */}
              <div className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden hover:bg-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/Ellipse 2.png"
                      alt="Theresa Webb"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-lg text-white">
                    Theresa Webb
                  </span>
                </div>
                <p className="text-gray-300 font-normal text-lg leading-relaxed">
                  TheClue‘s Telegram group is a total game-changer! Being part
                  of this community allows me to access the latest tips and
                  insights before anyone else. The instant updates and lively
                  discussions keep me informed and...
                </p>
              </div>

              {/* Dianne Russell */}
              <div className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden hover:bg-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/Ellipse 2.png"
                      alt="Dianne Russell"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-lg text-white">
                    Dianne Russell
                  </span>
                </div>
                <p className="text-gray-300 text-lg font-normal leading-relaxed">
                  Being part of this community has completely transformed how I
                  approach challenges. The shared knowledge and diverse
                  perspectives have opened my eyes to new strategies and...
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6 lg:-mt-15">
              {/* Cameron Williamson */}
              <div className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden hover:bg-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/Ellipse 2.png"
                      alt="Cameron Williamson"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-lg text-white">
                    Cameron Williamson
                  </span>
                </div>
                <p className="text-gray-300 text-lg font-normal leading-relaxed">
                  Joining TheClue was the best decision I ever made! The 360°
                  learning experience offered here is truly unparalleled. From
                  engaging workshops to hands-on projects, every aspect is
                  designed to enhance...
                </p>
              </div>

              {/* Darlene Robertson */}
              <div className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden hover:bg-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/Ellipse 2.png"
                      alt="Darlene Robertson"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-lg text-white">
                    Darlene Robertson
                  </span>
                </div>
                <p className="text-gray-300 text-lg font-normal leading-relaxed">
                  The clarity and direction I get from the live sessions are
                  unmatched. Every question is met with thoughtful answers that
                  actually move me forward. It‘s like having a personal mentor
                  right there guiding...
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6 lg:mt-0">
              {/* Darrell Steward */}
              <div className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden hover:bg-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/Ellipse 2.png"
                      alt="Darrell Steward"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-lg text-white">
                    Darrell Steward
                  </span>
                </div>
                <p className="text-gray-300 text-lg font-normal leading-relaxed">
                  The energy in the weekly Q&A sessions is absolutely
                  contagious! Each meeting is filled with vibrant discussions
                  and insightful questions that inspire me to dive deeper into
                  the topics. I always leave feeling...
                </p>
              </div>

              {/* Marvin McKinney */}
              <div className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden hover:bg-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/Ellipse 2.png"
                      alt="Marvin McKinney"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-lg text-white">
                    Marvin McKinney
                  </span>
                </div>
                <p className="text-gray-300 text-lg font-normal leading-relaxed">
                  I&lsquo;ve never felt so supported in an online space before. The
                  combination of expert advice and genuine peer connections
                  creates an environment where I feel safe to ask questions...
                </p>
              </div>
            </div>
          </div>

       
          {/* <div className="flex justify-center mt-16 ">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
              <DialogTrigger asChild>
                <Button className="bg-text hover:bg-text hover:opacity-90 cursor-pointer text-black font-normal px-8 !py-6 rounded-full text-lg transition-colors duration-200">
                  Share Your Thought
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border border-text rounded-2xl max-w-md mx-auto">
                <DialogHeader className="flex flex-row items-center justify-between pb-4">
                  <DialogTitle className="text-white text-xl lg:text-[36px] text-center font-medium">
                    Share your Thought
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <Textarea
                    placeholder="Start Writing..."
                    value={testimonialText}
                    onChange={(e) => setTestimonialText(e.target.value)}
                    className="min-h-48 bg-[#535353] border-gray-600 text-white placeholder-white rounded-lg resize-none focus:border-cyan-400 focus:ring-cyan-400"
                  />

                  <Button
                    onClick={handleShare}
                    className="w-full bg-text hover:bg-text text-black font-medium py-5 rounded-full text-lg transition-all duration-300"
                    disabled={!testimonialText.trim()}
                  >
                    Share
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div> */}
        </div>
      </div>
    </div>
  );
}
