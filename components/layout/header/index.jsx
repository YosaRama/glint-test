// Libs
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Layout, Row, Col, Button } from "antd";

// Components
import ModalLogin from "components/libs/modal-login";
const { Header } = Layout;

function MainHeader() {
  const { status: authStatus } = useSession();
  const router = useRouter();

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

  console.log(router.pathname);

  return (
    <>
      <Header>
        <Row gutter={[16, 0]}>
          {authStatus === "authenticated" && (
            <>
              <Col>
                <Button onClick={handleSignOut}>Logout</Button>
              </Col>
              {router.pathname !== "/profile" && (
                <Col>
                  <Link href={"/profile"}>
                    <a>
                      <Button>Go To Profile</Button>
                    </a>
                  </Link>
                </Col>
              )}
              {router.pathname === "/profile" && (
                <Col>
                  <Link href={"/"}>
                    <a>
                      <Button>Go To Homepage</Button>
                    </a>
                  </Link>
                </Col>
              )}
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
