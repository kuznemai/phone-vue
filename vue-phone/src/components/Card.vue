<script setup>

import {inject} from "vue";
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
});

</script>


<template>
  <div
      class="relative bg-white border border-slate-100 rounded-3xl p-4 cursor-pointer  hover:-translate-y-2 hover:shadow-xl transition">
    <img
        v-if="onClickFavorite"
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
         class="absolute top-4 left-4"
         alt="Like 1"
         @click="onClickFavorite"
    />

    <img :src="imageUrl" class="w-20 mx-auto my-5 py-2" alt="Phone"/>

    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between  mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ price }} $</b>
      </div>

      <img
          v-if="onClickAdd"
          @click="onClickAdd"
          :src="!isAdded ? '/add.png' : '/checked.png'"
          class="w-8 h-8"
          alt="Add"/>
    </div>
  </div>
</template>