"use client"

import Loading from "@/components/Loading"
import { useAllCourseQuery } from "@/Redux/feature/categoryVideoSlice"
import Image from "next/image"
import Link from "next/link"

interface Course {
  id: number;
  name: string;
  thumbnail: string;
}

export default function Courses() {

  const {data: courses, isLoading} = useAllCourseQuery(undefined)
  console.log(courses, 'courses')

  if(isLoading){
    return <><Loading /></>
  }

  return (
    <div className="min-h-screen mt-20">
      {/* Header Section */}
      <div className="container mx-auto px-14 py-16">
        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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