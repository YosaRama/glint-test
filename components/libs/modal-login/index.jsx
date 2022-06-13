import { useState } from "react";
import propTypes from "prop-types";
import { Button, Form, Input, Modal } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function ModalLogin(props) {
  const { visible, setVisible } = props;
  const router = useRouter();

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
        });
        if (!result.error) {
          setVisible();
          router.push("/profile");
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
            rules={[
              () => ({
                validator(_, value) {
                  const nameValidation = new RegExp(/^[a-zA-z\s]*$/);
                  if (nameValidation.test(value)) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "Please insert a good name just with letters and space"
                    )
                  );
                },
              }),
            ]}
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
