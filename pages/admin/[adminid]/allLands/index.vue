<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Все участки</b></template>
              <template #body>

                <el-table :data="areas" stripe style="width: 100%" class="cur-pointer" @row-click="showLandInfo">
                  <el-table-column prop="cadastralNum" label="Кад. номер" min-width="200" />
                  <el-table-column prop="address" label="Адрес" min-width="300" />
                  <el-table-column prop="square" label="Площадь" />
                  <el-table-column prop="residentsNum" label="Доля" />
                </el-table>

              </template>
            </wow-card>
          </el-col>
        </el-row>

        <LendInfoDialog ref="landDialog" />

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
import type { PersoneInfoSmall } from '~/interface/PersoneInfoSmall';

const landDialog = ref();

const router = useRouter();
const route = useRoute();
const areas = ref<Area[]>([]);

onMounted(async () => {
  getAllLend();
});

const getAllLend = async () => {
  try {
    areas.value = await $fetch<Area[]>(`area/${route.params.adminid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  }
  catch (error) {
    console.error(error)
  }
}

const showLandInfo = async (row: Area) => {
  navigateTo(`${router.currentRoute.value.path}/${row.id}`)
  // const allPersonsArea = await $fetch<PersoneInfoSmall[]>(`area_ownership/owners_descr/${row.id}`, {
  //   baseURL: useRuntimeConfig().public.baseURL,
  //   method: 'GET'
  // });
  // console.log(allPersonsArea, row);
  // Object.assign(landDialog.value.allPersonsArea, allPersonsArea);
  // landDialog.value.showDialog();
}


</script>

<style lang="less" scoped></style>