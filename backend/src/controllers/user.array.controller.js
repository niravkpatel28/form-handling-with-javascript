// when development mode is local

// get data from the database and send it to the users
const Users = [];

const getAllUsers = (req, res) => {
  try {
    res.status(200).json({
      message: "Users fetched successfully",
      data: [...Users],
    });
  } catch (err) {
    console.log("Error =========", err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

const createUser = (req, res) => {
  // assumption
  // email and name are a part of the body
  try {
    const { email, name } = req.body;
    Users.push({ email, name });
    res.status(200).json({
      message: "User created successfully",
      data: { email, name },
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
