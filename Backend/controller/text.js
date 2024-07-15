import { Text } from "../model/text.js";
import { User } from "../model/user.js";
import { sendCookie } from "../utils/sendCookie.js";
import ErrorHandler from "../middleware/errorhandler.js";
import { generateQrCode } from "../utils/qrCode.js";
import { QrCode } from "../model/qrCode.js";
import he from "he";

export const SendText = async (req, res, next) => {
  try {
    const { textData, _id, pass, customUrl } = req.body;
    if (!textData) return next(new ErrorHandler("Please add text!", 400));

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

    const decodedHtml = he.decode(textData);

    let baseQuery = {
      textData: decodedHtml,
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
    const { pass } = req.query;

    if (!pass) return next(new ErrorHandler("Please enter the Password", 400));

    const textData = await Text.find({ pass });

    if (!textData.length)
      return next(new ErrorHandler("Incorrect Password !", 400));

    res.status(200).json({
      success: true,
      textData: textData[0]?.textData,
    });
  } catch (error) {
    next(error);
  }
};

export const getTextDataByCustomUrl = async (req, res, next) => {
  try {
    const { customurl } = req.params;

    if (!customurl) {
      return next(new ErrorHandler("Please Provide CustomUrl"));
    }
    console.log("customUrl :" + customurl);

    const textDataEntry = await Text.findOne({ customUrl: customurl });

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

export const getUserTexts = async (req, res, next) => {
  try {
    const { _id } = req.query;

    console.log(_id);
    if (!_id) {
      return next(new ErrorHandler("Please Provide _id", 400));
    }

    const texts = await Text.find({ user: _id }).populate(
      "qrCode",
      "qrCodeImage"
    );

    if (!texts) {
      return next(new ErrorHandler("Data not found", 404));
    }

    res.status(200).json({
      success: true,
      data: texts,
    });
  } catch (error) {
    next(error);
  }
};
