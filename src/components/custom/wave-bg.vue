<script lang="ts" setup>
import { onMounted, ref } from 'vue';

defineOptions({ name: 'WaveBg' });

interface image {
  startdate: string;
  fullstartdate: string;
  enddate: string;
  url: string;
  urlbase: string;
  copyright: string;
  copyrightlink: string;
  title: string;
}

interface BingImage {
  images: image[];
}

const imageUrl = ref('');

async function getBingImage() {
  await fetch('https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/zh-CN_update.json', {
    method: 'GET',
    redirect: 'follow'
  }).then(response => {
    response.text().then(data => {
      const bingImage: BingImage = JSON.parse(data);
      const random = Math.floor(Math.random() * bingImage.images.length);
      imageUrl.value = `https://cn.bing.com${bingImage.images[random].url}`;
    });
  });
}
onMounted(() => {
  getBingImage();
});
</script>

<template>
  <div
    class="absolute-lt z-1 size-full overflow-hidden"
    :style="{
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `cover`
    }"
  ></div>
</template>

<style scoped></style>
