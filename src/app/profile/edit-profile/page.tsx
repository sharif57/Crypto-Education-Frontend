// "use client";

// import type React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import { useUpdateProfileMutation, useUserProfileQuery } from "@/Redux/feature/userSlice";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function EditProfile() {
//   const router = useRouter();
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   // const IMAGE = process.env.NEXT_PUBLIC_API_URL


//   const { data } = useUserProfileQuery(undefined)
//   console.log(data?.data, 'profile')
//   const user = data?.data
//   const [name, setName] = useState(user?.full_name);
//   const [imagePreview, setImagePreview] = useState<string>(
//     `${user?.image}`
//   );

//   const [updateProfile] = useUpdateProfileMutation()
//   // Handle image preview when a new file is selected
//   useEffect(() => {
//     if (imageFile) {
//       const previewUrl = URL.createObjectURL(imageFile);
//       setImagePreview(previewUrl);
//       // Clean up preview URL when component unmounts or image changes
//       return () => URL.revokeObjectURL(previewUrl);
//     }
//   }, [imageFile]);

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("full_name", name);
//       formData.append("image", imageFile || "");

//       const res = updateProfile(formData)
//       console.log(res, 'res')

//       toast.success("Profile updated successfully!");
//       setTimeout(() => {
//         router.back();

//       }, 1000);

//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update profile. Please try again.");
//     }

//   };

//   return (
//     <div className="min-h-screen w-full text-white flex items-center justify-center bg-[#1B1B1B]">
//       <main className="w-full">
//         <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
//           <div className="flex flex-col items-center justify-center gap-8">
//             <div className="w-full max-w-[840px] bg-gradient-to-b border border-[#62C1BF] from-[#161616] via-[#2c2c2c] to-[#3f3d3d] rounded-3xl shadow-xl p-6 sm:p-8">
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
//               >
//                 <div className="w-[200px] h-[240px] sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0 relative">
//                   {
//                     user?.image ? (
//                       <Image
//                         src={imagePreview}
//                         height={900}
//                         width={900}
//                         alt="profile"
//                         className="w-full h-full object-cover rounded-lg"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
//                         No Image
//                       </div>
//                     )

//                   }
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setImageFile(e.target.files?.[0] || null)}

//                     className="absolute bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                     title="Upload new profile image"
//                   />
//                   <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#62C1BF] text-[#224443] text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
//                     Upload Image
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-6 sm:gap-8 justify-center items-start w-full sm:w-auto">
//                   <div className="flex flex-col gap-1 w-full">
//                     <label
//                       htmlFor="name"
//                       className="text-lg sm:text-xl md:text-[23px] font-medium"
//                     >
//                       Name:
//                     </label>
//                     <input
//                       id="name"
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}

//                       defaultValue={user?.full_name}
//                       className="w-full text-lg sm:text-xl md:text-[23px] font-normal text-[#E6F9FD] bg-transparent border-b border-[#62C1BF] focus:outline-none focus:border-[#E6F9FD] p-2"
//                       placeholder="Enter your name"
//                     />
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
//                       Email:
//                     </h1>
//                     <p className="text-lg sm:text-xl md:text-[23px] font-normal text-[#E6F9FD]">
//                       {user?.email}
//                     </p>
//                   </div>
//                   <div>
//                     <Button
//                       type="submit"
//                       className="px-6 !py-5 sm:px-8 sm:py-4 cursor-pointer bg-text hover:bg-text font-normal text-[#224443] rounded-2xl text-sm sm:text-[16px]"
//                     >
//                       Save Changes
//                     </Button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useUpdateProfileMutation, useUserProfileQuery } from "@/Redux/feature/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

// Define language options with standard codes
const languageOptions = [
  { value: "english", label: "English" },
  { value: "german", label: "German" },
];

export default function EditProfile() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const { data, isLoading } = useUserProfileQuery(undefined);
  const user = data?.data;
  
  // Initialize state with fallback values
  const [language, setLanguage] = useState<string>("en"); // Default to 'en' (English)
  const [name, setName] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const [updateProfile] = useUpdateProfileMutation();

  // Sync state with user data when it becomes available
  useEffect(() => {
    if (user) {
      setName(user.full_name || "");
      // Map server language code to client-side value, default to 'en' if invalid
      const userLanguage = languageOptions.some(opt => opt.value === user.language)
        ? user.language
        : "en";
      setLanguage(userLanguage);
      setImagePreview(user.image || "");
    }
  }, [user]);

  // Handle image preview when a new file is selected
  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl); // Clean up
    }
  }, [imageFile]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (!language) {
      toast.error("Please select a language.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("full_name", name.trim());
      if (imageFile) formData.append("image", imageFile);
      formData.append("language", language); // Send standard language code (e.g., 'en', 'de')

      const res = await updateProfile(formData).unwrap();
      console.log(res, "Profile update response");
      localStorage.setItem("language", res?.data?.language);

      toast.success("Profile updated successfully!");
      setTimeout(() => {
        router.back();
      }, 1000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Profile update error:", error);
      const errorMessage = error?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen w-full text-white flex items-center justify-center bg-[#1B1B1B]">
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-full max-w-[840px] bg-gradient-to-b border border-[#62C1BF] from-[#161616] via-[#2c2c2c] to-[#3f3d3d] rounded-3xl shadow-xl p-6 sm:p-8">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
              >
                <div className="w-[200px] h-[240px] sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0 relative">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      height={900}
                      width={900}
                      alt="profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="absolute bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    title="Upload new profile image"
                  />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#62C1BF] text-[#224443] text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                    Upload Image
                  </div>
                </div>
                <div className="flex flex-col gap-6 sm:gap-8 justify-center items-start w-full sm:w-auto">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="name"
                      className="text-lg sm:text-xl md:text-[23px] font-medium"
                    >
                      Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-lg sm:text-xl md:text-[23px] font-normal text-[#E6F9FD] bg-transparent border-b border-[#62C1BF] focus:outline-none focus:border-[#E6F9FD] p-2"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Label
                      htmlFor="language"
                      className="text-lg sm:text-xl md:text-[23px] font-medium"
                    >
                      Select Language
                    </Label>
                    <select
                      id="language"
                      className="bg-[#535353] w-full py-2 border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      {languageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
                      Email:
                    </h1>
                    <p className="text-lg sm:text-xl md:text-[23px] font-normal text-[#E6F9FD]">
                      {user?.email || "Loading..."}
                    </p>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="px-6 !py-5 sm:px-8 sm:py-4 cursor-pointer bg-text hover:bg-text font-normal text-[#224443] rounded-2xl text-sm sm:text-[16px]"
                      disabled={isLoading}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}