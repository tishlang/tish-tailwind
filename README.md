# tish-tailwind

Tailwind-style utility CSS for Tish projects, written entirely in Tish. **Zero JS dependencies — no `tailwindcss` CLI, no PostCSS, no Autoprefixer.**

Used by [`tish-audio`](https://github.com/tishlang/tish-audio), [`tish-learn`](https://github.com/tishlang/tish-learn), and any other Tish project that wants Tailwind ergonomics without npm bloat.

## What you get

- A curated **utility table** in [`src/utilities.tish`](src/utilities.tish) (~300 utility classes covering layout, flex/grid, sizing, spacing, typography, color, transitions, transforms — the most common ~80% of Tailwind).
- A **preflight stylesheet** in [`src/preflight.css`](src/preflight.css) for sane cross-browser defaults.
- A **scanner + emitter** in [`src/emit.tish`](src/emit.tish): reads your source files, finds which utility class names are referenced, emits a single CSS file containing only those.
- A **`tw()` class-merge helper** for composing classes in JSX.

## Usage

### 1. Install

```json
{
  "dependencies": {
    "@tishlang/tish-tailwind": "latest"
  }
}
```

### 2. Compose classes in JSX

```tish
import { tw } from "tish-tailwind"

fn Button(props) {
  return <button class={tw([
    "px-3 py-2 rounded-lg",
    "bg-primary text-white",
    props.disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
  ])}>
    {props.children}
  </button>
}
```

### 3. Emit the stylesheet at build time

Create a `build-css.tish` script:

```tish
import { emitStylesheet } from "tish-tailwind"

await emitStylesheet({
  sourceFiles: [
    "app/main.tish",
    "app/Header.tish",
    "app/Sidebar.tish",
    "content/page.tishdoc.md"
  ],
  outputPath: "public/learn.css"
})
```

Run it: `tish run --feature fs build-css.tish`

### 4. Wire it into your dev loop

```bash
# justfile
build-css:
    tish run --feature fs build-css.tish

dev: build-css
    tish run --feature fs,http,process dev-server.tish
```

## Why not the official Tailwind CLI?

Two reasons:

1. **No JS dependencies.** A pure-Tish Tailwind keeps `package.json` honest — only Tish-source packages.
2. **Same Tish toolchain everywhere.** `tish run` is already required to build the app; adding the npm Tailwind CLI doubles the toolchain surface.

The tradeoff: this package ships a **curated subset** of Tailwind. If you need a class that's not in [`src/utilities.tish`](src/utilities.tish), add a row to the table and send a PR. The format is dead simple:

```tish
{ cls: "rotate-180", css: `.rotate-180 { transform: rotate(180deg); }` },
```

## Inspiration

Originally written for [`tish-audio`](https://github.com/tishlang/tish-audio); extracted into a shared package so other Tish projects can drop the npm `tailwindcss` dependency.

## License

[PIF](LICENSE)
