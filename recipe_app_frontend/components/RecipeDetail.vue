<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { Recipe } from '../services/recipes';

const props = defineProps<{
  open: boolean;
  recipe?: Recipe;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

function onBackdrop(e: MouseEvent) {
  if ((e.target as HTMLElement)?.classList.contains('modal-backdrop')) emit('close');
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close');
}

onMounted(() => window.addEventListener('keydown', onKey));
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="modal-backdrop" @click="onBackdrop" role="dialog" aria-modal="true">
      <transition name="pop">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">{{ recipe?.title }}</h2>
            <button class="icon-btn" @click="$emit('close')" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div class="hero">
              <img :src="recipe?.image" :alt="recipe?.title || 'Recipe image'" />
              <div class="badge">{{ recipe?.time }}</div>
            </div>
            <div class="content-grid">
              <div>
                <div class="eyebrow">Ingredients</div>
                <ul class="points-clean">
                  <li v-for="(i, ix) in recipe?.ingredients || []" :key="ix">{{ i }}</li>
                </ul>
              </div>
              <div>
                <div class="eyebrow">Steps</div>
                <ol class="steps">
                  <li v-for="(s, sx) in recipe?.steps || []" :key="sx">{{ s }}</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" @click="$emit('close')">Back</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: grid;
  place-items: center;
  padding: 20px;
  z-index: 60;
}
.modal {
  width: min(980px, 100%);
  max-height: 88vh;
  overflow: auto;
  background: var(--theme-bg-elevated);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 16px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.5);
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.modal-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid var(--theme-border-subtle);
}
.modal-title {
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.01em;
}
.icon-btn {
  background: transparent;
  border: 1px solid var(--theme-border-subtle);
  color: var(--theme-text-secondary);
  border-radius: 10px;
  padding: 6px 10px;
  cursor: pointer;
}
.icon-btn:hover {
  background: var(--theme-btn-ghost-hover-bg);
}
.modal-body {
  padding: 16px;
  display: grid;
  gap: 16px;
}
.hero {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--theme-border-subtle);
  background: color-mix(in oklab, var(--theme-primary-500) 6%, #000);
}
.hero img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}
.hero .badge {
  position: absolute;
  left: 12px;
  top: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.06em;
}
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 800px) {
  .content-grid { grid-template-columns: 1fr; }
}
.steps {
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 8px;
  color: var(--theme-text-secondary);
}
.modal-footer {
  padding: 12px 16px 16px;
  border-top: 1px solid var(--theme-border-subtle);
  display: flex;
  justify-content: flex-end;
}
.fade-enter-active,
.fade-leave-active { transition: opacity 180ms ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.pop-enter-active,
.pop-leave-active { transition: transform 220ms ease, opacity 220ms ease; }
.pop-enter-from,
.pop-leave-to { transform: translateY(8px) scale(0.98); opacity: 0; }
</style>
