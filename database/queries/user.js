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
  return;
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
