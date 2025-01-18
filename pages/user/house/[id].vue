<template>

  <wow-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
    <template #body>
      <div class="fc fc-row fc-wrap fc-justify-space-b">

        <wow-card-col class="cur-pointer" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <template #header><b>Информация о вашем участке {{idHouse }}</b></template>
          <template #body>
            <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">

              <wow-icon type="mdi" :path="$mdi.mdiHomeSwitchOutline" style="width: 70px; height: 70px;"></wow-icon>
              <span>Режим садовода</span>
            </div>
          </template>
        </wow-card-col>

      </div>

    </template>
  </wow-col>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

definePageMeta({
  layout: 'user'
})

const route = useRoute();
const idHouse = computed(() => {
  console.log(route.params);
  return route.params.id
});

</script>

<style scoped></style>