// Libs
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  PageHeader,
  Row,
  Switch,
} from "antd";

// Styles
import s from "./index.module.scss";
import MainWorkExperienceListItem from "components/libs/work-experience-list-item";
import { useRouter } from "next/router";
import { LeftOutlined } from "@ant-design/icons";

function MainContentsOtherProfile(props) {
  const { data = null } = props;
  const router = useRouter();

  return (
    <>
      <PageHeader onBack={() => router.back()} title="Back to Homepage" />
      <Card>
        {data && (
          <Row className={!data.is_public && s.privatePage}>
            <Col span={8} className={s.profileImgContainer}>
              <Image
                src={
                  data.profile_img
                    ? `${data.profile_img}`
                    : "/images/profile-default.png"
                }
                alt="profile"
              />
            </Col>
            <Col span={1} />
            <Col span={13}>
              <Divider type="horizontal" orientation="left">
                GENERAL INFORMATION
              </Divider>
              <Form layout="vertical" initialValues={data}>
                <Form.Item
                  name={"name"}
                  label="Name"
                  rules={[
                    { required: true, message: "Please input your name" },
                  ]}
                >
                  <Input placeholder="input name here" disabled />
                </Form.Item>
                <Form.Item
                  name={"profile_img"}
                  label="Profile Image URL"
                  rules={[
                    {
                      type: "url",
                      required: true,
                      message: "Please input correct profile image URL",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setProfileImg(e.target.value)}
                    placeholder="Input your image url here"
                    disabled
                  />
                </Form.Item>
                <Form.Item name={"age"} label="Age">
                  <InputNumber
                    placeholder="input age here"
                    style={{ width: "20%" }}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  valuePropName="checked"
                  name={"is_public"}
                  label="Status"
                >
                  <Switch
                    checkedChildren="PUBLIC"
                    unCheckedChildren="PRIVATE"
                    disabled
                  />
                </Form.Item>
              </Form>
              {data.is_public && (
                <>
                  <Divider type="horizontal" orientation="left">
                    WORK EXPERIENCE
                  </Divider>
                  {data?.WorkExperience?.length != 0 &&
                    data?.WorkExperience.map((item, index) => {
                      return (
                        <Col className={s.workExperience} key={index}>
                          <MainWorkExperienceListItem
                            title={item.job_title}
                            company={item.company}
                            logo={item.company_logo}
                            startDate={item.start_date}
                            endDate={item.end_date}
                            description={item.job_description}
                            present={item.is_present}
                            id={+item.id}
                          />
                        </Col>
                      );
                    })}
                  {data?.WorkExperience?.length == 0 && (
                    <Empty description="No Work Experience" />
                  )}
                </>
              )}
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
}

MainContentsOtherProfile.propTypes = {
  data: propTypes.any,
};

export default MainContentsOtherProfile;
