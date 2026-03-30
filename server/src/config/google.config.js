import { OAuth2Client } from "google-auth-library";

let googleClient = null;

export const verifyGoogleToken = async (credential) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    const error = new Error("GOOGLE_CLIENT_ID is not configured on the server.");
    error.statusCode = 500;
    throw error;
  }

  if (!credential) {
    const error = new Error("Google credential is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!googleClient) {
    googleClient = new OAuth2Client(clientId);
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: clientId,
  });

  const payload = ticket.getPayload();

  if (!payload?.sub || !payload?.email) {
    const error = new Error("Google token payload is incomplete.");
    error.statusCode = 401;
    throw error;
  }

  if (payload.email_verified === false) {
    const error = new Error("Google account email is not verified.");
    error.statusCode = 401;
    throw error;
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
};
