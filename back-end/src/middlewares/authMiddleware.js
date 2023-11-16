const JWT = require ("jsonwebtoken");
const User = require ('../model/user')

const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  //valdiation
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User",
    });
  }
  const decodeData = JWT.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData._id);
  next();
};
 module.exports = {isAuth}