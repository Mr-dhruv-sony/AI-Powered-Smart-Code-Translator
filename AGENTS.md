# Repository Guidelines

## Project Structure & Module Organization
This repository is split into `client/` and `server/`. The frontend lives in `client/src/` with `components/`, `pages/`, `context/`, `services/`, `constants/`, and `styles/`. Static assets are in `client/public/` and `client/src/assets/`. The backend lives in `server/src/` with `config/`, `routes/`, `controllers/`, `services/`, `models/`, `middleware/`, `utils/`, and `constants/`. Root-level `assets/` contains README screenshots, not runtime code.

## Build, Test, and Development Commands
Run commands from the relevant package directory.

- `cd client && npm install && npm run dev`: start the Vite frontend on localhost.
- `cd client && npm run build`: create the production bundle in `client/dist/`.
- `cd client && npm run lint`: run ESLint for `js` and `jsx` files.
- `cd server && npm install && npm run dev`: start the API with Node watch mode.
- `cd server && npm start`: run the backend without file watching.

## Coding Style & Naming Conventions
The codebase uses ES modules and React function components. Follow the existing style: double quotes, semicolons, and 2-space indentation in frontend and backend files. Use `PascalCase` for React components (`HomePage.jsx`), `camelCase` for functions and variables, and descriptive lower-case filenames for backend modules such as `auth.controller.js` and `translation.service.js`. Keep controllers thin and place business logic in `server/src/services/`.

## Testing Guidelines
There is no automated test suite configured yet. Until one is added, treat `client` linting and manual end-to-end checks as the baseline:

- verify auth flows, code actions, and history behavior locally
- run `cd client && npm run lint` before opening a PR
- include reproduction steps for any bug fix

If you add tests, keep them near the feature or under a dedicated `__tests__/` directory and name them `*.test.js` or `*.test.jsx`.

## Commit & Pull Request Guidelines
Recent history uses short Conventional Commit subjects such as `fix: update CORS for production` and `docs: add live demo links to README`. Continue with prefixes like `feat:`, `fix:`, `docs:`, and `refactor:`. PRs should include a concise summary, linked issue if applicable, local verification steps, and screenshots for UI changes affecting `client/src/pages/` or shared components.

## Security & Configuration Tips
Keep secrets in `.env` files under `client/` and `server/`; never commit API keys, JWT secrets, or OAuth credentials. Validate changes touching CORS, auth middleware, Gemini integration, or MongoDB config before merging.
