<script setup lang="ts">
import { defineProps, watch, ref } from 'vue';
import { fetchRecipeById, type Recipe } from '../services/recipes';

const props = defineProps<{
  /** The selected recipe id to load details for. If falsy, shows an empty state. */
  id?: string | null;
  /** Optional preloaded recipe to render immediately while optionally refreshing. */
  recipe?: Recipe;
}>();

const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const item = ref<Recipe | undefined>(props.recipe);

async function load(id: string) {
  try {
    loading.value = true;
    error.value = null;
    const data = await fetchRecipeById(id);
    if (!data) {
      error.value = 'Recipe not found.';
      item.value = undefined;
      return;
    }
    item.value = data;
  } catch (e) {
    error.value = 'Failed to load recipe details.';
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.id,
  (nid) => {
    if (nid) {
      void load(nid);
    } else {
      item.value = undefined;
      error.value = null;
      loading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="ord-surface">
    <div v-if="!id" class="placeholder">
      Select a recipe from the list to see details here.
    </div>

    <div v-else-if="loading" class="ord-status muted" role="status" aria-live="polite">
      Loading details…
    </div>

    <div v-else-if="error" class="ord-error" role="alert">
      {{ error }}
    </div>

    <div v-else-if="item" class="ord-card">
      <div class="ord-header">
        <h3 class="ord-title">{{ item.title }}</h3>
        <span class="pill" aria-label="Time to cook">{{ item.time }}</span>
      </div>

      <div class="ord-hero">
        <img :src="item.image" :alt="item.title" />
      </div>

      <div class="ord-grid">
        <div>
          <div class="eyebrow">Ingredients</div>
          <ul class="points-clean">
            <li v-for="(ing, ix) in item.ingredients" :key="ix">{{ ing }}</li>
          </ul>
        </div>
        <div>
          <div class="eyebrow">Steps</div>
          <ol class="ord-steps">
            <li v-for="(st, sx) in item.steps" :key="sx">{{ st }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ord-surface { display: grid; gap: 14px; }

.placeholder {
  border: 1px dashed var(--line, var(--theme-border-subtle));
  border-radius: 12px;
  padding: 18px;
  text-align: center;
  color: var(--theme-text-secondary);
  background: color-mix(in oklab, var(--theme-bg-elevated) 80%, #0000);
}

.ord-status { color: var(--theme-text-secondary); }
.ord-error {
  color: var(--theme-danger);
  background: color-mix(in oklab, var(--theme-danger) 8%, #000);
  border: 1px solid color-mix(in oklab, var(--theme-danger) 22%, #000);
  padding: 10px 12px;
  border-radius: 10px;
}

.ord-card {
  background: var(--theme-bg-elevated);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 16px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.28);
  display: grid;
  gap: 12px;
  padding: 14px 16px 18px;
}

.ord-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 10px;
}
.ord-title {
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.01em;
}

.ord-hero {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--theme-border-subtle);
  background: color-mix(in oklab, var(--theme-primary-500) 6%, #000);
}
.ord-hero img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}

.ord-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 800px) {
  .ord-grid { grid-template-columns: 1fr; }
}
.ord-steps {
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 8px;
  color: var(--theme-text-secondary);
}
</style>
