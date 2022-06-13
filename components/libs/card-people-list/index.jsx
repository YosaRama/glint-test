// Libs
import propTypes from "prop-types";
import { Card, Col, Image, Row, Tag } from "antd";

// Styles
import s from "./index.module.scss";
import Link from "next/link";

function MainCardPeopleList(props) {
  const { name, age, profile, status } = props;
  const slug = name.replace(" ", "-");
  return (
    <>
      <Link href={`/${slug}`}>
        <a>
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
                <Tag color={status ? "blue" : "default"}>
                  {status ? "PUBLIC" : "PRIVATE"}
                </Tag>
              </Col>
            </Row>
          </Card>
        </a>
      </Link>
    </>
  );
}

MainCardPeopleList.propTypes = {
  name: propTypes.string,
  age: propTypes.number,
  profile: propTypes.string,
  status: propTypes.bool,
};

export default MainCardPeopleList;
