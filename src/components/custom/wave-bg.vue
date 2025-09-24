<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({ name: 'WaveBg' });

const themeStore = useThemeStore();
const patterns = ref<Array<{ type: string; x: number; y: number; size: number; rotation: number; delay: number }>>([]);

// 定义图案类型
const patternTypes = ['star', 'heart', 'circle', 'triangle', 'diamond'];

// 根据主题设置背景样式
const backgroundStyle = computed(() => {
  // 纯色背景替代斜向条纹
  return {
    backgroundColor: themeStore.darkMode ? 'rgba(49, 43, 60, 0.95)' : 'rgba(242, 235, 231, 0.95)',
    boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.05)'
  };
});

// 生成随机图案
function generateRandomPatterns() {
  patterns.value = [];
  const patternCount = themeStore.darkMode ? 80 : 60; // 暗色主题可以有更多图案

  for (let i = 0; i < patternCount; i += 1) {
    patterns.value.push({
      type: patternTypes[Math.floor(Math.random() * patternTypes.length)],
      x: Math.random() * 100, // 百分比位置
      y: Math.random() * 100, // 百分比位置
      size: Math.random() * 10 + 5, // 5-15px的大小范围
      rotation: Math.random() * 360, // 0-360度的旋转
      delay: Math.random() * 5 // 0-5秒的动画延迟
    });
  }
}

// 监听主题变化，重新生成图案
watch(
  () => themeStore.darkMode,
  () => {
    generateRandomPatterns();
  }
);

onMounted(() => {
  generateRandomPatterns();
});
</script>

<template>
  <div class="absolute-lt z-1 size-full overflow-hidden" :style="backgroundStyle">
    <!-- 额外的图案装饰元素 -->
    <div class="pointer-events-none absolute inset-0 opacity-10">
      <div
        class="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(124,104,153,0.3)_0%,transparent_20%)]"
      ></div>
      <div
        class="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_80%_70%,rgba(226,196,207,0.3)_0%,transparent_20%)]"
      ></div>
    </div>

    <!-- 随机分布的星星、爱心等图案 -->
    <div class="pointer-events-none absolute inset-0">
      <div
        v-for="(pattern, index) in patterns"
        :key="index"
        class="absolute"
        :style="{
          left: `${pattern.x}%`,
          top: `${pattern.y}%`,
          width: `${pattern.size}px`,
          height: `${pattern.size}px`,
          transform: `translate(-50%, -50%) rotate(${pattern.rotation}deg)`,
          animationDelay: `${pattern.delay}s`
        }"
      >
        <div :class="[`pattern-${pattern.type}`, themeStore.darkMode ? 'dark-pattern' : 'light-pattern']"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 为图案添加动画效果 */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.15;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-10px);
  }
}

.absolute-lt .opacity-10 {
  animation: pulse 8s ease-in-out infinite;
}

/* 确保背景图案在不同屏幕尺寸下都能良好显示 */
@media (max-width: 768px) {
  .absolute-lt {
    background-size: 15px 15px !important;
  }
}

/* 图案样式 */
.pattern-star,
.pattern-heart,
.pattern-circle,
.pattern-triangle,
.pattern-diamond {
  width: 100%;
  height: 100%;
  opacity: 0.6;
  animation: float 8s ease-in-out infinite;
  --rotation: 0deg;
}

/* 星星图案 */
.pattern-star {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

/* 爱心图案 */
.pattern-heart {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  transform: rotate(45deg);
}

/* 圆形图案 */
.pattern-circle {
  border-radius: 50%;
}

/* 三角形图案 */
.pattern-triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* 菱形图案 */
.pattern-diamond {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* 亮色主题下的图案颜色 */
.light-pattern {
  background-color: rgba(124, 104, 153, 0.6);
}

/* 暗色主题下的图案颜色 */
.dark-pattern {
  background-color: rgba(226, 196, 207, 0.6);
}
</style>
