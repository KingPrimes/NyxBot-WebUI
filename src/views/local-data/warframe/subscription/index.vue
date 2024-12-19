<script lang="ts" setup>
import { ref } from 'vue'

const pageTitle = ref('Warframe订阅配置')
</script>

<template>
  <div class="warframe-subscription-container">
    <h1>{{ pageTitle }}</h1>
  </div>
</template>

<style scoped>
.warframe-subscription-container {
  padding: 20px;
}
</style>
