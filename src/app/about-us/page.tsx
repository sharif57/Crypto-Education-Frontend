import Image from "next/image"

export default function Component() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/images/BG.png" alt="About Us Background" fill className="object-cover" priority />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* About Us Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 text-center lg:text-left">
            About Us
          </h1>

          {/* Content Grid */}
          <div className="grid gap-6 sm:gap-8 lg:gap-10">
            {/* Mission Statement */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-teal-400">1. Mission</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                &quot;Empowering the next generation of learners to explore the future of finance&quot;
              </p>
            </div>

            {/* Core Story */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-teal-400">2. Core Story</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                &quot;We&apos;re a global team of educators, developers, and crypto natives on a mission to make Web3 education
                accessible to everyone. Our goal is to create a space where you can build new blockchain or exploring
                advanced DeFi strategies — we&rsquo;ve got you covered.&#34;
              </p>
            </div>

            {/* Why We Exist */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-teal-400">3. Why We Exist</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                &ldquo;We&apos;re changing the world. We believe learning about it should be safe, smart, and available to all.&quot;
              </p>
            </div>

            {/* What Makes Us Different */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-teal-400">4. What Makes Us Different</h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    Subscription-based video learning you can control
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    AI chat guidance for every concept
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    Optional personal coaching from real experts
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">Beginner-friendly and no fluff</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
