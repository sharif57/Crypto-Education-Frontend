import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section id="Features" className="relative bg-[#1a1a1a] py-16 lg:py-24">
      {/* Background subtle pattern */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight mb-6">
            <span className="text-white">Smart Features, Smarter </span>
            <span className="text-text">Learning</span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
            Built for Every Web3 Learner — From Curious Beginners to Serious
            Builders.
            <br />
            Learn with the perfect mix of AI, expert videos, and real-time
            support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Row 1 */}
          {/* Global Access - Large Card */}
          <div className="lg:col-span-1 lg:row-span-2">
            <div className="h-full bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl  border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="relative z-10  h-full flex flex-col">
                {/* Icon */}

                {/* Content */}
                <div className="flex-1 space-y-4 mb-8 p-8">
                  <div className="w-16 h-16  bg-cyan-400/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-cyan-400/30 transition-colors duration-300">
                    <svg
                      width="68"
                      height="68"
                      viewBox="0 0 68 68"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_4195_1112)">
                        <path
                          d="M34 67.2031C52.3376 67.2031 67.2031 52.3376 67.2031 34C67.2031 15.6624 52.3376 0.796875 34 0.796875C15.6624 0.796875 0.796875 15.6624 0.796875 34C0.796875 52.3376 15.6624 67.2031 34 67.2031Z"
                          fill="#62C1BF"
                        />
                        <path
                          d="M33.273 47.7938V51.0511L25.2632 55.6929H19.7128C19.4682 55.6929 19.2702 55.8911 19.2702 56.1356C19.2702 56.3801 19.4682 56.5783 19.7128 56.5783H52.1974C52.4421 56.5783 52.6401 56.38 52.6401 56.1356C52.6401 55.8912 52.4421 55.6929 52.1974 55.6929H46.6471L38.6369 51.0511V47.8068C44.6737 47.0565 48.8035 43.8646 51.3025 41.1319C52.0669 40.2953 52.0396 39.0134 51.2399 38.2129L51.2009 38.1738C50.3856 37.3584 49.051 37.3568 48.2269 38.1714C48.0905 38.306 47.9449 38.4463 47.7926 38.5901L46.6974 37.495C49.2299 34.8112 50.7227 31.2119 50.7227 27.3761C50.7227 20.0223 45.2938 13.8327 38.1326 12.7687C33.6692 12.1048 29.1474 13.5114 25.836 16.6338L24.657 15.4549C24.8094 15.295 24.9571 15.1417 25.0945 14.9997C25.8901 14.178 25.8778 12.8508 25.0681 12.041C24.2436 11.2156 22.8905 11.2076 22.0616 12.0623C20.0539 14.1323 15.3527 18.9801 15.3596 27.375C15.3596 32.8856 17.5002 38.061 21.3868 41.9482C24.6359 45.1937 28.7843 47.2151 33.273 47.7938ZM37.9725 51.6893L44.8816 55.6929H27.0288L33.9374 51.6893C34.0741 51.6101 34.1583 51.464 34.1583 51.3063V47.8898C34.7529 47.9407 35.3518 47.9709 35.9555 47.9709C36.5734 47.9709 37.1677 47.9373 37.7514 47.8895V51.3061C37.7515 51.4642 37.8359 51.6101 37.9725 51.6893ZM38.915 40.9343C38.8605 40.5374 38.7576 40.1293 38.6106 39.7329C38.2051 38.6041 37.5701 37.5106 37.6331 36.4064C37.663 35.8413 38.0443 35.2231 38.5401 34.9363C38.8195 34.7746 39.1291 34.7217 39.4221 34.8698C39.7472 35.0354 39.9738 35.4009 40.2132 35.7878C40.6898 36.5541 41.3348 37.3297 42.2888 37.1704C43.2809 36.9982 43.6223 35.9877 43.7648 34.9991C43.8248 34.5797 43.8819 34.1838 44.0799 33.8914C44.4561 33.3464 45.2844 33.247 45.9394 33.3901C46.6346 33.5422 47.3142 33.9142 48.0428 34.1886C46.0559 37.6982 42.6721 40.1209 38.915 40.9343ZM49.8374 27.3762C49.8374 29.5318 49.343 31.5742 48.4621 33.3961C47.6491 33.1058 46.9702 32.7095 46.1288 32.5251C45.2555 32.3343 44.0026 32.4449 43.3489 33.3917C43.0346 33.8563 42.9569 34.3967 42.8885 34.8735C42.6471 36.5597 41.8911 36.817 40.9659 35.3214C40.6862 34.8701 40.3693 34.3586 39.8228 34.0804C39.2831 33.8069 38.6706 33.8385 38.0965 34.1699C37.3364 34.6097 36.7948 35.4898 36.7489 36.3581C36.6727 37.6988 37.3604 38.8753 37.7792 40.0366C37.9101 40.3911 37.9984 40.7518 38.0421 41.0984C37.3605 41.2018 36.663 41.2558 35.953 41.2558C32.0491 41.2558 28.519 39.6332 25.9947 37.03C26.361 36.3063 27.2186 36.4355 28.0322 36.5335C28.5229 36.5928 29.0292 36.6537 29.5273 36.59C30.8857 36.4119 31.9778 35.1994 32.0131 33.8295C32.0482 32.4824 30.9984 31.1907 29.6724 30.9504C28.9115 30.8118 28.1653 30.9838 27.4433 31.1488C26.6297 31.3349 25.861 31.5107 25.2358 31.1862C24.4044 30.7526 24.2081 29.6886 24.0007 28.5624C23.752 27.2208 23.5036 26.1285 22.296 24.9185C23.2547 19.5751 27.276 15.2814 32.4742 13.9343C32.961 15.0418 33.0278 16.33 32.6353 17.4489C32.275 18.4811 31.4674 19.5366 31.0561 20.6656C30.5973 21.9207 30.6717 23.6364 31.919 24.4372C32.7067 24.9455 34.1126 25.1759 36.3314 23.3868C37.4352 22.5061 38.7024 21.6754 39.7399 22.1838C41.4149 23.0046 41.0126 26.8449 43.6681 27.0424C44.9318 27.1382 45.9564 25.9638 46.0887 24.7539C46.2171 23.5267 45.6137 22.4003 45.1488 21.6603C44.6118 20.8022 43.9989 20.0384 43.6711 19.1603C43.2997 18.1644 43.3294 17.0205 43.7476 15.893C47.4203 18.3939 49.8374 22.6077 49.8374 27.3762ZM22.0915 28.0687C22.056 27.3499 22.0756 26.7326 22.1366 26.078C22.8076 26.9734 22.9444 27.7149 23.1297 28.7228C23.3557 29.9486 23.6122 31.3378 24.8274 31.9718C25.7432 32.4458 26.7081 32.2258 27.6407 32.0118C28.3065 31.8596 28.9355 31.7167 29.5144 31.8213C30.4133 31.9843 31.1521 32.8931 31.1278 33.806V33.8062C31.104 34.7362 30.3345 35.5911 29.4132 35.7117C29.0288 35.7612 28.5952 35.7097 28.1387 35.6542C27.0755 35.5263 26.0399 35.4543 25.3745 36.3467C23.347 33.9594 22.2375 31.0517 22.0915 28.0687ZM37.9587 13.639C39.7205 13.8955 41.4239 14.4912 42.9845 15.4116C42.4287 16.7932 42.3757 18.2203 42.8415 19.4699C43.2135 20.4652 43.8863 21.3108 44.3987 22.1305C45.0269 23.131 45.2841 23.9353 45.2084 24.6597C45.1254 25.4134 44.4752 26.2159 43.7337 26.1597C41.9132 26.0239 42.0544 22.3322 40.1293 21.3889C38.6528 20.6654 37.0519 21.6791 35.7774 22.6958C35.777 22.6962 35.7765 22.6969 35.7757 22.6973C34.7779 23.5016 33.3815 24.3271 32.3979 23.6927C31.5972 23.1784 31.535 21.9336 31.8877 20.969C32.2989 19.8403 33.0472 18.9562 33.471 17.741C33.9173 16.4691 33.8696 15.0118 33.3581 13.7392C34.8962 13.4473 36.4152 13.4147 37.9587 13.639ZM25.2103 17.26C22.4582 20.183 21.0042 24.0828 21.2075 28.1276C21.6066 36.0197 28.1685 42.1411 35.953 42.1411C39.7011 42.1411 43.325 40.7032 46.0713 38.1209L47.1377 39.1873C42.8168 42.9984 33.8256 48.4139 24.3733 38.9611C21.2831 35.8708 19.5813 31.756 19.5813 27.3745C19.5763 21.7747 22.1016 18.2673 24.0547 16.1046L25.2103 17.26ZM22.6973 12.6788C23.1734 12.1875 23.9584 12.1834 24.4421 12.6671C24.912 13.1373 24.9195 13.9075 24.4581 14.3839C22.5857 16.3185 18.6895 20.3442 18.696 27.375C18.696 31.9925 20.4898 36.3295 23.7474 39.5872C34.9517 50.7921 45.7933 41.8191 48.8486 38.8016C49.3284 38.3277 50.1027 38.3273 50.5741 38.7989L50.612 38.8372C50.6124 38.8374 50.6124 38.8378 50.613 38.8381C51.0777 39.3028 51.0938 40.048 50.6488 40.5344C47.9161 43.5229 43.1488 47.0855 35.9555 47.0855C30.685 47.0855 25.7335 45.0386 22.0129 41.3218C18.2935 37.6023 16.2451 32.649 16.2451 27.3745C16.2387 19.3387 20.7648 14.6717 22.6973 12.6788Z"
                          fill="#224443"
                          stroke="#224443"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4195_1112">
                          <rect width="68" height="68" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="text-2xl lg:text-2xl font-medium text-white">
                    Global Access, Localized Experience
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    No matter where you are, access expert-led lessons tailored
                    for your region — with culturally relevant content and
                    multilingual learning support.
                  </p>
                </div>

                {/* Professional Image */}
                <div className="mt-auto">
                  <div className="relative">
                    <Image
                      src="/images/Ellipse 1.png"
                      alt="Background"
                      width={600}
                      height={600}
                      className="object-contain h-[550px] absolute inset-0"
                    />
                    <Image
                      src="/images/Man 1.png"
                      alt="Professional"
                      width={600}
                      height={600}
                      className="object-contain h-[400px] relative z-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Powered Learning Assistant */}
          <div className="lg:col-span-1">
            <div className="h-full  bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e]  rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <Image
                  src="/images/Layer_1 (1).png"
                  alt="AI"
                  width={600}
                  height={600}
                  className="size-[68px] mb-5"
                />
                <h3 className="text-2xl font-medium text-white mb-4">
                  AI-Powered Learning Assistant
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Get instant answers and explanations from our integrated AI
                  chatbot — trained on your course content
                </p>
              </div>
            </div>
          </div>

          {/* Self-Paced Learning */}
          <div className="lg:col-span-1">
            <div className="h-full  bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e]  rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <Image
                  src="/images/time.png"
                  alt="AI"
                  width={600}
                  height={600}
                  className="size-[68px] mb-5"
                />
                <h3 className="text-2xl font-medium text-white mb-4">
                  Self-Paced Learning
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Pause, rewind, or skip ahead. Learn on your schedule, from any
                  device.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          {/* Structured Video Masterclasses */}
          <div className="lg:col-span-1">
            <div className="h-full bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <Image
                  src="/images/Group (1).png"
                  alt="AI"
                  width={600}
                  height={600}
                  className="size-[68px] mb-5"
                />
                <h3 className="text-2xl font-medium text-white mb-4">
                  Structured Video Masterclasses
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Learn through engaging, beginner-friendly video lessons taught
                  by certified Web3 experts.
                </p>
              </div>
            </div>
          </div>

          {/* Personalized Coaching */}
          <div className="lg:col-span-1">
            <div className="h-full bg-gradient-to-br from-[#1c1c1c] to-[#2e2e2e] rounded-3xl p-8 border border-text hover:border-cyan-400/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <Image
                  src="/images/call.png"
                  alt="AI"
                  width={600}
                  height={600}
                  className="size-[68px] mb-5"
                />
                <h3 className="text-2xl font-medium text-white mb-4">
                  Personalized Coaching
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Book 1-on-1 sessions with professionals to fast-track your
                  learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
