<script setup lang="ts">
import type { Recipe } from '../services/recipes';

const props = defineProps<{
  recipe: Recipe;
}>();

const emit = defineEmits<{
  (e: 'view', id: string): void;
}>();

function onView() {
  emit('view', props.recipe.id);
}
</script>

<template>
  <div class="recipe-card" @click="onView" role="button" tabindex="0" @keyup.enter="onView">
    <div class="image-wrap">
      <img :src="recipe.image" :alt="recipe.title" />
      <div class="time-pill">{{ recipe.time }}</div>
    </div>
    <div class="card-body">
      <h3 class="title">{{ recipe.title }}</h3>
      <p class="desc">{{ recipe.description }}</p>
      <button class="btn-view" @click.stop="onView">View</button>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
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
.recipe-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklab, var(--theme-primary-500) 30%, var(--theme-border-subtle));
  box-shadow: 0 14px 36px rgba(0,0,0,0.34);
}
.image-wrap {
  position: relative;
  aspect-ratio: 16/9;
  background: color-mix(in oklab, var(--theme-primary-500) 6%, #000);
}
.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.time-pill {
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
.card-body {
  display: grid;
  gap: 8px;
  padding: 14px 16px 16px;
}
.title {
  margin: 0;
  font-size: 18px;
  letter-spacing: -0.01em;
}
.desc {
  margin: 0;
  color: var(--theme-text-secondary);
  font-size: 14px;
}
.btn-view {
  justify-self: start;
  background: var(--theme-btn-primary-bg);
  color: var(--theme-btn-primary-fg);
  border: 0;
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(107,127,235,0.25);
  transition: transform 150ms ease, background 150ms ease;
}
.btn-view:hover {
  background: var(--theme-btn-primary-hover);
  transform: translateY(-1px);
}
.btn-view:active {
  transform: translateY(0);
}
</style>
