<template>
  <div class="flex flex-col p-4">
    <div v-if="!stateBT" class="flex max-md:flex-col gap-2 items-center">
       <IconBluetooth :size="120" />
       <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <span class="text-xl">Uh Oh..</span>
                <span class="opacity-45 text-sm">Please enable your bluetooth permission on the app, and enable your bluetooth too!</span>
            </div>
            <div class="flex gap-2 items-center justify-end max-md:w-full">
                <a href="#" @click="getPaired()" class="max-md:w-full flex justify-center items-center gap-2 hover:bg-black/15 border-2 border-black/10 rounded-md p-2 transition ease-in">
                    <IconRefresh />
                    Retry
                </a>
            </div>
       </div>
    </div>
    <div v-else-if="stateBT && listDev.length >= 1" class="flex flex-col gap-2">
        <BtDevice v-for="(data, index) in listDev" :key=index :name="data.name" :address="data.address" />
    </div>
    <div v-else class="flex max-md:flex-col gap-2 items-center">
       <IconBluetooth :size="120" />
       <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <span class="text-xl">Uh Oh..</span>
                <span class="opacity-45 text-sm">Please make sure that you're already paired any devices on the bluetooth settings,</span>
            </div>
            <div class="flex gap-2 items-center justify-end max-md:w-full">
                <a href="#" @click="getPaired()" class="max-md:w-full flex justify-center items-center gap-2 hover:bg-black/15 border-2 border-black/10 rounded-md p-2 transition ease-in">
                    <IconRefresh />
                    Retry
                </a>
            </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import BtDevice from '@/components/BtDevice.vue';
import { isEnable, list } from '@/util/bt';
import { IconBluetooth, IconRefresh } from '@tabler/icons-vue';
import { onMounted, ref } from 'vue';
const stateBT = ref(false);
const listDev = ref([]);

const getPaired = async() => {
    try {
        stateBT.value = await isEnable();
        listDev.value = await list();
    } catch(e) {
        alert(e);
    }
}

onMounted(() => {
    getPaired();
})
</script>
