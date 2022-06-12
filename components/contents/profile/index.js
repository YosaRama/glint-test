import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Switch,
} from "antd";

// Styles
import s from "./index.module.scss";
import MainWorkExperienceListItem from "components/libs/work-experience-list-item";
import ModalWorkExperience from "components/libs/modal-work-experience";

function MainContentsProfile() {
  const [profileImg, setProfileImg] = useState("");

  //? ============== Handle Experience Modal ============= ?//
  const [experienceModal, setExperienceModal] = useState(false);
  const handleExperienceModal = () => {
    setExperienceModal(!experienceModal);
  };
  // * ====================================== * //

  return (
    <>
      <Card>
        <Row>
          <Col span={8} className={s.profileImgContainer}>
            <Image
              src={profileImg ? `${profileImg}` : "/images/profile-default.png"}
              alt="profile"
            />
          </Col>
          <Col span={1} />
          <Col span={13}>
            <Divider type="horizontal" orientation="left">
              GENERAL INFORMATION
            </Divider>
            <Form layout="vertical">
              <Form.Item name={"name"} label="Name">
                <Input placeholder="input name here" />
              </Form.Item>
              <Form.Item
                name={"profileImg"}
                label="Profile Image URL"
                rules={[{ type: "url" }]}
              >
                <Input onChange={(e) => setProfileImg(e.target.value)} />
              </Form.Item>
              <Form.Item name={"age"} label="Age" rules={[{ type: "number" }]}>
                <InputNumber
                  placeholder="input age here"
                  style={{ width: "20%" }}
                />
              </Form.Item>
              <Form.Item
                valuePropName="checked"
                name={"isPrivate"}
                label="Status"
              >
                <Switch checkedChildren="PUBLIC" unCheckedChildren="PRIVATE" />
              </Form.Item>
            </Form>
            <Col className={s.saveBtn}>
              <Button type="primary">Save Profile</Button>
            </Col>
            <Divider type="horizontal" orientation="left">
              WORK EXPERIENCE
            </Divider>
            <Col className={s.workExperience}>
              <MainWorkExperienceListItem />
            </Col>
            <Col>
              <MainWorkExperienceListItem />
            </Col>
            <Col span={24} className={s.addExperienceBtn}>
              <Button type="primary" onClick={handleExperienceModal}>
                + Add Work Experience
              </Button>
            </Col>
          </Col>
        </Row>
      </Card>
      <ModalWorkExperience
        visible={experienceModal}
        setVisible={handleExperienceModal}
      />
    </>
  );
}

export default MainContentsProfile;
