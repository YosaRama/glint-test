import MainContentsOtherProfile from "components/contents/other-profile";
import { GET_USER_BY_NAME } from "database/queries/user";

function PeopleProfilePage(props) {
  const { data = null } = props;
  return (
    <>
      <MainContentsOtherProfile data={data} />
    </>
  );
}

export default PeopleProfilePage;

export const getServerSideProps = async (ctx) => {
  const currentName = ctx.params.name.replace("-", " ");
  const result = await GET_USER_BY_NAME({ name: currentName });
  const data = JSON.parse(JSON.stringify(result));

  return {
    props: {
      data: data,
    },
  };
};
