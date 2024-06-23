// Create Token and saving in header

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  // console.log("Token", token)
  header = res.setHeader('Authorization', `${token}`);
  // res.setHeader('Set-Cookie', `token=${token}`);

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // console.log(options)

  res.status(statusCode).header("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;