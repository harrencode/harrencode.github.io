/**
 * Local ESLint plugin: architecture enforcement rules.
 *
 * Rules
 * ─────
 * http-layer-isolation
 *   `useMutationHttpRequest` and `useQueryHttpRequest` may ONLY be called
 *   from *.use-case.ts files.  All other files must go through a use-case.
 *
 * single-export-mutation
 *   Each *.mutation.ts file must export exactly ONE function/arrow-function.
 *   This enforces the "one mutation per file" convention.
 *
 * single-export-use-case
 *   Each *.use-case.ts file must export exactly ONE hook (function whose name
 *   starts with "use").  This enforces the "one use-case per file" convention.
 *
 * no-direct-datasource-in-component
 *   DataSource classes / hooks (files ending in .datasource.ts) must not be
 *   imported directly inside React component files (*.tsx).  All data access
 *   must go through the domain / use-case layer.
 */

const HTTP_HOOKS = ['useMutationHttpRequest', 'useQueryHttpRequest'];

/** Return true when `filename` ends with any of the given suffixes. */
function endsWith(filename, ...suffixes) {
  return suffixes.some((s) => filename.endsWith(s));
}

// ─── http-layer-isolation ─────────────────────────────────────────────────────

const httpLayerIsolation = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'useMutationHttpRequest and useQueryHttpRequest must only be called from *.use-case.ts files.',
    },
    messages: {
      forbidden:
        "'{{name}}' must only be called from a *.use-case.ts file. " +
        'Create a dedicated use-case that wraps this HTTP call.',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();

    // Allowed: use-case files and the datasource implementations themselves
    if (endsWith(filename, '.use-case.ts', '.datasource.ts')) return {};

    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          HTTP_HOOKS.includes(node.callee.name)
        ) {
          context.report({
            node,
            messageId: 'forbidden',
            data: { name: node.callee.name },
          });
        }
      },
    };
  },
};

// ─── single-export-mutation ───────────────────────────────────────────────────

const singleExportMutation = {
  meta: {
    type: 'suggestion',
    docs: {
      description: '*.mutation.ts files must export exactly one function.',
    },
    messages: {
      tooMany:
        '*.mutation.ts files must contain exactly one exported function. ' +
        'Split additional mutations into separate files.',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!endsWith(filename, '.mutation.ts')) return {};

    const exports = [];

    return {
      ExportNamedDeclaration(node) {
        exports.push(node);
      },
      ExportDefaultDeclaration(node) {
        exports.push(node);
      },
      'Program:exit'() {
        if (exports.length > 1) {
          context.report({ node: exports[1], messageId: 'tooMany' });
        }
      },
    };
  },
};

// ─── single-export-use-case ───────────────────────────────────────────────────

const singleExportUseCase = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        '*.use-case.ts files must export exactly one hook (function starting with "use").',
    },
    messages: {
      tooMany:
        '*.use-case.ts files must contain exactly one exported use-case hook. ' +
        'Split additional use-cases into separate files.',
      notAHook:
        "The exported function '{{name}}' in a *.use-case.ts file must start with 'use'.",
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!endsWith(filename, '.use-case.ts')) return {};

    const hooks = [];

    function checkExport(node, name) {
      if (!name) return;
      if (!name.startsWith('use')) {
        context.report({ node, messageId: 'notAHook', data: { name } });
        return;
      }
      hooks.push(node);
      if (hooks.length > 1) {
        context.report({ node, messageId: 'tooMany' });
      }
    }

    return {
      ExportNamedDeclaration(node) {
        if (!node.declaration) return;
        const decl = node.declaration;
        if (
          decl.type === 'FunctionDeclaration' ||
          decl.type === 'TSDeclareFunction'
        ) {
          checkExport(node, decl.id?.name);
        } else if (decl.type === 'VariableDeclaration') {
          for (const v of decl.declarations) {
            if (v.id?.type === 'Identifier') checkExport(node, v.id.name);
          }
        }
      },
    };
  },
};

// ─── no-direct-datasource-in-component ───────────────────────────────────────

const noDirectDatasourceInComponent = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'DataSource files must not be imported directly inside React component files (*.tsx). ' +
        'Access data through a use-case instead.',
    },
    messages: {
      forbidden:
        "Importing '{{source}}' directly in a component file is not allowed. " +
        'Wrap it in a use-case and import the use-case instead.',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!endsWith(filename, '.tsx')) return {};

    return {
      ImportDeclaration(node) {
        const src = node.source.value;
        if (
          typeof src === 'string' &&
          (src.includes('.datasource') || src.includes('/data/http/'))
        ) {
          context.report({
            node,
            messageId: 'forbidden',
            data: { source: src },
          });
        }
      },
    };
  },
};

// ─── Atomic Design Helpers ────────────────────────────────────────────────────

/**
 * Tier levels:  atm (0) → mol (1) → obj (2) → org (3)
 * Lower numbers are more primitive; imports must only flow downward.
 */
const ATOMIC_TIER_LEVEL = { atm: 0, mol: 1, obj: 2, org: 3 };
const ATOMIC_TIER_LABEL = {
  atm: 'atom (atm.*)',
  mol: 'molecule (mol.*)',
  obj: 'organism (obj.*)',
  org: 'page-organism (org.*)',
};

