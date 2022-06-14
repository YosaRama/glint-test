import { Col, Row, Spin } from "antd";
import MainCardPeopleList from "components/libs/card-people-list";
import { useUsers } from "hooks/user";

// Styles
import s from "./index.module.scss";

function MainContentsHomepage() {
  //? ============== User Hook ============= ?//
  const { data: userData, loading } = useUsers({ queryString: "" });
  // * ====================================== * //

  return (
    <>
      <Col className={s.title}>
        <h1>Glints People Here</h1>
      </Col>
      <Row gutter={[16, 16]}>
        <Spin spinning={loading}>
          {userData &&
            userData?.map((item, index) => {
              return (
                <Col span={8} key={index}>
                  <MainCardPeopleList
                    name={item.name}
                    age={item.age}
                    profile={
                      item.profile_img
                        ? item.profile_img
                        : "https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg"
                    }
                    status={item.is_public}
                  />
                </Col>
              );
            })}
        </Spin>
      </Row>
    </>
  );
}

export default MainContentsHomepage;
