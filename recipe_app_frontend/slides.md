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
      <!-- Route to the slide id instead of numeric index to be robust -->
      <a href="#/recipe-browser"><button class="btn-primary">Open Recipe Browser</button></a>
      <a href="https://sli.dev" target="_blank"><button class="btn-secondary">About Slidev</button></a>
    </div>
  </div>
</div>

---

# Recipe Browser
id: recipe-browser
---

<RecipeApp />

---

# Open Recipe Components Demo
id: recipe-components
---

<!-- Define a single inline orchestrator component and render it -->
<script setup>
import { defineComponent, h, reactive } from 'vue'
import OpenRecipeList from './components/OpenRecipeList.vue'
import OpenRecipeDetails from './components/OpenRecipeDetails.vue'

// Use reactive to ensure state updates trigger re-render in Slidev context.
const state = reactive({ selectedId: null, items: [] as any[] })

const DemoOpenRecipePage = defineComponent({
  name: 'DemoOpenRecipePage',
  setup() {
    return () =>
      h('div', { class: 'split-cols' }, [
        h('div', { class: 'left' }, [
          h('div', { class: 'eyebrow' }, 'List'),
          h(OpenRecipeList, {
            onSelect: (id: string) => { state.selectedId = id },
            onLoaded: (items: any[]) => { state.items = items },
          }),
        ]),
        h('div', { class: 'right' }, [
          h('div', { class: 'eyebrow' }, 'Details'),
          h(OpenRecipeDetails, {
            id: state.selectedId as any,
            recipe: state.items.find?.((r: any) => r.id === state.selectedId),
          }),
        ]),
      ])
  },
})
</script>

<DemoOpenRecipePage />

---

layout: center
class: text-center
---

# Thank You

Enjoy cooking!

<div class="mt-4 subtle">Works out-of-the-box with local mock data. Set VITE_API_BASE to use an API.</div>
