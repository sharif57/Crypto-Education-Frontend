"use client"

import Loading from "@/components/Loading"
import GlowCard from "@/components/ui/spotlightcard"
import { useAdditionalResourcesQuery, useAllCourseQuery } from "@/Redux/feature/categoryVideoSlice"
import { useLiveClassQuery } from "@/Redux/feature/liveRoomSlice"
import Image from "next/image"
import Link from "next/link"

interface Course {
  id: number;
  name: string;
  thumbnail: string;
}

interface LiveClass {
  id: string;
  title: string;
  date_time: string;
  duration_minutes: number;
  link: string;
}

export default function Courses() {

  const { data: courses, isLoading } = useAllCourseQuery(undefined)
  const { data } = useLiveClassQuery(undefined);
  const { data: additionalResources } = useAdditionalResourcesQuery(undefined);


  if (isLoading) {
    return <><Loading /></>
  }



  return (
    <div className="min-h-screen pt-20 w-full  bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
      {/* <div className="w-full min-h-screen bg-gradient-to-b from-[#326866] to-[#1B1B1B]"> */}

      {/* Header Section */}

      <div className="
  container mx-auto
  px-4 sm:px-6 md:px-10 lg:px-14
  py-10 sm:py-12 md:py-14 lg:py-16
">
        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {data?.data?.length > 0 ? (
            data.data.map((live: LiveClass) => (
              <GlowCard
                key={live.id}
                glowColor="purple"
                className="h-[400px] w-full cursor-pointer flex flex-col"
              >
                <Image
                  src="/images/live.png"
                  alt={live.title || 'live class'}
                  width={1000}
                  height={1000}
                  priority
                  className="w-full h-[200px] object-cover"
                />
                <div className="flex flex-col items-center justify-between h-full ">
                  <div className="text-center">
                    {/* <h2 className="text-2xl font-semibold text-white mb-2">{live.title}</h2> */}
                    <p className="text-gray-300 mb-3">{live.title}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(live.date_time).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                    <p className="text-sm text-gray-400">
                      Duration: {live.duration_minutes} minutes
                    </p>
                  </div>
                  <Link
                    href={live.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block w-full text-center bg-text text-white px-4 py-2 rounded-lg  transition-colors duration-300"
                  >
                    Join Live Class
                  </Link>
                </div>
              </GlowCard>
            ))
          ) : (
            <GlowCard className="h-[400px] w-full cursor-pointer flex flex-col">
              <Image
                src="/images/live.png"
                alt="no live class"
                width={1000}
                height={1000}
                priority
                className="w-full h-[200px] object-cover"
              />
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-semibold text-white">No Live Classes</h2>
              </div>
            </GlowCard>
          )}

          {additionalResources?.data?.length > 0 && (
            <Link href={`/courses/important-topics`} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden flex-shrink-0">
                  <Image
                    src={"/images/resource.png"}
                    alt={"important"}
                    width={400}
                    priority
                    height={300}
                    className="w-full h-64 md:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Effect Border */}
                  <div
                    className="absolute inset-0 border-4 border-transparent group-hover:border-[#62C1BF] transition-all duration-300 rounded-t-2xl"
                    style={{ borderColor: "transparent" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#62C1BF"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent"
                    }}
                  />
                </div>

                {/* Title */}
                <div className="p-6 flex-grow flex items-center justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#62C1BF] transition-colors duration-300 text-center">
                    Important Resource
                  </h3>
                </div>
              </div>
            </Link>
          )}


          {courses?.data?.map((course: Course) => (
            <Link href={`/courses/${course.id}`} key={course.id} title={course.name} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden flex-shrink-0">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.name}
                    width={400}
                    priority
                    height={300}
                    className="w-full h-64 md:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Effect Border */}
                  <div
                    className="absolute inset-0 border-4 border-transparent group-hover:border-[#62C1BF] transition-all duration-300 rounded-t-2xl"
                    style={{ borderColor: "transparent" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#62C1BF"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent"
                    }}
                  />
                </div>

                {/* Title */}
                <div className="p-6 flex-grow flex items-center justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#62C1BF] transition-colors duration-300 text-center">
                    {course.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}