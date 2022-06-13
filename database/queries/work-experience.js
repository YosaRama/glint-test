// Libs
import { prisma } from "../connection";

// Set Data Source
const queryFrom = prisma.workExperience;

//? ============== GET QUERY ============= ?//

export const GET_WORK_EXPERIENCE_BY_ID = (id) => {
  return queryFrom.findUnique({ where: { id: +id } });
};

// * ====================================== * //

//? ============== CREATE QUERY ============= ?//

export const CREATE_WORK_EXPERIENCE = (data) => {
  return queryFrom.create({
    data: {
      company: data.company,
      company_logo: data.companyLogo,
      end_date: data.endDate,
      job_description: data.jobDescription,
      job_title: data.jobTitle,
      start_date: data.startDate,
      user_id: data.userId,
    },
  });
};

// * ====================================== * //

//? ============== UPDATE QUERY ============= ?//

export const UPDATE_WORK_EXPERIENCE = (id, data) => {
  return queryFrom.update({
    data: {
      company: data.company,
      company_logo: data.companyLogo,
      end_date: data.endDate,
      job_description: data.jobDescription,
      job_title: data.jobTitle,
      start_date: data.startDate,
      user_id: data.userId,
    },
    where: { id: +id },
  });
};
// ==================================

// * ====================================== * //

//? ============== DELETE QUERY ============= ?//

export const DELETE_WORK_EXPERIENCE = ({ id }) => {
  return queryFrom.delete({ where: { id: +id } });
};
// ==================================

// * ====================================== * //
