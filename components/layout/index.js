// Libs
import { Layout } from "antd";
import ModalLogin from "components/libs/modal-login";

// Components
import MainContainer from "../container";
import MainHeader from "./header";

// Styles
import s from "./index.module.scss";

const { Content, Footer } = Layout;

function MainLayout(props) {
  const { children } = props;
  return (
    <>
      <Layout>
        <MainHeader />
        <MainContainer>
          <Content className={s.content}>{children}</Content>
        </MainContainer>
        <Footer>Footer</Footer>
      </Layout>

      <ModalLogin />
    </>
  );
}

export default MainLayout;
