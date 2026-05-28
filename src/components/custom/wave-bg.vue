<script lang="ts" setup>
import { computed, ref, onMounted, watch } from "vue";
import { getPaletteColorByNumber, addColorAlpha } from "@sa/color";
import { useThemeStore } from "@/store/modules/theme";

defineOptions({ name: "WaveBg" });

interface Props {
  /** Theme color */
  themeColor?: string;
  /** Number of shapes */
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  themeColor: "#fe7199",
  count: 30,
});

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.darkMode);

type ShapeType = "star" | "heart" | "circle" | "triangle" | "diamond";

interface ShapeItem {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  color: string;
  rotate: number;
  rotateSpeed: number;
  duration: number;
  delay: number;
  floatX: number;
  floatY: number;
}

const seed = ref(0);

function seededRandom(s: number) {
  s = Math.sin(s * 9301 + 49297) * 233280;
  return s - Math.floor(s);
}

function generateShapes(): ShapeItem[] {
  const primary = props.themeColor;
  const colors = isDark.value
    ? [
        addColorAlpha(primary, 0.15),
        addColorAlpha(primary, 0.1),
        addColorAlpha(primary, 0.2),
        getPaletteColorByNumber(primary, 600),
        addColorAlpha(primary, 0.08),
        addColorAlpha(primary, 0.12),
        getPaletteColorByNumber(primary, 700),
        addColorAlpha(primary, 0.05),
        addColorAlpha(primary, 0.18),
        addColorAlpha(primary, 0.25),
      ]
    : [
        addColorAlpha(primary, 0.1),
        addColorAlpha(primary, 0.06),
        addColorAlpha(primary, 0.15),
        getPaletteColorByNumber(primary, 200),
        getPaletteColorByNumber(primary, 100),
        addColorAlpha(primary, 0.08),
        addColorAlpha(primary, 0.12),
        addColorAlpha(primary, 0.04),
        addColorAlpha(primary, 0.18),
        addColorAlpha(primary, 0.2),
      ];

  const types: ShapeType[] = ["star", "heart", "circle", "triangle", "diamond"];
  const shapes: ShapeItem[] = [];
  const s = seed.value;

  for (let i = 0; i < props.count; i++) {
    shapes.push({
      id: i,
      type: types[Math.floor(seededRandom(s + i * 7) * types.length)],
      x: seededRandom(s + i * 13) * 100,
      y: seededRandom(s + i * 17) * 100,
      size: 12 + seededRandom(s + i * 19) * 48,
      color: colors[Math.floor(seededRandom(s + i * 23) * colors.length)],
      rotate: seededRandom(s + i * 29) * 360,
      rotateSpeed: (seededRandom(s + i * 53) - 0.5) * 360,
      duration: 8 + seededRandom(s + i * 31) * 16,
      delay: seededRandom(s + i * 37) * -20,
      floatX: (seededRandom(s + i * 41) - 0.5) * 80,
      floatY: (seededRandom(s + i * 43) - 0.5) * 80,
    });
  }

  return shapes;
}

const shapes = ref<ShapeItem[]>([]);

function refreshShapes() {
  shapes.value = generateShapes();
}

onMounted(() => {
  refreshShapes();
});

// Regenerate when theme changes
watch(isDark, () => {
  seed.value = Date.now() % 10000;
  refreshShapes();
});
</script>

<template>
  <div class="absolute-lt z-1 size-full overflow-hidden">
    <div
      v-for="shape in shapes"
      :key="shape.id"
      class="absolute animate-float"
      :style="{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        color: shape.color,
        animationDuration: `${shape.duration}s`,
        animationDelay: `${shape.delay}s`,
        '--float-x': `${shape.floatX}px`,
        '--float-y': `${shape.floatY}px`,
        '--start-rotate': `${shape.rotate}deg`,
        '--end-rotate': `${shape.rotate + shape.rotateSpeed}deg`,
      }"
    >
      <!-- Star -->
      <svg v-if="shape.type === 'star'" viewBox="0 0 24 24" fill="currentColor" class="size-full">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>

      <!-- Heart -->
      <svg v-if="shape.type === 'heart'" viewBox="0 0 24 24" fill="currentColor" class="size-full">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>

      <!-- Circle -->
      <div
        v-if="shape.type === 'circle'"
        class="size-full rounded-full"
        :style="{ backgroundColor: shape.color }"
      />

      <!-- Triangle -->
      <svg
        v-if="shape.type === 'triangle'"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-full"
      >
        <path d="M12 2L2 22h20L12 2z" />
      </svg>

      <!-- Diamond -->
      <svg
        v-if="shape.type === 'diamond'"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-full"
      >
        <path d="M12 2l10 10-10 10L2 12 12 2z" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.animate-float {
  animation-name: float-move;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  opacity: 0.6;
  pointer-events: none;
  will-change: transform;
}

@keyframes float-move {
  0% {
    transform: translate(0, 0) rotate(var(--start-rotate, 0deg));
  }
  33% {
    transform: translate(var(--float-x, 30px), var(--float-y, 20px))
      rotate(calc((var(--start-rotate, 0deg) + var(--end-rotate, 0deg)) * 0.33));
  }
  66% {
    transform: translate(calc(var(--float-x, 20px) * -0.5), calc(var(--float-y, -20px) * 0.7))
      rotate(calc((var(--start-rotate, 0deg) + var(--end-rotate, 0deg)) * 0.66));
  }
  100% {
    transform: translate(calc(var(--float-x, 30px) * -0.3), calc(var(--float-y, -20px) * -0.4))
      rotate(var(--end-rotate, 360deg));
  }
}
</style>
