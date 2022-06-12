import { Col, Image, Row } from "antd";

// Styles
import s from "./index.module.scss";

function MainWorkExperienceListItem() {
  return (
    <>
      <Row gutter={[16, 0]}>
        <Col span={3}>
          <Image src="/images/profile-default.png" alt="" />
        </Col>
        <Col span={12} className={s.detailsContainer}>
          <h1>JOB TITLE</h1>
          <p>Company Name</p>
          <p>start date - end date</p>
          <p className={s.description}>
            Job description : lorem ipsum dolor sit amet
          </p>
        </Col>
      </Row>
    </>
  );
}

export default MainWorkExperienceListItem;
