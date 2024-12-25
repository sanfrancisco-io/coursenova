"use client"

import CourseCardSearch from "@/components/CourseCardSearch"
import Loading from "@/components/Loading"
import { useGetCoursesQuery } from "@/state/api"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import SelectedCourse from "./SelectedCourse"

const Search = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const router = useRouter()

  const { data: courses, isLoading, isError } = useGetCoursesQuery({})

  useEffect(() => {
    if (courses) {
      if (id) {
        const course = courses.find((c) => c.courseId === id)

        setSelectedCourse(course || courses[0])
      } else {
        setSelectedCourse(courses[0])
      }
    }
  }, [courses, id])

  if (isLoading) {
    return <Loading />
  }

  if (isError || !courses) {
    return <div>Failed to fetch course</div>
  }

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    router.push(`/search?id=${course.courseId}`)
  }

  const handleEnrollNow = (courseId: string) => {
    router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">List of available courses</h1>
      <h2 className="search__subtitle">course available</h2>
      <div className="search__content">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="search__courses-grid"
        >
          {courses.map((course) => (
            <CourseCardSearch
              key={course.courseId}
              isSelected={selectedCourse?.courseId === course.courseId}
              onClick={() => handleCourseSelect(course)}
              course={course}
            />
          ))}
        </motion.div>
        {selectedCourse && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="search__selected-course"
          >
            <SelectedCourse
              course={selectedCourse}
              handleEnrollNow={handleEnrollNow}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Search
