import React from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import useDebounce from "../../hooks/useDebounce";
import { Empty, Skeleton } from "antd";
import CourseItem from "../../components/CourseItem";

export default function CoursePage() {
  const { data, loading: apiLoading } = useQuery(courseService.getCourses);
  const courses = data?.courses || [];
  console.log("data", data);
  const loading = useDebounce(apiLoading, 500);

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty
              style={{ margin: "0 auto" }}
              description="Khong con du lieu nao"
            />
          )}
          {loading && Array(4).fill("").map((_, index)=>(
            <div
              key={index}
              className="courses__list-item"
              style={{ height: "50vh" }}>
              <Skeleton />
              <br />
              <Skeleton />

            </div>
          ))}
          {courses.map((course, index) => {
            return <CourseItem key={course?.id || index}  {...course} />
          })}
        </div>
      </div>
    </main>
  );
}
