# Contributing to Designify

Thank you for your interest in contributing! This guide will help you get started.

## 🐛 Reporting Bugs

1. Search [existing issues](../../issues) to avoid duplicates.
2. Open a new issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser / Node.js version
   - Screenshots if applicable

## 💡 Suggesting Features

Open an issue with the `enhancement` label. Describe:
- The problem you're trying to solve
- Your proposed solution
- Alternatives you've considered

## 🔧 Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/designify.git
cd designify

# 2. Create a feature branch
git checkout -b feat/my-feature

# 3. Install dependencies
npm install

# 4. Start dev servers
npm run server   # terminal 1
npm run dev      # terminal 2

# 5. Run tests before committing
npm test

# 6. Commit with a descriptive message
git commit -m "feat: add responsive preview breakpoints"
```

## 📝 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix     | Purpose                        |
|------------|--------------------------------|
| `feat:`    | New feature                    |
| `fix:`     | Bug fix                        |
| `docs:`    | Documentation only             |
| `test:`    | Adding or updating tests       |
| `refactor:`| Code change without fix/feat   |
| `chore:`   | Tooling, deps, CI changes      |

## ✅ Pull Request Checklist

- [ ] Branch is up-to-date with `main`
- [ ] Code compiles without errors (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] New features include tests
- [ ] README updated if public API changed

## 🌱 Good First Issues

Look for issues labeled [`good first issue`](../../labels/good%20first%20issue) — these are curated for newcomers.

## 🙏 Code of Conduct

Be kind, be constructive, be inclusive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
