<script setup>
import axios from "axios";
import DrawerHead from "./DrawerHead.vue";
import CartItem from "@/components/CartItem.vue";
import CartItemList from "@/components/CartItemList.vue";
import InfoBlock from "@/components/InfoBlock.vue";
import { ref, inject, computed } from "vue";


const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  cartButtonDisabled: Boolean
})

const { cart, closeDrawer} = inject('cart')

const isCreating = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`https://ad59c37a99f145f4.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []

    orderId.value = data.id;
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70 "></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead/>

<div v-if="!totalPrice || orderId" class="flex h-full items-center">
  <InfoBlock
      v-if="!totalPrice && !orderId"
    title="Your bag is empty."
    description="Sign in to see if you have any saved items. Or continue shopping."
    imageUrl="/emptybox.png"/>

  <InfoBlock
      v-if="orderId"
      title="Your order is completed!"
      :description="`Your order #${orderId} is soon will be handed to shipping`"
      imageUrl="/completed.png"/>

</div>


<div v-else>

  <CartItemList />

  <div class="flex flex-col gap-4 mt-7">
    <div class="flex gap-2">
      <span>Total:</span>
      <div class="flex-1 border-b border-dashed"></div>
      <b>{{ totalPrice }} $</b>
    </div>


    <div class="flex gap-2">
      <span>VAT:</span>
      <div class="flex-1 border-b border-dashed"></div>
      <b>{{ vatPrice }} $</b>
    </div>

    <button
        :disabled="cartButtonDisabled"
        @click="createOrder"
        class="mt-4 transition bg-lime-500 w-full disabled:bg-slate-300 rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 cursor:pointer">
      Place order
    </button>

  </div>
</div>

  </div>


</template>
