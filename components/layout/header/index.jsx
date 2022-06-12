import { useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import ModalLogin from "components/libs/modal-login";
import { signOut, useSession } from "next-auth/react";
const { Header } = Layout;

function MainHeader() {
  const { status: authStatus } = useSession();

  //? ============== Handle Login Modal ============= ?//
  const [showModal, setShowModal] = useState();
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  // * ====================================== * //

  //? ============== Handle Logout ============= ?//
  const handleSignOut = () => {
    signOut();
  };
  // * ====================================== * //

  return (
    <>
      <Header>
        <Row>
          {authStatus === "authenticated" && (
            <Col>
              <Button onClick={handleSignOut}>Logout</Button>
            </Col>
          )}
          {authStatus === "unauthenticated" && (
            <Col>
              <Button onClick={handleShowModal}>Signup / Login</Button>
            </Col>
          )}
        </Row>
      </Header>
      <ModalLogin visible={showModal} setVisible={handleShowModal} />
    </>
  );
}

export default MainHeader;
