async function userLogOut(req, res) {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    res.clearCookie("token", tokenOption);
    res.json({
      message: "Logged Out Successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogOut;
