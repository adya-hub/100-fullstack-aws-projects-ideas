# Contributing to 100 Full Stack AWS Projects

Thank you for helping improve this portfolio repository. Contributions make the collection stronger for learners and hiring teams worldwide.

## How to contribute

1. **Fork** the repository and create a branch from `main`.
2. **Pick a project** or improve shared docs, CI, or generators under `scripts/`.
3. **Follow existing structure** — do not rename top-level folders without discussion.
4. **Test locally** — `docker compose up` and `npm run build` for affected projects.
5. **Open a pull request** with a clear description and screenshots when UI changes.

## Branch naming

- `feat/project-01-expense-export`
- `fix/intermediate-chat-websocket-auth`
- `docs/deployment-eks-guide`

## Code standards

- **TypeScript** strict mode; no `any` without justification
- **APIs:** Zod validation, consistent error shape `{ error, details? }`
- **Security:** never commit secrets; use `.env.example` only
- **UI:** responsive layouts, accessible contrast, loading and error states
- **Infrastructure:** Terraform fmt; least-privilege IAM comments

## Pull request checklist

- [ ] README updated if behavior or setup changes
- [ ] `architecture.md` updated for structural changes
- [ ] `.env.example` documents new variables
- [ ] OpenAPI updated in `docs/openapi.yaml` when API changes
- [ ] No secrets or personal AWS account IDs in commits

## Reporting issues

Use GitHub Issues with:

- Project path (e.g. `projects/advanced/51-ai-saas-platform`)
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version)

## Code of conduct

Be respectful and constructive. We welcome beginners and senior engineers alike.
