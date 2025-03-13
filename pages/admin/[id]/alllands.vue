<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card class="cur-pointer">
              <template #header><b>Все участки</b></template>
              <template #body>

                  <el-table :data="areas" stripe style="width: 100%">
                    <el-table-column prop="cadastralNum" label="Кад. номер" min-width="200"/>
                    <el-table-column prop="address" label="Адрес" min-width="300"/>
                    <el-table-column prop="square" label="Площадь" />
                    <el-table-column prop="residentsNum" label="Доля" />
                  </el-table>

              </template>
            </wow-card>
          </el-col>
        </el-row>


      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Участки'
})

import { ref } from 'vue';
import type { Area } from '~/interface/Area.interface';

const router = useRouter();
const areas = ref<Area[]>([]);

onMounted(async () => {
  getAllLend();
});

const getAllLend = async () => {
  try {
    areas.value = await $fetch<Area[]>(`area/${router.currentRoute.value.params.id}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  }
  catch (error) {
    console.error(error)
  }


  // const response = await $fetch(`area/${router.currentRoute.value.params.id}`, {
  //   baseUrl: useRuntimeConfig().public.baseURL,
  //   method: 'GET'
  // })
  // const data = await response.json();

}

</script>

<style lang="less" scoped>

</style>