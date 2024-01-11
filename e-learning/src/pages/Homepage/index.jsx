import React, { useEffect, useState } from "react";
import axios from "axios";
import useQuery from "../../hooks/useQuery";
import HeroSection from "./HeroSection ";
import CourseComingSection from "./CourseComingSection ";
import CoursesSection from "./CoursesSection ";
import TeacherSection from "./TeacherSection ";
import FeaturedSection from "./FeaturedSection ";
import TestimonialSection from "./TestimonialSection ";
import GallerySection from "./GallerySection ";
import FaqSection from "./FaqSection";
import CallRegisterSection from "./CallRegisterSection ";
import { courseService } from "../../services/courseService";
import { teamService } from "../../services/teamService";
import { questionService } from "../../services/questionService";
import { galleryService } from "../../services/galleryService";
export default function Homepage() {
  // const [courses, setCourses] = useState([]);
  // const [coursesLoading, setCoursesLoading] = useState(false);

  // const fetchCourses = async () => {
  //   setCoursesLoading(true);
  //   try {
  //     const res = await axios.get(
  //       "https://cfdcourses.cfdcircle.vn/api/v1/courses"
  //     );
  //     console.log("res", res);
  //     if (res?.data) {
  //       setCourses(res.data);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setCoursesLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  const {
    data: coursesData,
    error: coursesError,
    loading: coursesLoading,
  } = useQuery(
    // () => axios.get("https://cfdcourses.cfdcircle.vn/api/v1/courses")
    () => courseService.getCourses()
  );

  const courses = coursesData?.courses || [];
  const comingCourses =
    courses.filter(
      (course) => course.startDate && new Date(course.startDate) > new Date()
    ) || [];
  // console.log("courses", courses);
  // console.log("comingCourses", comingCourses);

  //TEACHER
  const { data: teamsData, loading: teamsLoading } = useQuery(
    teamService.getTeams
  );
  const teams = teamsData?.teams || [];

  //QUESTION
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getQuestions
  );
  const questions = questionsData?.questions || [];
  console.log("questions", questions);

  // GALLERY
  const { data: galleriesData, loading: galleriesLoading } = useQuery(
    galleryService.getGalleries
  );
  const galleries = galleriesData?.galleries?.[0]?.images || [];
  console.log('galleries', galleries)

  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection courses={comingCourses} loading={coursesLoading} />
      <CoursesSection courses={courses} loading={coursesLoading} />
      <TeacherSection teachers={teams} loading={teamsLoading} />
      <FeaturedSection />
      {/* --------------------------------Testimonial-------------------------------- */}
      <TestimonialSection />
      {/* --------------------------------faq-------------------------------- */}
      <FaqSection questions={questions} loading={questionsLoading} />
      <GallerySection galleries={galleries} loading={galleriesLoading} />
      <CallRegisterSection />
    </main>
  );
}
