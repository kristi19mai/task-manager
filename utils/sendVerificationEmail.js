import sendEmail from "./sendEmail.js";

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/api/v1/auth/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Bitte bestätigen Sie Ihre E-Mail, indem Sie auf den folgenden Link klicken: <a href=${verifyEmail}>E-Mail bestätigen</a></p>`;
  return sendEmail({
    to: email,
    subject: "TODO LISTE E-Mail Bestätigung",
    html: `<h4>Hallo ${name}</h4> ${message}`,
  });
};

export default sendVerificationEmail;
