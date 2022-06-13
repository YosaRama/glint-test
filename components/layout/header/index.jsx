import { useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import ModalLogin from "components/libs/modal-login";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
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
        <Row gutter={[16, 0]}>
          {authStatus === "authenticated" && (
            <>
              <Col>
                <Button onClick={handleSignOut}>Logout</Button>
              </Col>
              <Col>
                <Link href={"/profile"}>
                  <a>
                    <Button>Go To Profile</Button>
                  </a>
                </Link>
              </Col>
            </>
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
