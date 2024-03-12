const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { HttpError, ctrlWrapper } = require("../../helpers");

const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(newUser._id, { token });

   res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: token,
      });
};

module.exports = ctrlWrapper(register);
