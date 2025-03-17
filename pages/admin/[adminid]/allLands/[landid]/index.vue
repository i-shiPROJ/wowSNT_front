<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация об участке" />

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Таблица собственников по текущему участку</b></template>
              <template #body>

                <el-table :data="areaOwnershops" style="width: 100%">
                  <el-table-column prop="fio" label="ФИО" width="180" />
                  <el-table-column prop="part" label="Доля" width="180" />
                  <el-table-column prop="startDate" label="нач. собств" />
                  <el-table-column prop="endDate" label="оконч. собств"> </el-table-column>
                </el-table>

              </template>
            </wow-card>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Таблица собственников по текущему участку</b></template>
              <template #body>



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
  title: 'Информация об участке'
});

import type { AreaOwnershipsDescr } from '~/interface/solution/AreaOwnershipsDescr.interface';

const route = useRoute();
let areaOwnershops = ref<AreaOwnershipsDescr[]>([]);

onMounted(async () => {
  getAreaOwnerships();
});

const getAreaOwnerships = async () => {
  console.log(route.params.adminid);
  areaOwnershops.value = await $fetch<AreaOwnershipsDescr[]>(`area_ownership/owners_descr/${route.params.landid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  //Object.assign(areaOwnershops, allPersonsArea);
console.log(areaOwnershops);
}

///area_ownership/owners_descr/{area_id}
</script>

<style lang="less" scoped></style>