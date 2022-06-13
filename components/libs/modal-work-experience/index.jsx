import moment from "moment";
import { useState } from "react";
import propTypes from "prop-types";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
} from "antd";

// Styles
import s from "./index.module.scss";

function ModalWorkExperience(props) {
  const { visible, setVisible, onSubmit, userId } = props;

  //? ============== Handle Company Image ============= ?//
  const [companyLogo, setCompanyLogo] = useState("");
  const handleChangeCompanyLogo = (value) => {
    setCompanyLogo(value);
  };
  // * ====================================== * //

  //? ============== Handle Present ============= ?//
  const [isPresent, setIsPresent] = useState(false);
  // * ====================================== * //

  //? ============== Handle Submit ============= ?//
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const submission = {
        company: value.company_name,
        companyLogo: value.company_logo,
        jobTitle: value.job_title,
        jobDescription: value.job_description,
        startDate: moment(value.start_date),
        endDate: value.end_date ? moment(value.end_date) : null,
        isPresent: value.is_present,
        userId: userId,
      };
      onSubmit(submission);
      setVisible();
    });
  };
  // * ====================================== * //

  return (
    <>
      <Modal
        footer={false}
        visible={visible}
        onCancel={setVisible}
        title={"Add Work Experience"}
      >
        <Col className={s.imageContainer}>
          <Image
            src={companyLogo ? companyLogo : "/images/profile-default.png"}
            alt=""
          />
        </Col>
        <Form layout="vertical" form={form}>
          <Form.Item
            label={"Company Logo"}
            name="company_logo"
            rules={[
              {
                required: true,
                message: "Please input your company url logo here",
                type: "url",
              },
            ]}
          >
            <Input
              placeholder="Input company logo url here"
              onChange={(e) => handleChangeCompanyLogo(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name={"company_name"}
            label={"Company Name"}
            rules={[
              {
                required: true,
                message: "Please input your company name here",
              },
            ]}
          >
            <Input placeholder="Input company name here" />
          </Form.Item>
          <Form.Item
            name={"job_title"}
            label="Job Title"
            rules={[
              { required: true, message: "Please input your job title here" },
            ]}
          >
            <Input placeholder="Input job title here" />
          </Form.Item>
          <Form.Item
            name={"job_description"}
            label="Job Description"
            rules={[
              {
                required: true,
                message: "Please input your job description here",
              },
            ]}
          >
            <Input.TextArea placeholder="Input job title here" />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name={"start_date"}
            rules={[
              { required: true, message: "Please input your start date" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Row gutter={[16, 0]}>
            <Col>
              <Form.Item
                label="End Date"
                name={"end_date"}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (moment(value).isAfter(getFieldValue("start_date"))) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Please make sure your end date!")
                      );
                    },
                  }),
                ]}
              >
                <DatePicker disabled={isPresent} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label=" " name={"is_present"} valuePropName="checked">
                <Checkbox onChange={(e) => setIsPresent(e.target.checked)}>
                  Present
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Col className={s.saveBtn} span={24}>
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Col>
      </Modal>
    </>
  );
}

ModalWorkExperience.propTypes = {
  visible: propTypes.bool,
  setVisible: propTypes.func,
  onSubmit: propTypes.func,
  userId: propTypes.number,
};

export default ModalWorkExperience;