/** Returns the tier key (atm|mol|obj|org) of a source file, or null. */
function getFileTier(filepath) {
  const m = filepath.replace(/\\/g, '/').match(/\/atomic\/(atm|mol|obj|org)\./);
  return m ? m[1] : null;
}

/**
 * Returns the tier key of an import path, or null if not an atomic import.
 *
 * Recognises:
 *   @/atomic/<tier>.<name>      (alias)
 *   ../<tier>.<name>            (relative)
 *   ./<tier>.<name>             (relative, same parent)
 */
function getImportTier(importSrc) {
  const src = importSrc.replace(/\\/g, '/');
  // Alias: @/atomic/<tier>.*
  const alias = src.match(/^@\/atomic\/(atm|mol|obj|org)\./);
  if (alias) return alias[1];
  // Relative: path segment starting with <tier>.
  const rel = src.match(/(?:^|\/)(atm|mol|obj|org)\./);
  if (rel) return rel[1];
  return null;
}

// ─── atomic-folder-naming ─────────────────────────────────────────────────────

const atomicFolderNaming = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Every folder directly under src/atomic/ must be prefixed with " +
        "'atm.', 'mol.', 'obj.', or 'org.'",
    },
    messages: {
      invalidFolder:
        "Atomic folder '{{folder}}' does not follow the naming convention. " +
        "Use 'atm.<name>' (atom), 'mol.<name>' (molecule), 'obj.<name>' (organism), " +
        "or 'org.<name>' (page-organism).",
    },
    schema: [],
  },
  create(context) {
    const filename = (context.filename ?? context.getFilename()).replace(/\\/g, '/');
    const m = filename.match(/\/src\/atomic\/([^/]+)\//);
    if (!m) return {};
    const folder = m[1];
    if (/^(atm|mol|obj|org)\./.test(folder)) return {};
    return {
      Program(node) {
        context.report({ node, messageId: 'invalidFolder', data: { folder } });
      },
    };
  },
};

// ─── atomic-import-hierarchy ─────────────────────────────────────────────────

const atomicImportHierarchy = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce the atomic design import hierarchy: atm → mol → obj → org. ' +
        'A lower-tier component must not import from a higher-tier component.',
    },
    messages: {
      hierarchyViolation:
        "Import hierarchy violation: a {{currentLabel}} cannot import from a {{importLabel}}. " +
        "Allowed flow is: atom → molecule → organism → page-organism.",
    },
    schema: [],
  },
  create(context) {
    const filename = (context.filename ?? context.getFilename()).replace(/\\/g, '/');
    const currentTier = getFileTier(filename);
    if (!currentTier) return {};

    return {
      ImportDeclaration(node) {
        const importTier = getImportTier(node.source.value);
        if (!importTier) return;
        if (ATOMIC_TIER_LEVEL[importTier] > ATOMIC_TIER_LEVEL[currentTier]) {
          context.report({
            node,
            messageId: 'hierarchyViolation',
            data: {
              currentLabel: ATOMIC_TIER_LABEL[currentTier],
              importLabel: ATOMIC_TIER_LABEL[importTier],
            },
          });
        }
      },
    };
  },
};

// ─── atomic-barrel-imports ────────────────────────────────────────────────────

const atomicBarrelImports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Cross-atomic-folder imports must go through the folder's public barrel " +
        "(index.ts), not directly into internal implementation files.",
    },
    messages: {
      bypassBarrel:
        "Do not import internal file '{{internal}}' directly from atomic folder '{{folder}}'. " +
        "Use the public barrel instead: '{{barrel}}'.",
    },
    schema: [],
  },
  create(context) {
    const filename = (context.filename ?? context.getFilename()).replace(/\\/g, '/');
    const currentFolderMatch = filename.match(/\/atomic\/([^/]+)\//);
    const currentFolder = currentFolderMatch ? currentFolderMatch[1] : null;

    return {
      ImportDeclaration(node) {
        const src = node.source.value.replace(/\\/g, '/');
        // Only @/atomic/<folder>/<internal-file> imports are checked
        const m = src.match(/^@\/atomic\/([^/]+)\/(.+)$/);
        if (!m) return;

        const importFolder = m[1];
        const internalPath = m[2];

        // Importing from one's own folder is fine
        if (importFolder === currentFolder) return;

        context.report({
          node,
          messageId: 'bypassBarrel',
          data: {
            internal: internalPath,
            folder: importFolder,
            barrel: `@/atomic/${importFolder}`,
          },
        });
      },
    };
  },
};

// ─── Plugin export ────────────────────────────────────────────────────────────

export default {
  rules: {
    'http-layer-isolation': httpLayerIsolation,
    'single-export-mutation': singleExportMutation,
    'single-export-use-case': singleExportUseCase,
    'no-direct-datasource-in-component': noDirectDatasourceInComponent,
    'atomic-folder-naming': atomicFolderNaming,
    'atomic-import-hierarchy': atomicImportHierarchy,
    'atomic-barrel-imports': atomicBarrelImports,
  },
};
