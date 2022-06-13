// Query
import {
  DELETE_WORK_EXPERIENCE,
  GET_WORK_EXPERIENCE_BY_ID,
  UPDATE_WORK_EXPERIENCE,
} from "database/queries/work-experience";

// Helper
import nextConnect from "next-connect";

const apiHandler = nextConnect();
const messageHead = "work experience";

// GET SINGLE HANDLER
apiHandler.get(async (req, res) => {
  const id = req.query.id;
  try {
    const result = await GET_WORK_EXPERIENCE_BY_ID({ id });
    if (result) {
      res.status(200).json({
        success: true,
        message: `Successfully get single ${messageHead} - ${id}`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Failed get single ${messageHead} - ${id}`,
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
});

// EDIT SINGLE HANDLER
apiHandler.put(async (req, res) => {
  const id = req.query.id;
  try {
    const result = await UPDATE_WORK_EXPERIENCE({ id });
    if (result) {
      res.status(200).json({
        success: true,
        message: `Successfully update ${messageHead} - ${id}`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Failed update ${messageHead} - ${id}`,
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

// DELETE SINGLE HANDLER
apiHandler.delete(async (req, res) => {
  const id = req.query.id;
  try {
    const result = await DELETE_WORK_EXPERIENCE({ id });
    if (result) {
      res.status(200).json({
        success: true,
        message: `Successfully delete ${messageHead} - ${id}`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Failed delete ${messageHead} - ${id}`,
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
