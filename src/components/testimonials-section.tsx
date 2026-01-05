


export default function TestimonialsSection() {

  const reviews = [
    {
      "id": 1,
      "name": "Jasmin K.",
      "message": "TheClue's Telegram group is a total game-changer! Being part of this community allows me to access the latest tips and insights before anyone else. The instant updates and lively discussions keep me informed and inspired, giving me an edge in my learning journey."
    },
    {
      "id": 2,
      "name": "Alex K.",
      "message": "Joining TheClue was the best decision I ever made! The 360° learning experience offered here is truly unparalleled. From engaging workshops to hands-on projects, every aspect is designed to enhance my skills and knowledge."
    },
    {
      "id": 3,
      "name": "Maria S.",
      "message": "The energy in the weekly Q&A sessions is absolutely contagious! Each meeting is filled with vibrant discussions and insightful questions that inspire me to dive deeper into the topics. I always leave feeling motivated and eager to learn more."
    },
    {
      "id": 4,
      "name": "Feliz M.",
      "message": "Being part of this community has completely transformed how I approach challenges. The shared knowledge and constant encouragement push me to grow every day. It's empowering to know I'm not doing this alone."
    },
    {
      "id": 5,
      "name": "Manuel F.",
      "message": "I've never felt so supported in an online space before. The combination of expert advice and genuine peer connection creates an environment where I feel safe to ask, explore, and grow at my own pace."
    },
    {
      "id": 6,
      "name": "John B.",
      "message": "The clarity and direction I get from the live sessions are unmatched. Every question is met with thoughtful answers that actually move me forward. It's like having a personal mentor right there with me."
    }
  ]


  return (
    <div>
      <div id="testimonials" className="min-h-screen     text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto -z-20">
          {/* Header Section */}
          {/* <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-6">
              What Our Learners Are{" "}
              <span className="text-text">Saying</span>
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              Join thousands of people worldwide who&lsquo;ve transformed their
              understanding of Web3 with us.
            </p>
          </div> */}
          {/* <Heading title=" What customers say" subtitle="Join thousands of people worldwide who&lsquo;ve transformed their
              understanding of Web3 with us." /> */}
          <div>
            <h1 className="text-3xl font-normal w-full lg:w-1/2 mx-auto text-[60px] text-white text-center">
              What customers <span className="bg-gradient-to-r from-[#94ecea] to-[#307574] bg-clip-text text-transparent font-normal">
                Say
              </span>
            </h1>
            <p className="text-[16px] font-normal text-[#B4B4B4] pt-2 w-full lg:w-4xl mx-auto text-center text-balance">
              What other people are saying about TheClue
            </p>
          </div>

          <div className="grid grid-cols-1 -z-20 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 lg:mt-[100px] mt-[100px] ">
           
            {
              reviews?.map((review, index) => (
                <div key={index} className="bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-[#3a3939] hover:border-[#242424]/90 cursor-pointer transition-all duration-300 group relative overflow-hidden hover:bg-text">
                  <div className="flex items-center gap-3 mb-4">

                    <span className="font-semibold text-lg text-white">
                      {review?.name}
                    </span>
                  </div>
                  <p className="text-gray-300 font-normal text-lg leading-relaxed">
                    {review?.message}
                  </p>
                </div>
              ))
            }




          </div>

        </div>
      </div>
    </div>
  );
}
