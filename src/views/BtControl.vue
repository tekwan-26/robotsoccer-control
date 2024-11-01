<template>
  <div class="flex flex-col gap-4 p-4 h-screen">
    <a href="#" @click="back()" class="flex gap-2 items-center text-sm opacity-50">
        <IconArrowLeft />
        Back
    </a>
    <div class="flex flex-col gap-2 border-b-2 border-black/20 pb-4">
        <span class="text-xl">
            Bluetooth Controller
        </span>
        <span class="text-sm opacity-50">
            {{ $route.params.addr }}
        </span>
    </div>
    <span v-if="!connState">Please Wait...</span>
    <div v-else class="mt-[75px] flex max-md:flex-col gap-2 max-md:justify-center md:justify-around items-center flex-1 w-full">
        <div class="flex flex-col gap-2 justify-center items-center">
            <div class="flex flex-col items-center px-2 py-1 rounded-md bg-black text-white">
                <span class="text-sm">
                    {{direct}}
                </span>
            </div>
            <img src="@/assets/base_ico.svg" alt="" width="150">
        </div>
        <Joystick class="my-auto" :size="150" :stick-size="90" base-color="black" stick-color="white" @move="move" @stop="stop" />
    </div>
  </div>
</template>

<script setup>
import { disconnect, write } from '@/util/bt';
import { IconArrowLeft } from '@tabler/icons-vue';
import { onMounted, ref } from 'vue';
import Joystick from 'vue-joystick-component';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const addr = route.params.addr;
const connState = ref(false);
const thumbstick_dt = ref({});
const direct = ref('STOP');

const back = async() => {
    try {
        const disc = await disconnect();

        if(disc) {
            alert("Successfully disconnected!")
            router.push('/');
        }
    } catch(e) {
        alert(e);
        router.push('/');
    }
}

const sendStat = async (d) => {
    try {
        if(d == "FORWARD") {
            await write('F', addr);
        } else if(d == "BACKWARD") {
            await write('B', addr);
        } else if(d == "RIGHT") {
            await write('R', addr);
        } else if(d == "LEFT") {
            await write('L', addr);
        } else {
            await write('S', addr)
        }
    } catch(e) {
        throw e;
    }
}

const move = async({direction}) => {
    try {
        direct.value = direction;
        await sendStat(direct.value);
    } catch(e) {
        alert(e);
        router.push("/");
    }
}

const stop = async() => {
    try {
        direct.value = 'STOP';
        await sendStat(direct.value);
    } catch(e) {
        alert(e);
        router.push("/");
    }
}

onMounted(async() => {
    try {
        connState.value = await write('S', addr)
        
        alert("Successfully connected!")
    } catch(e) {
        alert(e);
        router.push("/");
    }
})
</script>
