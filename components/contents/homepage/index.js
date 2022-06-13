import { Col, Row } from "antd";
import MainCardPeopleList from "components/libs/card-people-list";
import { useUsers } from "hooks/user";

function MainContentsHomepage() {
  //? ============== User Hook ============= ?//
  const { data: userData } = useUsers({ queryString: "" });
  // * ====================================== * //

  return (
    <>
      <Col>
        <h1>Glints People</h1>
      </Col>
      <Row gutter={[16, 16]}>
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
                />
              </Col>
            );
          })}
      </Row>
    </>
  );
}

export default MainContentsHomepage;
