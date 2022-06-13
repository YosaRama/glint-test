import { prisma } from "../connection";

const queryFrom = prisma.user;

//? ============== Get Queries ============= ?//
export const GET_USER = () => {
  //? Handle Pagination
  return prisma.$transaction([
    queryFrom.findMany({
      //? Handle order
      orderBy: {
        id: "desc",
      },
    }),
    queryFrom.count(),
  ]);
};

export const GET_USER_BY_NAME = ({ name }) => {
  return queryFrom.findUnique({ where: { name: name } });
};

export const GET_USER_BY_ID = ({ id }) => {
  return queryFrom.findUnique({
    include: { WorkExperience: true },
    where: { id: +id },
  });
};

// * ====================================== * //

//? ============== Create Queries ============= ?//
export const CREATE_USER = (data) => {
  return queryFrom.create({
    data: {
      name: data.name,
    },
  });
};
// * ====================================== * //

//? ============== Update Queries ============= ?//
export const UPDATE_USER = (id, data) => {
  return queryFrom.update({
    data: {
      name: data.name,
      age: data.age,
      is_private: data.isPrivate,
      profile_img: data.profileImg,
    },
    where: { id: +id },
  });
};
// * ====================================== * //

//? ============== Delete Queries ============= ?//
export const DELETE_USER = (id) => {
  return queryFrom.delete({ where: { id: +id } });
};
// * ====================================== * //
