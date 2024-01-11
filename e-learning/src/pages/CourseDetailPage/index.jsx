import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { questionService } from "../../services/questionService";
import { courseService } from "../../services/courseService";
import useMutation from "../../hooks/useMutation";
import { ROLES } from "../../constants/role";
import { formatCurrency, formatDate } from "../../utils/format";
import useDebounce from "../../hooks/useDebounce";
import HeroSection from "./HeroSection";
import ContentDetailSection from "./ContentDetailSection";
import FeaturedSection from "./FeaturedSection";
import FaqSection from "./FaqSection";
import CoursesSection from "./CoursesSection";
import HeaderTop from "../../components/HeaderTop";
import PageLoading from "../../components/PageLoading";

export default function CourseDetailPage() {
  const params = useParams();
  const { courseSlug } = params;

  //3. Lay danh sach
  const { data: questionsData, loading: questionLoading } = useQuery(
    questionService.getQuestions
  );

  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourses
  );

  //Lay 1 chi tiet khoa hoc

  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);

  // ???????????????????????????????????????
  console.log("courseDetailData", courseDetailData);

  useEffect(() => {
    if (courseSlug) execute(courseSlug || "", {});
  }, [courseSlug]);

  console.log("params", courseSlug);

  //Modify data
  const questions = questionsData?.questions || [];
  const courses = courseData?.courses || [];
  const orderLink = `/course-order/` + courseSlug;

  const { teams, startDate, price } = courseDetailData || {};

  const modifiedProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };

  const apiLoading = courseDetailLoading || questionLoading || courseLoading;
  const pageLoading = useDebounce(apiLoading, 500);
  if (pageLoading) {
    return <PageLoading/>
  }

  return (
    <>
      <HeaderTop {...modifiedProps}/>
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection {...modifiedProps} />
        <FaqSection {...modifiedProps} />
        <CoursesSection {...modifiedProps} />
      </main>
    </>
  );
}
