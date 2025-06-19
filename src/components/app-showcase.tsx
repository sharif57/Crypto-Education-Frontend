import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";
import Image from "next/image";

export default function MobileShowcase() {
  return (
    <div className=" bg-[#62C1BF] overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-36 items-center">
          {/* Mobile Phones Section */}
          <div className=" flex justify-center lg:justify-start">
            <Image
              src="/images/mobile.png"
              alt="Mobile Phones"
              width={700}
              height={900}
              className="object-cover object-center"
            />
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium text-[#373737] leading-tight">
                Transform Your
                <br />
                <span className="text-[#373737]">Crypto Journey</span>
                <br />
                <span className="text-[#373737]">Today!</span>
              </h1>
            </div>

            <p className="text-gray-700 text-lg lg:text-xl leading-relaxed max-w-md lg:max-w-xl">
              The crypto world is evolving fast. With TheClue, you'll not only
              keep up but lead the way. This is more than just learning; it's an
              exhilarating adventure into the future of finance.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-[#224443] py-6  text-[#62C1BF]    rounded-full flex items-center gap-3 text-lg hover:bg-[#224443] cursor-pointer font-medium transition-colors duration-200">
                Get The App On
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0723 16.143C18.9156 16.5323 18.7671 16.9347 18.5932 17.3257C18.0226 18.6079 17.2332 19.7486 16.2981 20.7884C15.8986 21.2329 15.4339 21.6003 14.8639 21.8145C14.2599 22.0413 13.6507 22.016 13.0467 21.83C12.6293 21.7016 12.2222 21.5387 11.8082 21.3982C11.2347 21.2036 10.648 21.0844 10.0383 21.1178C9.48378 21.1483 8.95061 21.2784 8.43298 21.4748C7.95335 21.6561 7.47661 21.8415 6.97107 21.9463C6.20125 22.1058 5.52586 21.9014 4.91093 21.4431C4.28103 20.9738 3.79046 20.3721 3.31775 19.7532C2.66884 18.9033 2.11552 17.9976 1.68656 17.0171C1.18736 15.8764 0.818282 14.6955 0.643245 13.4622C0.448055 12.089 0.452661 10.7186 0.887376 9.38336C1.4027 7.80342 2.35619 6.57701 3.86416 5.82274C4.67141 5.41854 5.52759 5.2245 6.43042 5.27517C7.01829 5.30856 7.57392 5.49454 8.12667 5.68685C8.58326 5.84577 9.04331 5.99489 9.49875 6.15611C9.87416 6.28912 10.2283 6.20563 10.5858 6.08299C11.2209 5.86534 11.8543 5.64367 12.4951 5.44502C13.2292 5.21759 13.9766 5.14907 14.7458 5.2648C15.5226 5.38169 16.2601 5.59473 16.9407 5.99029C17.5528 6.34612 18.0577 6.81768 18.474 7.41131C16.7668 8.44484 15.8888 9.93496 16.031 11.9456C16.1732 13.951 17.2977 15.273 19.0728 16.1424L19.0723 16.143Z"
                    fill="#62C1BF"
                  />
                  <path
                    d="M14.4055 0.00153541C14.4055 0.300366 14.428 0.593438 14.4015 0.881328C14.3099 1.88952 13.8706 2.75089 13.2257 3.51207C12.7547 4.0677 12.2118 4.54214 11.5485 4.85997C11.0078 5.11907 10.4389 5.24229 9.82631 5.19105C9.77162 4.88703 9.78601 4.58072 9.82862 4.27498C9.97947 3.19366 10.4798 2.28335 11.2203 1.50029C11.7057 0.986696 12.2993 0.623954 12.9488 0.349883C13.3743 0.170239 13.8136 0.0452947 14.2748 0.00153541C14.3116 -0.00191927 14.3491 0.00153541 14.4055 0.00153541Z"
                    fill="#62C1BF"
                  />
                </svg>
              </Button>

              <Button className="bg-outline border border-[#224443] py-6  text-[#224443]    rounded-full flex items-center gap-3 text-lg hover:bg-none cursor-pointer font-medium transition-colors duration-200">
                Get The App On
                <svg
                  width="21"
                  height="23"
                  viewBox="0 0 21 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4206_2922)">
                    <path
                      d="M11.7832 11.1592L6.14513 6.43154L0.495972 1.69376V1.21483C0.495972 0.418636 1.35077 -0.0850492 2.04795 0.300925L11.0749 5.30444L15.2969 7.64504L11.7827 11.1592H11.7832Z"
                      fill="#00F076"
                    />
                    <path
                      d="M0.495972 21.1219V20.644L6.14513 15.9062L11.7599 11.1978L15.2696 14.7074L11.0754 17.0323L2.04795 22.0363C1.35077 22.4223 0.495972 21.9181 0.495972 21.1214V21.1219Z"
                      fill="#F1314B"
                    />
                    <path
                      d="M0.495972 20.6439V1.69385L6.14513 6.43162L11.7832 11.1593L11.7943 11.1684L11.7599 11.1977L6.14513 15.9062L0.495972 20.6439Z"
                      fill="white"
                    />
                    <path
                      d="M0.495972 20.6439V1.69385L6.14513 6.43162L11.7832 11.1593L11.7943 11.1684L11.7599 11.1977L6.14513 15.9062L0.495972 20.6439Z"
                      fill="#00D3FF"
                    />
                    <path
                      d="M15.2695 14.7067L11.7599 11.1971L11.7942 11.1678L11.7826 11.1587L15.2968 7.64453L20.0043 10.2539C20.7222 10.652 20.7222 11.6841 20.0043 12.0817L15.269 14.7067H15.2695Z"
                      fill="#FFC400"
                    />
                    <path
                      d="M11.7599 11.1976L11.7523 11.19L11.7831 11.1592L11.7943 11.1683L11.7599 11.1976Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4206_2922">
                      <rect
                        width="20.0474"
                        height="22"
                        fill="white"
                        transform="translate(0.495972 0.168945)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
