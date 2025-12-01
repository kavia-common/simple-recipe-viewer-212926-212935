<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import RecipeCard from './RecipeCard.vue';
import RecipeDetail from './RecipeDetail.vue';
import { fetchRecipes, fetchRecipeById, type Recipe } from '../services/recipes';

/**
 * RecipeApp is the main browser UI that shows:
 * - Header bar
 * - Responsive grid of recipe cards
 * - Click to open a modal detail view with transitions
 * - Loading and error states
 * It uses services/recipes which automatically falls back to services/mockData when VITE_API_BASE is unset or failing.
 */

const recipes = ref<Recipe[]>([]);
const loading = ref(true);
const loadError = ref<string | null>(null);
const selectedId = ref<string | null>(null);
const selectedRecipe = ref<Recipe | undefined>(undefined);

// compute a boolean hint for API presence without exposing env in the template
const apiHint = computed(() => {
  try {
    return Boolean(import.meta.env?.VITE_API_BASE);
  } catch {
    return false;
  }
});

// PUBLIC_INTERFACE
function openRecipe(id: string) {
  /** Open a recipe by id, loading from service if needed and showing the modal. */
  selectedId.value = id;
  // Robust load with try/catch, but keep UI responsive even if it fails.
  fetchRecipeById(id)
    .then((r) => {
      selectedRecipe.value = r;
    })
    .catch(() => {
      // In worst-case, show a minimal placeholder if details fail.
      const fallback = recipes.value.find((r) => r.id === id);
      selectedRecipe.value = fallback;
    });
}

// PUBLIC_INTERFACE
function closeRecipe() {
  /** Close the detail modal. */
  selectedId.value = null;
  selectedRecipe.value = undefined;
}

onMounted(async () => {
  try {
    loading.value = true;
    loadError.value = null;
    recipes.value = await fetchRecipes();
  } catch (e) {
    console.warn('Failed to load recipes. Falling back to error UI.', e);
    loadError.value = 'We could not load recipes right now. Please try again.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="app-surface">
    <header class="app-header" role="banner">
      <div class="brand" aria-label="Simple Recipe Viewer">
        <span class="logo-dot" />
        <span class="brand-title">Simple Recipe Viewer</span>
      </div>
      <div class="actions" aria-live="polite" aria-atomic="true">
        <span v-if="apiHint" class="env-pill" title="Connected to API">API</span>
      </div>
    </header>

    <main class="content" role="main">
      <div class="intro card">
        <div class="overline">Welcome</div>
        <p class="muted">
          Click any recipe to view details. Smooth modal transitions and modern theme styling.
        </p>
      </div>

      <div v-if="loading" class="loading" role="status" aria-live="polite">Loading recipes…</div>

      <div v-else-if="loadError" class="error" role="alert">
        {{ loadError }}
      </div>

      <transition name="fade">
        <div v-if="!loading && !loadError" class="grid" data-testid="recipe-grid">
          <RecipeCard v-for="r in recipes" :key="r.id" :recipe="r" @view="openRecipe" />
        </div>
      </transition>
    </main>

    <RecipeDetail :open="!!selectedId" :recipe="selectedRecipe" @close="closeRecipe" />
  </div>
</template>

<style scoped>
.app-surface {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 16px;
}

/* Header */
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 12px 16px;
  background:
    linear-gradient(180deg, rgba(37,99,235,0.08), rgba(15,23,42,0)),
    var(--theme-bg-canvas);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 14px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.22);
}
.brand {
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 10px;
}
.logo-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--theme-primary-500);
  box-shadow: 0 0 0 6px color-mix(in oklab, var(--theme-primary-500) 24%, #0000);
}
.brand-title {
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: 18px;
}
.actions {
  display: inline-grid;
  justify-items: end;
}
.env-pill {
  padding: 4px 10px;
  border-radius: 9999px;
  background: color-mix(in oklab, #F59E0B 12%, #000);
  border: 1px solid color-mix(in oklab, #F59E0B 22%, #000);
  color: var(--theme-text-primary);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
}

/* Content */
.content {
  display: grid;
  gap: 16px;
}
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.loading {
  color: var(--theme-text-secondary);
}
.error {
  color: var(--theme-danger);
  background: color-mix(in oklab, var(--theme-danger) 8%, #000);
  border: 1px solid color-mix(in oklab, var(--theme-danger) 22%, #000);
  padding: 10px 12px;
  border-radius: 10px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 180ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
