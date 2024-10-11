<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
import CardList from "@/components/CardList.vue";

const favorites = ref([]);
onMounted(async () => {
  try {
  const { data } = await axios.get('https://ad59c37a99f145f4.mokky.dev/favorites?_relations=items');

  favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})

</script>

<template>
  <h2 class="text-3xl mb-8 font-bold">My favorites</h2>

  <CardList :items="favorites" is-favorites />
</template>