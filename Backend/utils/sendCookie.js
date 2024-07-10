import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  if (!user || !user._id) {
    throw new Error("Invalid user data for cookie creation");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", 
      secure: false,
    })

};
