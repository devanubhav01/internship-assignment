# React Components Practice

Five reusable components — **Header**, **Footer**, **Card**, **Button**, **Form** —
composed together in `App.jsx` to demonstrate dynamic rendering via props and state.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## What to look at

- `src/components/` — each component is self-contained with a props doc-comment at the top.
- `src/App.jsx` — renders a product grid (`Card` + `Button`) from an in-memory array,
  tracks a "cart" in state, and wires up the `Form` component's `onSubmit` callback.
- `Header` keeps track of the active nav link in its own local state.
- `Form` is fully controlled: it validates on submit and shows inline errors.

## Extending it

- Swap the `PRODUCTS` array in `App.jsx` for data from an API.
- Add a `variant` prop to `Card` the same way `Button` already has one.
- Lift `cart` state into a context if you add more pages that need it.
