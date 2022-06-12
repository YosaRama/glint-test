import { useState } from "react";
import propTypes from "prop-types";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
} from "antd";

// Styles
import s from "./index.module.scss";

function ModalWorkExperience(props) {
  const { visible, setVisible } = props;

  //? ============== Handle Present ============= ?//
  const [isPresent, setIsPresent] = useState(false);
  // * ====================================== * //

  return (
    <>
      <Modal
        footer={false}
        visible={visible}
        onCancel={setVisible}
        title={"Add Work Experience"}
      >
        <Form layout="vertical">
          <Form.Item
            name={"jobTitle"}
            label="Job Title"
            rules={[
              { required: true, message: "Please input your job title here" },
            ]}
          >
            <Input placeholder="Input job title here" />
          </Form.Item>
          <Form.Item
            label={"Company Name"}
            rules={[
              {
                required: true,
                message: "Please input your company name here",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Company Logo"}
            name="companyLogo"
            rules={[
              {
                required: true,
                message: "Please input your company url logo here",
                type: "url",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name={"startDate"}
            rules={[
              { required: true, message: "Please input your start date" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Row gutter={[16, 0]}>
            <Col>
              <Form.Item label="End Date" name={"endDate"}>
                <DatePicker disabled={isPresent} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label=" ">
                <Checkbox onChange={(e) => setIsPresent(e.target.checked)}>
                  Present
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Col className={s.saveBtn} span={24}>
          <Button type="primary">Save</Button>
        </Col>
      </Modal>
    </>
  );
}

ModalWorkExperience.propTypes = {
  visible: propTypes.bool,
  setVisible: propTypes.func,
};

export default ModalWorkExperience;
