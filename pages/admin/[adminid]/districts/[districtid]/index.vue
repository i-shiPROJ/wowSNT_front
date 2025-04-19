<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация об районе" />

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Таблица участков</b></template>
              <template #body>

                <!-- <el-table :data="distrincts" style="width: 100%" class="cur-pointer" @row-click="showParticipantInfo">
                  <el-table-column prop="fio" label="ФИО" min-width="200" />
                  <el-table-column label="Телефон" width="170">
                    <template #default="scope">
                      <div class="fc fc-row fc-align-content-center">
                        <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                        <a class="phone-link" :href="`tel:${scope.row.phoneNums}`"> {{ scope.row.phoneNums }}</a>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="part" label="Доля" width="70" />
                  <el-table-column prop="startDate" label="нач. собств" min-width="100" />
                  <el-table-column prop="endDate" label="оконч. собств" min-width="100"> </el-table-column>
                </el-table> -->

              </template>
            </wow-card>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>Старшие по району</b></template>
              <template #body>

              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>Документы</b></template>
              <template #body>

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
  title: 'Информация об районе'
});

import type { Distrinct } from '~/interface/District.interface';

import type { AreaOwnershipsDescr } from '~/interface/solution/AreaOwnershipsDescr.interface';
import type { Area } from '~/interface/Area.interface';

const route = useRoute();
let distrincts = ref<Distrinct[]>([]);
let area = ref<Area>();

onMounted(async () => {
  getDistrincts();
});

const getDistrincts = async () => {
  distrincts.value = await $fetch<Distrinct[]>(`district/${route.params.districtid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  console.log(distrincts);
  //Object.assign(areaOwnershops, allPersonsArea);
}

const getArea = async () => {
  area.value = await $fetch<Area>(``, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  }
  )
}

const showParticipantInfo = async (row: Area) => {
  navigateTo(`/admin/${route.params.adminid}/participant/${row.id}`)
}

///area_ownership/owners_descr/{area_id}
</script>

<style lang="less" scoped></style>