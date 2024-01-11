import React, { useEffect } from "react";

export default function HeaderTop({
  id,
  image,
  name,
  teacherInfo = {},
  price,
  orderLink,
}) {
  useEffect(() => {
    function showHeadCourseDetail() {
      let buttonRegister = $(".herodetail .btn");
      if (buttonRegister.length) {
        let headtop = $(".headtop");
        let headProgress = $(".headtop__progress");
        let offsetHead = buttonRegister.offset().top;
        let pageHeight = $(document).height() - $(window).height();
        let scrollTop = $(window).scrollTop(); // y

        let progress = (scrollTop / pageHeight) * 100;

        if (offsetHead <= scrollTop) {
          headtop.addClass("show");
        } else {
          headtop.removeClass("show");
        }
        headProgress.css({
          width: progress + "%",
        });
      }
    }
    function coursePage() {
      if ($(".coursedetailpage").length) {
        showHeadCourseDetail();
        $(window).on("scroll", function () {
          showHeadCourseDetail();
        });
      }
    }
    coursePage();
  }, [id]);

  return (
    <div className="headtop">
      <div className="container-fluid">
        <div className="headtop__left">
          <div className="headtop__left-avatar">
            <img
              src={image}
              alt
            />
          </div>
          <div className="headtop__left-title">
            <h2>
              <strong>Frontend Master</strong>
            </h2>
            <p>Trần Nghĩa</p>
          </div>
        </div>
        <div className="headtop__right">
          <div className="headtop__right-price">
            <strong>14.700.000 VND</strong>
          </div>
          <a
            href="course-order.html"
            className="btn btn--primary btn-regcourse"
          >
            đăng ký học
          </a>
        </div>
      </div>
      <div className="headtop__progress" />
    </div>
  );
}
