---
name: react-standards
description: Documents React component structure, hooks, state, rendering performance, and bundle practices for org-wide consistency. Use when building or reviewing React apps, SSR/CSR components, or AI-generated UI.
disable-model-invocation: true
---

# React Standards

## 1. Component structure

- **One component per file** for non-trivial UI; colocate tests and styles using team convention (`Component.tsx`, `Component.test.tsx`).
- **Order inside files:** imports → types → constants → component → subcomponents → hooks (if file-local) → helpers.
- **Presentational vs container:** prefer hooks + thin JSX for screens; extract reusable visuals early.

```tsx
type Props = { userId: string; onSignedOut: () => void };

export function UserMenu({ userId, onSignedOut }: Props) {
  const { data, isPending, error } = useUser(userId);
  if (isPending) return <Skeleton />;
  if (error) return <InlineError error={error} />;
  return <Menu user={data} onSignOut={onSignedOut} />;
}
```

## 2. Naming and files

- Components: `PascalCase`. Hooks: `useThing`. Event handlers: `handleSubmit`, `onClick` props mirror DOM convention.
- Files: `PascalCase` for components (`UserMenu.tsx`); `camelCase` for non-component modules.

## 3. State management

- **Local state** for UI-only concerns (open/close, inputs with local validation).
- **Server state** via dedicated clients (TanStack Query, RTK Query, etc.): cache, dedupe, stale times explicit.
- **Global client state** minimized; prefer URL/search params for shareable view state when possible.

## 4. Hooks — rules

- Follow **Rules of Hooks** unconditionally. Custom hooks must start with `use` and return stable shapes (objects: memoize if consumers depend on referential equality).
- **`useEffect`:** synchronize with external systems; avoid fetching in `useEffect` when a query library handles lifecycle—use the library’s API.
- **Dependencies:** exhaustive and honest; no empty deps on effects that use changing values.

```tsx
useEffect(() => {
  const sub = bus.subscribe('tick', onTick);
  return () => sub.unsubscribe();
}, [onTick]);
```

## 5. Rendering performance

- **`memo`/`useMemo`/`useCallback`:** apply when profiling shows benefit or when passing callbacks to heavy memoized children—**not by default**.
- **List virtualization** for long tables/lists (`react-window`, TanStack Virtual).
- **Code splitting:** `React.lazy` + `Suspense` for routes and heavy modals; ensure error boundaries.

```tsx
const ReportPanel = lazy(() => import('./ReportPanel'));

export function Dashboard() {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <ReportPanel />
    </Suspense>
  );
}
```

## 6. Bundle optimization

- **Analyze bundles** (source-map-explorer, vite-bundle-visualizer). Tree-shake ESM dependencies.
- Prefer **platform-aware imports**; avoid importing entire icon sets or lodash monoliths.
- **Images/media:** responsive sources, modern formats; lazy below fold.

## 7. Accessibility and semantics

- Prefer native elements (`button`, `a`, `label`) before ARIA. Keyboard flows and focus management for overlays.
- Test with axe in CI for regressions on critical paths.

## 8. Error boundaries and UX

- Route-level and feature-level **error boundaries**; never blank screens in production.
- **Suspense** boundaries scoped narrowly to avoid full-page flashes.

## 9. Style conventions

- CSS modules, Tailwind, or CSS-in-JS—**pick one per app**. Avoid mixing without isolation strategy.
- **CSS Modules (webpack)**: use `Component.module.css` + `import styles from "./Component.module.css"`. Webpack **must** set `css-loader` `modules.namedExport: false` when on css-loader v7 (see `rules/architecture.mdc` and `skills/architecture/references/react-node-structure.md`). Global styles only in `index.css`.
- Design tokens for color/spacing; no magic numbers scattered in JSX.

## Anti-patterns

- Massive props drilling across 5+ layers—compose or use context sparingly with stable value objects.
- Inline anonymous functions in every render passed to **non-memo** children at scale—measure first, then stabilize.
- Fetching in parent + every child duplicate—centralize queries.

## Cross-references

- JS baseline: [../javascript-advanced/SKILL.md](../javascript-advanced/SKILL.md)
- Reference (layout + examples): [reference/README.md](reference/README.md)
