import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import architecturePlugin from "./eslint-rules/architecture.mjs";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ── Best-practice rules ───────────────────────────────────────────────────
  {
    plugins: { "unused-imports": unusedImports },
    rules: {
      // Disallow console.log in production code (warn/error are allowed)
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Prefer strict equality
      eqeqeq: ["error", "always", { null: "ignore" }],

      // No var; use const/let
      "no-var": "error",
      "prefer-const": "error",

      // Auto-fixable: remove unused imports entirely
      "unused-imports/no-unused-imports": "error",

      // No unused variables (underscore-prefixed are exempt; imports handled above)
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],

      // Disallow `any` — forces explicit typing
      "@typescript-eslint/no-explicit-any": "error",

      // Enforce `import type` for type-only imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // Disallow non-null assertion (!) — handle nullability explicitly
      "@typescript-eslint/no-non-null-assertion": "error",

      // React hooks exhaustive-deps (already in next, kept for clarity)
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // ── Architectural rules ───────────────────────────────────────────────────
  {
    plugins: { local: architecturePlugin },
    rules: {
      // useMutationHttpRequest / useQueryHttpRequest → only from *.use-case.ts
      "local/http-layer-isolation": "error",

      // Each *.mutation.ts may only export ONE mutation function
      "local/single-export-mutation": "error",

      // Each *.use-case.ts may only export ONE use-case hook
      "local/single-export-use-case": "error",

      // Components (*.tsx) must not import datasources directly
      "local/no-direct-datasource-in-component": "error",

      // ── Atomic Design structure enforcement ──────────────────────────────
      // All folders under src/atomic/ must follow atm.|mol.|obj.|org. naming
      "local/atomic-folder-naming": "error",

      // Enforce the one-way data flow: atm → mol → obj → org
      // Lower-tier components must never import from higher-tier components
      "local/atomic-import-hierarchy": "error",

      // Cross-atomic imports must go through the public barrel (index.ts)
      // Never import internal files of another atomic folder directly
      "local/atomic-barrel-imports": "error",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "eslint-rules/**",
  ]),
]);

export default eslintConfig;
