<script setup>
import axios from "axios";
import CardList from "../components/CardList.vue";
import {inject, onMounted, reactive, ref, watch} from "vue";
import debounce from "lodash.debounce";

const { addToCart, removeFromCart, cart} = inject('cart');

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
  console.log(cart)

}
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 300)




const addToFavorite = async (item) => {

  try {
    const obj = {
      item_id: item.id
    }
    if (!item.isFavorite) {

      const {data} = await axios.post(`https://ad59c37a99f145f4.mokky.dev/favorites`, obj)
      item.isFavorite = true
      item.favoriteId = data.id
    } else {

      await axios.delete(`https://ad59c37a99f145f4.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}



const fetchFavorites = async () => {
  try {
    const {data: favorites} = await axios.get(`https://ad59c37a99f145f4.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find(favorite => favorite.item_id === item.id)
      if (!favorite) {
        return item;
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    });


  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const {data} = await axios.get(`https://ad59c37a99f145f4.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({ //перебираем массив, для каждого эдемента=обхекта применяем функцию
      ...obj, //Оператор расширения (...) копирует все свойства текущего объекта obj в новый объект. Это значит, что все существующие ключи и значения из obj будут скопированы в новый объект. Этот подход позволяет сохранить все данные из исходного объекта без необходимости перечислять их по отдельности.
      isFavorite: false, //Здесь мы добавляем новое свойство isFavorite со значением false. Это свойство будет присутствовать в каждом новом объекте, созданном из data. Оно может использоваться, например, для обозначения того, является ли данный объект "избранным" пользователем.
      favoriteId: null, //Аналогично, здесь мы добавляем свойство favoriteId, устанавливая его значение в null. Это может быть использовано для хранения идентификатора, связанного с объектом, если он будет добавлен в "избранное" позже.
      isAdded: false //В этой строке мы добавляем еще одно свойство — isAdded, со значением false. Это может использоваться для отслеживания, был ли объект добавлен в какую-либо коллекцию или список.
    })); // После этого закрываем круглые скобки для метода map(), который возвращает новый массив объектов, содержащий все свойства оригинальных объектов, а также новые свойства, которые мы добавили.
    console.log('>>>>>>', items.value)
  } catch (err) {
    console.log(err)
  }
};

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))

});

watch(cart, () => {
  if (cart.length === 0) {
    cartButtonDisabled.value = true
  } else {
    cartButtonDisabled.value = false
  }
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems);
</script>

<template>
  <div class="flex justify-between items-center mb-5">
    <h2 class="text-3xl text-white mb-8 font-bold">All phones</h2>

    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">By name</option>
        <option value="price">By price(low to high)</option>
        <option value="-price">By price(high to low)</option>
      </select>

      <div class="relative ">
        <img src="/search.png" alt="Search" class="absolute w-5 left-3 top-2.5 fill-slate-600">
        <input
            @input="onChangeSearchInput"
            class="border rounded-md py-1.5 pl-11 pr-4 outline-none"
            type="text"
            placeholder="Search..."/>
      </div>
    </div>
  </div>

  <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus"/>

</template>
