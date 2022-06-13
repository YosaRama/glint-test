import MainContentsProfile from "components/contents/profile";
import { getSession, useSession } from "next-auth/react";

function ProfilePage(props) {
  const { user } = props;

  return (
    <>
      <MainContentsProfile user={user} />
    </>
  );
}

export default ProfilePage;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};
