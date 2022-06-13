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
  Row,
  Switch,
} from "antd";

// Styles
import s from "./index.module.scss";
import MainWorkExperienceListItem from "components/libs/work-experience-list-item";
import ModalWorkExperience from "components/libs/modal-work-experience";
import { useUser } from "hooks/user";
import { useExperience, useExperiences } from "hooks/work-experience";

function MainContentsProfile(props) {
  const { user } = props;
  const [profileImg, setProfileImg] = useState("");

  //? ============== Handle Experience Modal ============= ?//
  const [experienceModal, setExperienceModal] = useState(false);
  const handleExperienceModal = () => {
    setExperienceModal(!experienceModal);
  };
  // * ====================================== * //

  //? ============== User Details Hook ============= ?//
  const {
    data,
    onEdit,
    onMutate: mutateUser,
  } = useUser({ singleId: user?.id || "" });
  // * ====================================== * //

  //? ============== Experience Details Hook ============= ?//
  const { onAdd: addExperience } = useExperiences({ queryString: "" });
  // * ====================================== * //

  //? ============== Handle Initial Profile Image ============= ?//
  useEffect(() => {
    setProfileImg(data?.profile_img);
  }, [data]);
  // * ====================================== * //

  //? ============== Handle Edit General Information ============= ?//
  const [form] = Form.useForm();
  const handleEdit = () => {
    form.validateFields().then((value) => {
      const submission = {
        name: value.name,
        age: value.age,
        profileImg: value.profile_img,
        isPublic: value.is_public,
      };
      onEdit(submission);
    });
  };
  // * ====================================== * //

  //? ============== Handle Add Experience ============= ?//
  const handleAddExperience = (data) => {
    addExperience(data);
    mutateUser();
  };
  // * ====================================== * //

  return (
    <>
      <Card>
        {data && (
          <Row>
            <Col span={8} className={s.profileImgContainer}>
              <Image
                src={
                  profileImg ? `${profileImg}` : "/images/profile-default.png"
                }
                alt="profile"
              />
            </Col>
            <Col span={1} />
            <Col span={13}>
              <Divider type="horizontal" orientation="left">
                GENERAL INFORMATION
              </Divider>
              <Form layout="vertical" initialValues={data} form={form}>
                <Form.Item
                  name={"name"}
                  label="Name"
                  rules={[
                    { required: true, message: "Please input your name" },
                  ]}
                >
                  <Input placeholder="input name here" />
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
                  />
                </Form.Item>
                <Form.Item
                  name={"age"}
                  label="Age"
                  rules={[
                    {
                      type: "number",
                      required: true,
                      message: "Please input your age",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="input age here"
                    style={{ width: "20%" }}
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
                  />
                </Form.Item>
              </Form>
              <Col className={s.saveBtn}>
                <Button type="primary" onClick={handleEdit}>
                  Save Profile
                </Button>
              </Col>
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
                      />
                    </Col>
                  );
                })}
              {data?.WorkExperience?.length == 0 && (
                <Empty description="No Work Experience" />
              )}

              <Col span={24} className={s.addExperienceBtn}>
                <Button type="primary" onClick={handleExperienceModal}>
                  + Add Work Experience
                </Button>
              </Col>
            </Col>
          </Row>
        )}
      </Card>
      <ModalWorkExperience
        visible={experienceModal}
        setVisible={handleExperienceModal}
        onSubmit={handleAddExperience}
        userId={+user.id}
      />
    </>
  );
}

MainContentsProfile.propTypes = {
  user: propTypes.any,
};

export default MainContentsProfile;
