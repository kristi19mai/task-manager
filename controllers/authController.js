import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import { attachCookie, createUserPayload } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // check if email already exists
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) {
    throw new BadRequestError("E-Mail existiert bereits");
  }
  // first registered user is admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });

  // token
  const payloadUser = createUserPayload(user);
  attachCookie({ res, user: payloadUser });

  res.status(StatusCodes.CREATED).json({ user: payloadUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Geben Sie Ihre Email und Ihres Kennwort");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Ungültige Anmeldedaten");
  }
  const passwordIsValid = await user.comparePassword(password);
  if (!passwordIsValid) {
    throw new UnauthenticatedError("Ungültige Anmeldedaten");
  }
  // token
  const payloadUser = createUserPayload(user);
  attachCookie({ res, user: payloadUser });

  res.status(200).json({ user: payloadUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5000),
  });
  res.status(StatusCodes.OK).json({ msg: "Benutzer abgemeldet" });
};

export { register, login, logout };
