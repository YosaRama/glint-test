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
      job_title: data.jobTitle,
      job_description: data.jobDescription,
      start_date: data.startDate,
      end_date: data.endDate,
      is_present: data.isPresent,
      user: {
        connect: { id: data.userId },
      },
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
      job_title: data.jobTitle,
      job_description: data.jobDescription,
      start_date: data.startDate,
      end_date: data.endDate,
      is_present: data.isPresent,
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
