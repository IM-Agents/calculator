# TypeScript App & Package Templates

## TypeScript Library Package (`packages/ui`, `packages/utils`, etc.)

### `packages/ui/package.json`
```json
{
  "name": "@repo/ui",
  "version": "0.0.1",
  "private": true,
  "main":    "./dist/index.js",
  "module":  "./dist/index.mjs",
  "types":   "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types":   "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev":   "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint":  "eslint src/",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

### `packages/ui/tsconfig.json`
```json
{
  "extends": "@repo/config/tsconfig.react.json",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### `packages/ui/src/index.ts`
```ts
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";
```

### `packages/ui/src/components/Button.tsx`
```tsx
import React from "react";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
```

---

## TypeScript Node App (`apps/api`)

### `apps/api/package.json`
```json
{
  "name": "api",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev":   "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "lint":  "eslint src/",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@repo/utils": "*",
    "express": "^4.18.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

### `apps/api/tsconfig.json`
```json
{
  "extends": "@repo/config/tsconfig.node.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## TypeScript Next.js App (`apps/web`)

### `apps/web/package.json`
```json
{
  "name": "web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev":   "next dev --port 3000",
    "start": "next start",
    "lint":  "next lint",
    "clean": "rm -rf .next"
  },
  "dependencies": {
    "@repo/ui":    "*",
    "@repo/utils": "*",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/node":  "^20.0.0",
    "typescript":   "^5.0.0"
  }
}
```

### `apps/web/tsconfig.json`
```json
{
  "extends": "@repo/config/tsconfig.react.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "@repo/ui/*":    ["../../packages/ui/src/*"],
      "@repo/utils/*": ["../../packages/utils/src/*"]
    }
  },
  "include": ["src", "next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## Shared Config Package (`packages/config`)

### `packages/config/package.json`
```json
{
  "name": "@repo/config",
  "version": "0.0.1",
  "private": true,
  "exports": {
    "./tsconfig.base.json":  "./tsconfig.base.json",
    "./tsconfig.react.json": "./tsconfig.react.json",
    "./tsconfig.node.json":  "./tsconfig.node.json"
  }
}
```

### `packages/config/tsconfig.base.json`
```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

### `packages/config/tsconfig.react.json`
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "es2017"
  }
}
```

### `packages/config/tsconfig.node.json`
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "lib": ["es2022"],
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es2022"
  }
}
```

---

## Shared Types Package (`packages/types`)

### `packages/types/package.json`
```json
{
  "name": "@repo/types",
  "version": "0.0.1",
  "private": true,
  "main":  "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint":  "tsc --noEmit",
    "clean": "echo no build needed"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```
> Types-only packages can skip the build step — consumers import the `.ts` source directly.

### `packages/types/src/index.ts`
```ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}
```

---

## `.d.ts` Declaration Files

For packages where you ship pre-compiled JS but want full type information:

```
packages/utils/
├── src/
│   └── index.ts      ← source
├── dist/
│   ├── index.js      ← compiled output (gitignored)
│   ├── index.mjs     ← ESM output (gitignored)
│   └── index.d.ts    ← generated declarations (gitignored)
└── tsup.config.ts
```

### `packages/utils/tsup.config.ts`
```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry:       ["src/index.ts"],
  format:      ["cjs", "esm"],
  dts:         true,
  sourcemap:   true,
  clean:       true,
  splitting:   false,
  treeshake:   true,
});
```
