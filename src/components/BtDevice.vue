<template>
  <RouterLink :to="`/bluetooth/${address}`" class="hover:bg-black/15 transition ease-in p-4 flex gap-2 border-2 border-black/10 rounded-xl items-center">
    <IconBluetooth :size="50" />
    <div class="flex flex-col flex-1">
        <span class="text-lg">{{ name }}</span>
        <span class="text-sm opacity-45">{{ address }}</span>
    </div>
    <IconArrowRight />
  </RouterLink>
</template>

<script setup>
import { IconArrowRight, IconBluetooth } from '@tabler/icons-vue';
import { RouterLink } from 'vue-router';

defineProps({
    name: String,
    address: String,
})
</script>