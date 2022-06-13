// Libs
import moment from "moment";
import propTypes from "prop-types";
import { Col, Image, Row } from "antd";

// Styles
import s from "./index.module.scss";

function MainWorkExperienceListItem(props) {
  const { title, company, logo, startDate, endDate, present, description } =
    props;
  return (
    <>
      <Row gutter={[16, 0]}>
        <Col span={3}>
          <Image src={logo ? logo : "/images/profile-default.png"} alt="" />
        </Col>
        <Col span={12} className={s.detailsContainer}>
          <h1>{title}</h1>
          <p>{company}</p>
          <p>
            {moment(startDate).format("DD MMMM YYYY")} -{" "}
            {present ? "Present" : moment(endDate).format("DD MMMM YYYY")}
          </p>
          <p className={s.description}>Job description : {description}</p>
        </Col>
      </Row>
    </>
  );
}

MainWorkExperienceListItem.propTypes = {
  title: propTypes.string,
  company: propTypes.string,
  logo: propTypes.string,
  startDate: propTypes.string,
  endDate: propTypes.string,
  present: propTypes.bool,
  description: propTypes.string,
};

export default MainWorkExperienceListItem;
