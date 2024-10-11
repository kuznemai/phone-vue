<script setup>
const emit =  defineEmits(['onClickRemove'])


defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number
})


</script>


<template>

  <div class="flex items-center border border-slate-100 p-5  rounded-xl gap-10 mt-10">
  <img class="w-16 h-22" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p> {{ title }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }} $</b>
        <img @click = "emit('onClickRemove')"
             src="/close.svg"
             alt="Delete"
             class="cursor-pointer opacity-60 hover:opacity-100 transition ml-50" />
      </div>
    </div>

  </div>
</template>

<script setup>
</script>