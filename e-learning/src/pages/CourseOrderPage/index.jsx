import React, { useEffect, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/courseService";
import { formatCurrency } from "../../utils/format";
import { ROLES } from "../../constants/role";
import useForm from "../../hooks/useFrom";
import { regrexRule, requireRule } from "../../utils/validate";
import { useAuthContext } from "../../context/AuthContext";
import { message } from "antd";
import PATH from "../../constants/paths";
import Button from "../../components/Button/index";
import { orderService } from "../../services/orderService";

const CourseOrderPage = () => {
  // INFO
  const { courseSlug } = useParams();
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
    courseService.getCourseBySlug
  );

  useEffect(() => {
    if (courseSlug) executeCourseDetail(courseSlug, {});
  }, [courseSlug]);

  const { teams, price, tags } = courseDetailData || {};

  const InfoOrderProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)) || {},
    price: formatCurrency(price),
  };

  //END INFO

  //FORM
  const { profile, courseInfo } = useAuthContext();

  const isAlreadyOrder = courseInfo?.some(
    (item) => item?.course?.slug === courseSlug
  );

  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};
  console.log("profile", profile);

  const { form, register, validate, setForm } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    {
      name: [requireRule("Vui lòng nhập tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requireRule("Vui lòng nhập phone"),
        regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      type: [requireRule("Vui lòng chọn hình thức học")],
    }
  );

  useEffect(() => {
    if (isAlreadyOrder && courseInfo?.length > 0) {
      const orderedCourse = courseInfo?.find(
        (item) => item?.course?.slug === courseSlug
      );
      console.log("orderedCourse", orderedCourse);
      setForm({
        name: orderedCourse.name || "",
        email: orderedCourse.customer.email || "",
        phone: orderedCourse.phone || "",
        type: orderedCourse.type || "",
      });
    } else {
      setForm({
        name: profileName || "",
        email: profileEmail || "",
        phone: profilePhone || "",
        type: "",
      });
    }
  }, [profileName, profileEmail, profilePhone, isAlreadyOrder, courseInfo]);

  //END FORM

  //PAYMENT
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };
  //END PAYMENT

  //ON ORDER
  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );
  const navigate = useNavigate();
  const { handleGetProfileCourse, handleGetProfilePayment } = useAuthContext();

  const _onOrder = () => {
    const profileError = validate();

    if (Object.keys(profileError).length > 0) {
      console.log("Profile form validate failed", profileError);
    } else {
      if (paymentMethod) {
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseDetailData?.id,
          type: form?.type,
          paymentMethod,
        };

        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATH.PROFILE.MY_COURSE);
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn hình thức thanh toán");
      }
    }
  };
  //END ON ORDER

  //XU LY KHOA HOC TON TAI HAI KHONG

  //END

  console.log("courseInfo", courseInfo);
  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder
            register={register}
            types={tags || []}
            disabled={isAlreadyOrder}
          />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            selectedPayment={paymentMethod}
            disabled={isAlreadyOrder}
          />
          <Button
            style={{ width: "100%" }}
            onClick={_onOrder}
            disabled={isAlreadyOrder}
            loading={orderLoading}
          >
            <span>{isAlreadyOrder ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
