"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useCarousel } from "@/hooks/useCarousel"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetCoursesQuery } from "@/state/api"
import CourseCardSearch from "@/components/CourseCardSearch"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton">
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-content">
          <Skeleton className="landin-skeleton__title" />
          <Skeleton className="landin-skeleton__subtitle" />
          <Skeleton className="landin-skeleton__subtitle-secondary" />
          <Skeleton className="landin-skeleton__button" />
        </div>
        <Skeleton className="landin-skeleton__hero-image" />
      </div>
      <div className="landing-skeleton__featured">
        <Skeleton className="skeleton__featured-title" />
        <Skeleton className="skeleton__featured-description" />

        <div className="landing-skeleton__tags">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton key={index} className="landin-skeleton__tag" />
          ))}
        </div>

        <div className="landing-skeleton__courses">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton key={index} className="landin-skeleton__course-card" />
          ))}
        </div>
      </div>
    </div>
  )
}

const Landing = () => {
  const { user } = useUser()
  const currentImage = useCarousel({ totalImages: 3 })
  const { data: courses, isLoading, isError } = useGetCoursesQuery({})

  const router = useRouter()

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`)
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Courses</h1>
          <p className="landing__description">
            This is the list of the courses you can enroll in.
            <br />
            Courses when you need them and want them
          </p>
          <div className="landing__cta">
            <Link href={"/search"}>
              <div className="landing__cta-button">Search for Courses</div>
            </Link>
          </div>
        </div>
        <div className="landing__hero-images">
          {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Hero banner ${index}`}
              fill
              priority={index === currentImage}
              sizes="(max-width:768px) 100vw (max-width:1200px) 50vw, 33vw"
              className={`landing__hero-image ${index === currentImage ? "landing__hero-image--active" : ""}`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          From beginner to advanced, in all industries, we have the right
          courses just for you and prepering your entire journey for learning
          and making the most
        </p>
        <div className="landing__tags">
          {[
            "web development",
            "enterprise IT",
            "react nextjs",
            "backend developer",
            "artificial intelligence",
          ].map((tag) => (
            <span key={tag} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="landing__courses">
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  onClick={() => handleCourseClick(course.courseId)}
                  course={course}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Landing
