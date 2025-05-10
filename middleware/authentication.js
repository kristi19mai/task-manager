import { UnauthenticatedError, UnauthorizedError } from "../errors/index.js";
import { isTokenValid } from "../utils/index.js";

const authentication = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError(
      "Authentifizierung ungültig, Ungültige Anmeldedaten"
    );
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentifizierung ungültig");
  }
};
const authorizePermissions = (...rest) => {
  return async function (req, res, next) {
    if (!rest.includes(req.user.role)) {
      throw new UnauthorizedError(
        "Der Zugriff auf diese Route ist nicht autorisiert"
      );
    }
    next();
  };
};
export { authentication, authorizePermissions };
