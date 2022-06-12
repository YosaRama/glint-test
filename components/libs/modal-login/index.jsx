import { useState } from "react";
import propTypes from "prop-types";
import { Button, Form, Input, Modal } from "antd";
import { signIn } from "next-auth/react";

function ModalLogin(props) {
  const { visible, setVisible } = props;

  //? ============== Handle Login ============= ?//
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSignIn = () => {
    form.validateFields().then(async (value) => {
      try {
        setLoading(true);
        const result = await signIn("credentials", {
          redirect: false,
          name: value.name,
          callbackUrl: "/profile",
        });
        if (!result.error) {
          setVisible();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  };
  // * ====================================== * //

  return (
    <>
      <Modal
        visible={visible}
        onCancel={setVisible}
        footer={false}
        title="Login"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name={"name"}
            label="Your Name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input placeholder="Input your name!" />
          </Form.Item>
        </Form>
        <Button onClick={handleSignIn} loading={loading}>
          Login / Signup
        </Button>
      </Modal>
    </>
  );
}

ModalLogin.propTypes = {
  visible: propTypes.bool,
  setVisible: propTypes.func,
};

export default ModalLogin;
