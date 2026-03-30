# Google Authentication Implementation Plan

## Current State
This repository already contains most of the Google sign-in flow:

- frontend provider in `client/src/main.jsx`
- Google button in `client/src/pages/LoginPage.jsx`
- client API call in `client/src/services/authService.js`
- backend route/controller in `server/src/routes/auth.routes.js` and `server/src/controllers/auth.controller.js`
- token verification in `server/src/config/google.config.js`

The work is mainly to configure it correctly, close edge cases, and verify the full login flow.

## Phase 1: Google Cloud Setup
1. Create or reuse a Google Cloud project.
2. Configure the OAuth consent screen.
3. Create a Web OAuth client.
4. Add allowed JavaScript origins:
   - `http://localhost:5173`
   - production frontend URL
5. Copy the client ID into:
   - `client/.env` as `VITE_GOOGLE_CLIENT_ID`
   - `server/.env` as `GOOGLE_CLIENT_ID`

## Phase 2: Backend Hardening
1. Review `server/src/config/google.config.js` to fail clearly when `GOOGLE_CLIENT_ID` is missing.
2. Update `server/src/services/auth.service.js` so Google login matches users by email as well as `googleId`.
3. Handle account-linking safely:
   - if a password user signs in with the same Google email, attach `googleId` instead of creating conflicts
   - if email mismatch or token verification fails, return `401` or `400`
4. Confirm JWT generation and protected routes continue to work unchanged.

## Phase 3: Frontend Integration Checks
1. Verify `GoogleOAuthProvider` always receives a valid client ID.
2. Improve the Google login error path in `client/src/pages/LoginPage.jsx` to show backend error messages when available.
3. Confirm `AuthContext` stores the JWT and restores the session through `/api/auth/me`.
4. Test redirect behavior after Google sign-in.

## Phase 4: Verification
1. Run the backend and frontend locally:
   - `cd server && npm run dev`
   - `cd client && npm run dev`
2. Test:
   - new Google-only user
   - existing email/password user with the same Google email
   - invalid or expired Google credential
   - logout and reload behavior
3. Run `cd client && npm run lint`.

## Expected Deliverables
- working Google sign-in in local and production environments
- updated `.env` setup instructions in `README.md`
- safer account matching logic in backend auth service
- manual test notes for the login flow
