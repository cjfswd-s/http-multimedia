<template>
  <div class="flex flex-col justify-center items-center px-0 sm:px-5">
    <div
      class="flex flex-row flex-wrap items-center justify-center p-2 gap-x-4 gap-y-[0.25em]"
    >
      <div v-for="(item, index) in api" class="flex flex-row">
        <div class="cursor-pointer" @click="setGenre(item.category.name)">
          {{ item.category.name }}
        </div>
      </div>
    </div>
    <div class="w-full">
      <div
        v-show="store.currentMusic.name != ''"
        class="flex flex-col items-center bg-[#101010]"
      >
        <div class="flex flex-row w-full">
          <object
            class="w-[96px] sm:w-[128px]"
            type="image/svg+xml"
            :data="`https://api-multimedia-with-modeling.herokuapp.com/${store.currentPlaylist.category.icon}`"
          />
          <div ref="audioPlayer" class="w-full px-[0.5em] py-[0.5em]">
            <div>title: {{ store.currentMusic.name }}</div>
            <div>genre: {{ store.currentPlaylist.category.name }}</div>
          </div>
        </div>
        <audio
          ref="audioPlayer"
          :src="`https://api-multimedia-with-modeling.herokuapp.com/${store.currentMusic.directory}`"
          class="w-full h-[35px] rounded-[0px] bg-[#3D3D3D]"
          controls
          autoplay
        >
          Your browser does not support the audio tag.
        </audio>
        <div class="w-full divide-y">
          <div
            v-for="file in store.currentPlaylist.files"
            class="cursor-pointer px-[0.5em] py-[0.5em] leading-tight text-sm"
            @click="store.currentMusic = file"
          >
            {{ file.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script async setup lang="ts">
import { reactive, ref, onMounted } from "vue";

const audioPlayer = ref<HTMLAudioElement>();

let api: {
  category: { name: string; icon: string };
  files: { name: string; directory: string }[];
}[] = await fetch(
  "https://api-multimedia-with-modeling.herokuapp.com/api/audios"
).then((res) => res.json());

const store = reactive({
  currentPlaylist: {
    category: {
      name: "",
      icon: "",
    },
    files: [
      {
        name: "",
        directory: "",
      },
    ],
  },
  currentMusic: { name: "", directory: "" },
});

const setGenre = (genre: string) => {
  store.currentPlaylist = api.filter((item) => item.category.name == genre)[0];
  store.currentMusic = api.filter((item) => item.category.name == genre)[0].files[0];
};

onMounted(() => {
  audioPlayer.value!.volume = 0.3
  audioPlayer.value!.addEventListener("ended", function () {
    store.currentMusic =
      store.currentPlaylist.files[
        store.currentPlaylist.files.indexOf(store.currentMusic) !=
        store.currentPlaylist.files.length - 1
          ? store.currentPlaylist.files.indexOf(store.currentMusic) + 1
          : 0
      ];
  });
});
</script>
