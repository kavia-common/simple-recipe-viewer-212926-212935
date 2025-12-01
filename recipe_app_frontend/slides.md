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

# Open Recipe Components Demo

<div class="split-cols">
  <div class="left">
    <div class="eyebrow">Recipe List</div>
    <!-- The list emits 'select'; we bind selectedId on this page via v-model-like pattern using an inline component state. -->
    <DemoOpenRecipePage />
  </div>
</div>

<!-- This inline SFC defines a tiny orchestrator to wire list + details on one slide -->
<script setup>
import { ref } from 'vue'
import OpenRecipeList from './components/OpenRecipeList.vue'
import OpenRecipeDetails from './components/OpenRecipeDetails.vue'

const selectedId = ref(null)
const lastLoaded = ref([])

function onSelect(id) {
  selectedId.value = id
}
function onLoaded(items) {
  lastLoaded.value = items
}
</script>

<template #default="{ }">
  <div class="split-cols">
    <div class="left">
      <OpenRecipeList @select="onSelect" @loaded="onLoaded" />
    </div>
    <div class="right">
      <div class="eyebrow">Details</div>
      <OpenRecipeDetails :id="selectedId" :recipe="lastLoaded.find?.(r => r.id === selectedId)"/>
    </div>
  </div>
</template>

<!-- Workaround wrapper so Slidev renders the above orchestrated template -->
<script setup>
import { defineComponent, h } from 'vue'
import OpenRecipeList from './components/OpenRecipeList.vue'
import OpenRecipeDetails from './components/OpenRecipeDetails.vue'

const _state = { selectedId: null, items: [] }

export default defineComponent({
  name: 'DemoOpenRecipePage',
  setup() {
    return () => h('div', { class: 'split-cols' }, [
      h('div', { class: 'left' }, [
        h('div', { class: 'eyebrow' }, 'List'),
        h(OpenRecipeList, {
          onSelect: (id) => { _state.selectedId = id },
          onLoaded: (items) => { _state.items = items },
        }),
      ]),
      h('div', { class: 'right' }, [
        h('div', { class: 'eyebrow' }, 'Details'),
        h(OpenRecipeDetails, {
          id: _state.selectedId,
          recipe: _state.items.find?.(r => r.id === _state.selectedId),
        }),
      ]),
    ])
  },
})
</script>

---

layout: center
class: text-center
---

# Thank You

Enjoy cooking!

<div class="mt-4 subtle">Works out-of-the-box with local mock data. Set VITE_API_BASE to use an API.</div>
