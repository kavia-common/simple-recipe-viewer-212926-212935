---
# Global deck settings
theme: default
title: Simple Recipe Viewer
info: |
  Slidev-based recipe browser with Ocean Professional theme.
class: text-left
mdc: true
transition: slide-left
fonts:
  sans: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial
  mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
css: |
  @import "./style.css";
---

# Simple Recipe Viewer
<div class="title-slide with-hero-glow">
  <div class="hero-copy">
    <div class="pill">Ocean Professional</div>
    <h2 class="text-hero">Browse and view delicious recipes</h2>
    <p class="subtitle text-md">Clean. Modern. Smooth transitions.</p>
    <div class="hero-ctas mt-2">
      <a href="#/2"><button class="btn-primary">Open Recipe Browser</button></a>
      <a href="https://sli.dev" target="_blank"><button class="btn-secondary">About Slidev</button></a>
    </div>
  </div>
</div>

---

# Recipe Browser

<RecipeApp />

---

layout: center
class: text-center
---

# Thank You

Enjoy cooking!

<div class="mt-4 subtle">Works out-of-the-box with local mock data. Set VITE_API_BASE to use an API.</div>
