// Query
import {
  CREATE_WORK_EXPERIENCE,
  GET_WORK_EXPERIENCE_BY_ID,
} from "database/queries/work-experience";

// Helper
import nextConnect from "next-connect";

const apiHandler = nextConnect();
const messageHead = "work experience";

// GET HANDLER
apiHandler.get(async (req, res) => {
  try {
    const result = await GET_WORK_EXPERIENCE_BY_ID();
    if (result) {
      res.status(200).json({
        success: true,
        message: `Successfully get ${messageHead}`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Failed get ${messageHead}`,
        data: result,
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
});

// POST HANDLER
apiHandler.post(async (req, res) => {
  const data = req.body;
  try {
    const result = await CREATE_WORK_EXPERIENCE(data);
    if (result) {
      res.status(200).json({
        success: true,
        message: `Successfully create ${messageHead}`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Failed create ${messageHead}`,
        data: result,
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
});

export default apiHandler;
