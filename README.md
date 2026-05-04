# Frontend Boilerplate

A modern, scalable React/Next.js frontend boilerplate with strict architectural constraints, Atomic Design principles, and comprehensive code quality checks.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Pre-commit Checks](#pre-commit-checks)
- [Architectural Guidelines](#architectural-guidelines)
- [Code Quality Standards](#code-quality-standards)

## 📁 Project Structure

```
frontend-boilerplate/
├── src/
│   ├── atomic/                 # Atomic Design components
│   │   ├── atm.*/             # Atoms (base UI primitives)
│   │   ├── mol.*/             # Molecules (composed from atoms)
│   │   ├── obj.*/             # Organisms (composed from molecules)
│   │   └── org.*/             # Page Organisms (full page sections)
│   ├── app/                    # Next.js app directory
│   │   ├── (admin)/            # Admin section layout
│   │   ├── (auth)/             # Authentication section
│   │   ├── core/               # Core services & providers
│   │   ├── config/             # App configuration
│   │   ├── providers.tsx       # Global providers setup
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── core/                   # Core business logic
│   │   ├── auth.provider.tsx   # Authentication provider
│   │   ├── global-store.service.tsx # Global state management
│   │   ├── config/             # Configuration
│   │   ├── error/              # Error handling
│   │   └── http/               # HTTP client setup
│   ├── data/                   # Data layer (datasources)
│   │   ├── reauthenticator.datasource.ts
│   │   ├── http/               # HTTP datasources
│   │   └── local/              # LocalStorage datasources
│   ├── domain/                 # Domain layer (business rules)
│   │   └── auth/
│   ├── models/                 # Data models & types
│   │   ├── auth.model.ts
│   │   └── common.model.ts
│   ├── store/                  # Zustand state management
│   │   ├── app.store.ts
│   │   └── user.store.ts
│   ├── lib/                    # Utilities & helpers
│   │   ├── queryClient.ts      # React Query client
│   │   └── routes.ts           # Route definitions
│   ├── styles/                 # Global styling
│   ├── __tests__/              # Test files (mirrors src structure)
│   │   ├── components/
│   │   └── unit/
│   └── data/                   # Data layer exports
├── public/                     # Static assets
├── eslint.config.mjs           # ESLint configuration
├── jest.config.ts              # Jest testing configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── .husky/                     # Git hooks (pre-commit checks)
```

## 🔧 Tech Stack

**Frontend Framework:**

- **Next.js** 16.1.3 - React meta-framework with App Router
- **React** 19.2.3 - UI library
- **TypeScript** 5 - Type-safe development

**State Management & Data Fetching:**

- **Zustand** - Lightweight state management
- **React Query (@tanstack/react-query)** 5.90.19 - Server state management
- **Axios** 1.13.2 - HTTP client

**UI & Styling:**

- **Material-UI (@mui/material)** 7.3.7 - Component library
- **Emotion** 11.14 - CSS-in-JS styling
- **MUI Material NextJS** 7.3.7 - Next.js integration

**Utilities:**

- **jwt-decode** - JWT token parsing
- **date-fns** 4.1.0 - Date manipulation
- **lodash** 4.17.21 - Utility functions
- **react-toastify** 11.0.5 - Toast notifications
- **sweetalert2** 11.26.24 - Alert dialogs
- **TypeDI** 0.10.0 - Dependency injection

**Development Tools:**

- **ESLint** 9 - Code linting with custom architectural rules
- **Prettier** 3.8.0 - Code formatting
- **Jest** 30.3.0 - Unit testing
- **Husky** 9.1.7 - Git hooks
- **lint-staged** 16.4.0 - Pre-commit linting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Husky (Git Hooks)**

   ```bash
   npm run prepare
   ```

   This installs the pre-commit hooks that run automated checks before each commit.

4. **Create environment files** (if needed)
   ```bash
   # Create .env.local for environment variables
   touch .env.local
   ```

### Running the Application

**Development Server:**

```bash
npm run dev
```

Starts the Next.js dev server at `http://localhost:3000`

**Production Build:**

```bash
npm run build
npm run start
```

## 📜 Available Scripts

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm run build`         | Build for production                     |
| `npm start`             | Run production server                    |
| `npm run lint`          | Check code with ESLint                   |
| `npm run lint:fix`      | Auto-fix ESLint issues                   |
| `npm run format`        | Format code with Prettier                |
| `npm run format:check`  | Check code formatting                    |
| `npm run type-check`    | Run TypeScript type checking             |
| `npm test`              | Run Jest unit tests                      |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Generate test coverage report            |
| `npm run prepare`       | Setup Husky hooks                        |

## 💡 Development Workflow

### 1. Making Changes

- Write your code following the [Architectural Guidelines](#architectural-guidelines)
- Ensure components are placed in the correct atomic design tier
- Use proper naming conventions

### 2. Local Testing Before Commit

Before committing, you can manually run the checks:

```bash
npm run lint:fix          # Fix linting issues
npm run format            # Format code
npm run type-check        # Check TypeScript
npm test                  # Run tests
npm run build             # Verify build success
```

### 3. Committing Code

```bash
git add <files>
git commit -m "Your commit message"
```

When you commit, Husky automatically runs pre-commit checks (see below).

## 🔒 Pre-commit Checks

The project uses **Husky** with **lint-staged** to run automated checks before every commit. These checks ensure code quality and consistency.

### Pre-commit Workflow

When you run `git commit`, the following checks execute in order:

#### **[0/5] Atomic Folder Structure Validation**

- **Purpose:** Ensures all folders under `src/atomic/` follow the naming convention
- **Valid prefixes:**
  - `atm.` → Atom (base UI primitive)
  - `mol.` → Molecule (composed from atoms)
  - `obj.` → Organism (composed from molecules)
  - `org.` → Page Organism (full page sections)
- **Example valid names:** `atm.button`, `mol.form-field`, `obj.sidebar`, `org.pagecontainer`
- **Failure outcome:** ❌ Commit blocked until folder names are corrected

#### **[1/5] ESLint + Prettier (lint-staged)**

- **Purpose:** Lints and formats only the files you're committing
- **Linting Scope:**
  - TypeScript/TSX files: Full ESLint validation with auto-fix
  - JavaScript/MJS files: ESLint with auto-fix
  - JSON/CSS/Markdown: Prettier formatting only
- **Memory Usage:** Uses 4GB Node heap to handle large projects
- **Auto-fixes:** Unused imports, formatting, spacing, etc.
- **Failure outcome:** ❌ Commit blocked until all linting errors are fixed

#### **[2/5] TypeScript Type Checking**

- **Command:** `tsc --noEmit`
- **Purpose:** Verifies type safety across the entire project
- **Checks:** Type errors, undefined references, incompatibilities
- **Failure outcome:** ❌ Commit blocked until all TypeScript errors are resolved

#### **[3/5] Unit & Integration Tests**

- **Command:** `jest --passWithNoTests`
- **Purpose:** Runs all tests in `src/__tests__/`
- **Behavior:** Passes if no tests exist (allows initial commits)
- **Test files location:** `src/__tests__/` mirror the structure of `src/`
- **Failure outcome:** ❌ Commit blocked until all tests pass

#### **[4/5] Next.js Build Check**

- **Command:** `npm run build`
- **Purpose:** Verifies the application builds without errors
- **Checks:** Page routes, component compilation, configuration validity
- **Output:** Shows last 20 lines of build output
- **Failure outcome:** ❌ Commit blocked if build fails

#### **[5/5] Commit Success**

If all checks pass, you'll see:

```
✅  All checks passed. Proceeding with commit.
```

### What Happens if a Check Fails?

**Example: ESLint fails**

```
❌  lint-staged failed. Fix the errors above before committing.
```

1. Fix the reported issues
2. Stage the corrected files: `git add <files>`
3. Run `git commit` again

**Note:** Most linting issues can be auto-fixed:

```bash
npm run lint:fix    # Fixes ESLint issues
npm run format      # Fixes formatting
```

### Bypassing Pre-commit Hooks (Not Recommended)

If absolutely necessary, you can skip pre-commit checks:

```bash
git commit --no-verify
```

⚠️ **Warning:** This bypasses all quality checks. Only use in emergencies!

## 🏗️ Architectural Guidelines

### Atomic Design Structure

The project strictly enforces Atomic Design principles with ESLint rules:

#### **Atomic Hierarchy** (One-way data flow)

```
Atoms (atm.*)
  ↓
Molecules (mol.*)
  ↓
Organisms (obj.*)
  ↓
Page Organisms (org.*)
```

**Rules:**

- ✅ `atm.button` can only use other atoms
- ✅ `mol.form-field` can use atoms or other molecules
- ✅ `obj.sidebar` can use atoms, molecules, or other organisms
- ✅ `org.pagecontainer` can use anything atomic
- ❌ `atm.button` cannot import from `mol.*`, `obj.*`, or `org.*`
- ❌ `mol.form-field` cannot import from `obj.*` or `org.*`

#### **Barrel Imports**

All cross-atomic imports must go through `index.ts`:

```typescript
// ✅ Correct
import { Button } from "@/atomic/atm.button";

// ❌ Incorrect
import { Button } from "@/atomic/atm.button/base-button.component";
```

Each atomic folder must have an `index.ts` that exports all public APIs.

### Data Flow Architecture

```
Component (src/app/, src/atomic/)
    ↓
Use Case (*.use-case.ts) - React hooks with business logic
    ↓
Datasource (*.datasource.ts) - HTTP calls or storage access
    ↓
Backend API / LocalStorage
```

**Rules:**

- Components must only use `*.use-case.ts` hooks
- Use cases must use `useMutationHttpRequest` or `useQueryHttpRequest`
- Datasources handle actual HTTP/storage operations
- Components cannot directly import datasources

### Naming Conventions

- **Components:** `ComponentName.component.tsx`
- **Use Cases:** `useActionName.use-case.ts`
- **Mutations:** `action.mutation.ts` (single export)
- **Datasources:** `entity.datasource.ts`
- **Models:** `entity.model.ts`
- **Styles:** `component.style.ts` or `component.style.tsx`
- **Services:** `service.ts`
- **Context:** `name.context.ts`
- **Hooks:** `useName.ts` or `useName.tsx`

## 🎯 Code Quality Standards

### ESLint Rules

**General Best Practices:**

- ✅ `const` and `let` only (no `var`)
- ✅ Strict equality (`===`, `!==`)
- ✅ No `console.log()` in production code (warn/error allowed)
- ✅ Explicit typing (no `any`)
- ✅ Type-only imports use `import type` syntax
- ✅ No non-null assertions (`!`)
- ✅ No unused imports or variables

**Architectural Enforcement:**

- ✅ HTTP layer isolation (only in use cases)
- ✅ Single export per mutation/use-case file
- ✅ No direct datasource imports in components
- ✅ Atomic design hierarchy enforcement
- ✅ Barrel import requirements

### TypeScript Configuration

- **Target:** ES2020
- **Strict Mode:** Enabled
- **Module:** ESNext
- **JSX:** React 19

### Testing Standards

- **Framework:** Jest
- **Test Files:** Located in `src/__tests__/` mirroring `src/` structure
- **Required Coverage:** Defined in `jest.config.ts`
- **Run Tests:** `npm test` or `npm run test:watch`

### Code Formatting

- **Formatter:** Prettier
- **Line Width:** 80 characters (default)
- **Quotes:** Double quotes
- **Semicolons:** Always
- **Trailing Commas:** ES5 compatible

## 🔍 Troubleshooting

### Pre-commit Check Fails

**ESLint error during commit:**

```bash
npm run lint:fix
git add .
git commit -m "Your message"
```

**TypeScript error during commit:**

```bash
npm run type-check
# Fix errors shown, then retry commit
```

**Build fails during commit:**

```bash
npm run build
# Fix errors, ensure no pages are broken
git add .
git commit -m "Your message"
```

**Tests fail during commit:**

```bash
npm test
# Fix failing tests
git add .
git commit -m "Your message"
```

### Component Import Issues

**Atomic design hierarchy violation:**

```
Error: atm.button cannot import mol.form-field
```

Solution: Use a lower-tier component or restructure your imports.

**Barrel import violation:**

```
Error: Use barrel imports for cross-atomic references
```

Solution: Import from `index.ts` instead of internal files.

### Build Issues

**Next.js build fails:**

```bash
npm run build
# Check output for specific errors
# Fix identified issues
npm run build  # Retry
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Material-UI Documentation](https://mui.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [ESLint Documentation](https://eslint.org/docs)

## 📝 License

This project is private and proprietary.
