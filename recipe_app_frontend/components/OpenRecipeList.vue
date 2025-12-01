<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref } from 'vue';
import { fetchRecipes, type Recipe } from '../services/recipes';

const props = defineProps<{
  // Optional pre-fetched recipes can be passed in; otherwise the component will load them.
  items?: Recipe[];
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'loaded', items: Recipe[]): void;
}>();

const recipes = ref<Recipe[]>(props.items || []);
const loading = ref<boolean>(!props.items);
const error = ref<string | null>(null);

/**
 * Handle selection of a recipe; emit the id upward.
 */
function onSelect(id: string) {
  emit('select', id);
}

onMounted(async () => {
  // If items were provided, skip fetch
  if (props.items && props.items.length > 0) {
    loading.value = false;
    return;
  }
  try {
    loading.value = true;
    error.value = null;
    const data = await fetchRecipes();
    recipes.value = data;
    emit('loaded', data);
  } catch (e) {
    error.value = 'Unable to load recipes. Please try again.';
    // Degrade gracefully: no throw; show error box instead
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="orl-surface">
    <div v-if="loading" class="orl-status muted" role="status" aria-live="polite">
      Loading recipes…
    </div>

    <div v-else-if="error" class="orl-error" role="alert">
      {{ error }}
    </div>

    <div v-else class="orl-grid" data-testid="open-recipe-list">
      <div
        v-for="r in recipes"
        :key="r.id"
        class="orl-card"
        role="button"
        tabindex="0"
        @click="onSelect(r.id)"
        @keyup.enter="onSelect(r.id)"
        :aria-label="`Open recipe: ${r.title}`"
      >
        <div class="orl-hero">
          <img :src="r.image" :alt="r.title" />
          <div class="pill">{{ r.time }}</div>
        </div>
        <div class="orl-body">
          <h3 class="orl-title">{{ r.title }}</h3>
          <p class="orl-desc">{{ r.description }}</p>
          <div class="orl-cta">
            <button class="btn-primary small">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orl-surface {
  display: grid;
  gap: 16px;
}

.orl-status {
  color: var(--theme-text-secondary);
}

.orl-error {
  color: var(--theme-danger);
  background: color-mix(in oklab, var(--theme-danger) 8%, #000);
  border: 1px solid color-mix(in oklab, var(--theme-danger) 22%, #000);
  padding: 10px 12px;
  border-radius: 10px;
}

.orl-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
@media (max-width: 1024px) {
  .orl-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .orl-grid { grid-template-columns: 1fr; }
}

.orl-card {
  display: grid;
  grid-template-rows: auto 1fr;
  background: var(--theme-bg-elevated);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0,0,0,0.28);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
  cursor: pointer;
}
.orl-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklab, var(--theme-primary-500) 30%, var(--theme-border-subtle));
  box-shadow: 0 14px 36px rgba(0,0,0,0.34);
}

.orl-hero {
  position: relative;
  aspect-ratio: 16/9;
  background: color-mix(in oklab, var(--theme-primary-500) 6%, #000);
}
.orl-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.orl-hero .pill {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 6px 10px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--theme-text-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.orl-body {
  display: grid;
  gap: 8px;
  padding: 14px 16px 16px;
}
.orl-title {
  margin: 0;
  font-size: 18px;
  letter-spacing: -0.01em;
}
.orl-desc {
  margin: 0;
  color: var(--theme-text-secondary);
  font-size: 14px;
}
.orl-cta {
  margin-top: 2px;
}
.small { font-size: 14px; padding: 8px 14px; border-radius: 10px; }
</style>
