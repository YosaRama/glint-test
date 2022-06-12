import { GET_USER } from "database/queries/user";
import nextConnect from "next-connect";

const apiHandler = nextConnect();

apiHandler.get(async (req, res) => {
  try {
    const result = await GET_USER();
    res.status(200).json({
      success: true,
      message: "Successfully get user",
      data: {
        result: result[0],
        total: result[1],
      },
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something wrong!",
      error: error.message,
    });
  }
});

export default apiHandler;
