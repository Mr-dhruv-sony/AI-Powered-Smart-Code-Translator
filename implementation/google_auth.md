# Google Authentication Implementation

Related plan: [plans/google_auth.md](../plans/google_auth.md)

## Summary
The repository already contained a partial Google sign-in flow. The implementation work completed here focused on hardening the backend, improving frontend behavior, and documenting the setup requirements needed to make the flow usable.

## Completed Work
### Backend
- Updated `server/src/config/google.config.js` to:
  - fail clearly when `GOOGLE_CLIENT_ID` is missing
  - reject empty credentials
  - reject incomplete or unverified Google token payloads
- Updated `server/src/services/auth.service.js` to:
  - look up users by both `googleId` and `email`
  - link an existing email/password account to Google when the email matches
  - prevent conflicting account linkage
- Updated `server/src/app.js` to support multiple allowed frontend origins through `CLIENT_URLS`, so localhost and the deployed frontend can both call the API.

### Frontend
- Updated `client/src/pages/LoginPage.jsx` to show backend Google-auth errors instead of a generic failure message.
- Updated `client/src/main.jsx` to warn when `VITE_GOOGLE_CLIENT_ID` is missing.
- Added a fallback message in the login screen when the Google client ID is not configured.

### Supporting Fixes
- Added `client/src/context/AuthContext.js` and updated imports to satisfy the current ESLint rule set.
- Fixed a stray syntax issue in `server/src/middleware/error.middleware.js`.
- Removed an unused import from `client/vite.config.js`.
- Adjusted `client/src/pages/HistoryPage.jsx` to clear the existing hook/lint warning.
- Updated `README.md` with the required Google OAuth authorized origins.
- Added hosted deployment guidance for `CLIENT_URLS`.

## Verification
- `cd client && npm run lint` passes.
- A server module import check passes.
- Full Google sign-in was not executed here because valid Google OAuth credentials are still required in local `.env` files.

## Remaining Setup
- Add `VITE_GOOGLE_CLIENT_ID` to `client/.env`.
- Add `GOOGLE_CLIENT_ID` to `server/.env`.
- Set `CLIENT_URLS` on the hosted backend, for example:
  - `http://localhost:5173,https://ai-powered-smart-code-translator.vercel.app`
- Configure Google Cloud OAuth origins:
  - `http://localhost:5173`
  - deployed frontend URL
- Manually test:
  - new Google user login
  - existing email/password account linking
  - invalid credential handling
  - logout and session restore
