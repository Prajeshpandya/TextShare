import { Text } from "../model/text.js";
import { User } from "../model/user.js";
import { sendCookie } from "../utils/sendCookie.js";
import ErrorHandler from "../middleware/errorhandler.js";
import { generateQrCode } from "../utils/qrCode.js";
import { QrCode } from "../model/qrCode.js";

export const SendText = async (req, res, next) => {
  try {
    const { textData, _id, pass, customUrl } = req.body;

    if (!textData) return next(new ErrorHandler("Please add text!", 400));
    if (textData.length < 1)
      return next(new ErrorHandler("Blank text is not allowed!", 400));

    let user;

    if (!_id) {
      user = await User.create({});
      if (!user) {
        return next(new ErrorHandler("User creation failed", 500));
      }
      sendCookie(user, res, "Cookie Sent Successfully", 201);
    } else {
      user = await User.findById(_id);
      if (!user) {
        user = await User.create({});
        sendCookie(user, res, "Cookie Sent Successfully", 201);
      }
    }

    const qrCodeImage = await generateQrCode(textData);

    const qrCode = await QrCode.create({ qrCodeImage });

    let baseQuery = {
      textData,
      user: user._id,
      qrCode: qrCode,
    };

    if (pass) {
      baseQuery.pass = pass;
    }

    if (customUrl) {
      baseQuery.customUrl = customUrl;
    }

    const textDataEntry = await Text.create(baseQuery);

    res.status(200).json({
      success: true,
      message: "Text Added Successfully",
      data: textDataEntry,
      userID: user._id,
    });
  } catch (error) {
    next(error);
  }
};

export const getText = async (req, res, next) => {
  try {
    const { pass } = req.body;

    if (!pass) return new ErrorHandler("Please enter the Password", 400);

    const textData = await Text.findOne({ pass });

    res.status(200).json({
      success: true,
      textData,
    });
  } catch (error) {
    next(error);
  }
};

export const getTextDataByCustomUrl = async (req, res, next) => {
  try {
    const { customUrl } = req.params;

    const textDataEntry = await Text.findOne({ customUrl });

    if (!textDataEntry) {
      return next(new ErrorHandler("Text not found", 404));
    }

    res.status(200).json({
      success: true,
      data: textDataEntry.textData,
    });
  } catch (error) {
    next(error);
  }
};
