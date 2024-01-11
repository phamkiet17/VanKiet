import React from "react";
import CourseItem from "../../components/CourseItem";
import { Empty } from "antd";

export default function CoursesSection({ courses = [], loading = false }) {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading --center --noline">
          <h2 className="heading__title title --t2">Khoá học đề xuất</h2>
        </div>
        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty
              style={{ margin: "0 auto" }}
              description="Khong con du lieu nao"
            />
          )}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              if (index < 3) {
                return <CourseItem key={course?.id || index} {...course} />;
              }
            })}
        </div>
      </div>
    </section>
  );
}
