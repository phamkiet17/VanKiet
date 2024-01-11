import React from "react";
import Button from "../../components/Button";
import { message } from "antd";

export default function HeroSection({
    title, name, startDate, duration, tags, orderLink, teacherInfo = {}, price
}) {

    const _onCopyLink = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        message.success("Da copy duong dan khoa hoc nay");
    }
  console.log('title', title)
  
  console.log('tags', tags)

  return (
    <section className="hero herodetail">
      <div className="hero__content">
        <div className="container">
                  <h3 className="category label --white">KHÓA HỌC</h3>
          <h2 className="title --white">{title || ""}</h2>
          <div className="infor">
            <div className="infor__item">
              <label className="label --white">Khai giảng</label>
              <p className="title --t3 --white">{startDate || ""}</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Thời lượng</label>
              <p className="title --t3 --white">{duration || "--"} Buổi</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Hình thức</label>
              <p className="title --t3 --white">{tags?.join("-") || ""}</p>
            </div>
          </div>
          {/* Chưa đăng ký */}
          <Button
            link={orderLink}
            className="btn btn--primary btn-regcourse"
          >
            Đăng ký
          </Button>
          {/* Đã đăng ký */}
          {/* <div class="btn btn--primary btn-regcourse --disable">Đã đăng ký</div> */}
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          <a href className="user">
            <div className="user__img">
              <img
                src="https://cfdcircle.vn/files/avatars/480x480/VAOXpQdhq3yNvBMQlDItAYKU29ZO0gsxPTxdryL5.jpg"
                alt="Avatar teacher"
              />
            </div>
            <p className="user__name --white">Trần Nghĩa</p>
          </a>
          <div className="pricebox">
            <p className="title --t3 --white">14.700.000 VND</p>
          </div>
          <a
            href="https://www.facebook.com/sharer/sharer.php?sdk=joey&u=https://cfdcircle.vn/khoa-hoc/khoa-hoc-lap-trinh-frontend-master-30&display=popup&ref=plugin&src=share_button"
            onclick="return !window.open(this.href, 'Facebook', 'width=640,height=580')"
                      className="sharebox s--white"
                      onClick={_onCopyLink}
          >
            Chia sẻ
            <i>
              <img
                src="https://cfdcircle.vn/img/iconshare.svg"
                alt="CFD Circle"
              />
            </i>
          </a>
        </div>
      </div>
      <div className="hero__background">
        <img
          className="hero__background-img"
          src="https://cfdcircle.vn/files/thumbnails/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
          alt="CFD Circle"
        />
      </div>
    </section>
  );
}
