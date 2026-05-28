<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useThemeStore } from "@/store/modules/theme";
import PwdLogin from "./modules/pwd-login.vue";

const appStore = useAppStore();
const themeStore = useThemeStore();
const themeColor = computed(() => themeStore.themeColor ?? "#fe7199");
</script>

<template>
  <div class="relative size-full flex-center overflow-hidden">
    <WaveBg :theme-color="themeColor" />

    <NCard :bordered="false" class="relative z-4 w-auto rd-12px">
      <div class="w-450px lt-sm:w-300px">
        <header class="flex-y-center justify-between">
          <SystemLogo class="text-64px text-primary lt-sm:text-48px" />
          <h3 class="text-28px text-primary font-500 lt-sm:text-22px">{{ $t("system.title") }}</h3>
        </header>
        <main class="pt-24px">
          <div class="flex-y-center justify-between">
            <h3 class="text-18px text-primary font-medium">
              {{ $t("page.login.pwdLogin.title") }}
            </h3>
            <div class="flex gap-8px">
              <ThemeSchemaSwitch
                :theme-schema="themeStore.themeScheme"
                :show-tooltip="false"
                class="text-20px lt-sm:text-18px"
                @switch="themeStore.toggleThemeScheme"
              />
              <LangSwitch
                :lang="appStore.locale"
                :lang-options="appStore.localeOptions"
                :show-tooltip="false"
                @change-lang="appStore.changeLocale"
              />
            </div>
          </div>
          <div class="pt-24px">
            <PwdLogin />
          </div>
        </main>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
