<template>
  <div class="mx-auto flex flex-col w-screen gap-4">
    <NavBar />
    <div class="px-4 mx-auto max-w-[650px] w-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';


</script>