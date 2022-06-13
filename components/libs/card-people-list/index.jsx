// Libs
import propTypes from "prop-types";
import { Card, Col, Image, Row } from "antd";

// Styles
import s from "./index.module.scss";

function MainCardPeopleList(props) {
  const { name, age, profile } = props;
  return (
    <>
      <Card>
        <Row gutter={[32, 0]}>
          <Col className={s.imageContainer} span={6}>
            <Image
              preview={false}
              alt=""
              src={profile ? profile : "/images/profile-default.png"}
            />
          </Col>
          <Col className={s.details}>
            <h1>Name : {name || "-"}</h1>
            <p>Age : {age || "-"}</p>
          </Col>
        </Row>
      </Card>
    </>
  );
}

MainCardPeopleList.propTypes = {
  name: propTypes.string,
  age: propTypes.number,
  profile: propTypes.string,
};

export default MainCardPeopleList;
