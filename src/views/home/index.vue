<script setup lang="ts">
// import { onMounted, ref } from "vue";
// import {
//   fetchCycle, fetchInvasions, fetchFissures, fetchNightwave,
//   fetchSorties, fetchArchonHunt, fetchAlerts, fetchDailyDeals,
//   fetchVoidTrader, fetchDuvalierCycle, fetchMissionTypes, fetchFactions, fetchVoidTiers,
// } from "@/service/api/warframe-api";
// import CycleCard from "@/components/common/cycle-card.vue";
// import GameDataCard from "@/components/common/game-data-card.vue";
// import FissureCard from "@/components/common/fissure-card.vue";

// const translateMap = ref<Record<string, string>>({});

// async function loadEnums() {
//   const [mt, fa, vt] = await Promise.all([fetchMissionTypes(), fetchFactions(), fetchVoidTiers()]);
//   const map: Record<string, string> = {};
//   if (!mt.error && mt.data) Object.assign(map, mt.data);
//   if (!fa.error && fa.data) Object.assign(map, fa.data);
//   if (!vt.error && vt.data) Object.assign(map, vt.data);
//   translateMap.value = map;
// }
// onMounted(() => loadEnums());

// const fissureCards = [
//   { title: "普通裂隙", apiFn: () => fetchFissures("ACTIVE_MISSION") },
//   { title: "钢铁裂隙", apiFn: () => fetchFissures("STEEL_PATH") },
//   { title: "虚空风暴", apiFn: () => fetchFissures("VOID_STORMS") },
// ];

// const otherCards = [
//   { title: "入侵", apiFn: fetchInvasions },
//   { title: "午夜电波", apiFn: fetchNightwave },
//   { title: "突击", apiFn: fetchSorties },
//   { title: "执刑官猎杀", apiFn: fetchArchonHunt },
//   { title: "警报", apiFn: fetchAlerts },
//   { title: "每日特惠", apiFn: fetchDailyDeals },
//   { title: "虚空商人", apiFn: fetchVoidTrader },
//   { title: "双衍王境", apiFn: fetchDuvalierCycle },
// ];
</script>

<template>
  <div class="flex flex-wrap items-start gap-16px p-16px">
    <!--
    <div class="inline-flex">
          <CycleCard title="平原时间" :api-fn="fetchCycle" />
        </div>
        <div v-for="card in fissureCards" :key="card.title" class="inline-flex">
          <FissureCard :title="card.title" :api-fn="card.apiFn" :translate-map="translateMap" />
        </div>
        <GameDataCard v-for="card in otherCards" :key="card.title" :title="card.title" :api-fn="card.apiFn" :translate-map="translateMap" />
    -->
  </div>
</template>
