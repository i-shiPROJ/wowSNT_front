<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация об участке" />

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Таблица собственников</b></template>
              <template #body>

                <el-table :data="areaOwnerships" style="width: 100%">
                  <el-table-column prop="fio" label="ФИО" width="auto" />
                  <el-table-column label="Телефон" width="auto">
                    <template #default="scope">
                      <div class="fc fc-row fc-align-content-center">
                        <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                        <a class="phone-link" :href="`tel:${scope.row.phoneNums}`"> {{ scope.row.phoneNums }}</a>
                      </div>

                    </template>
                  </el-table-column>
                  <el-table-column prop="part" label="Доля" width="70" />
                  <el-table-column prop="startDate" label="нач. собств" />
                  <el-table-column prop="endDate" label="оконч. собств"> </el-table-column>
                </el-table>

              </template>
            </wow-card>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>История оплат</b></template>
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
  title: 'Информация об участке'
});

import type { AreaOwnershipsDescr } from '~/interface/solution/AreaOwnershipsDescr.interface';
import type { Area } from '~/interface/Area.interface';

const route = useRoute();
let areaOwnerships = ref<AreaOwnershipsDescr[]>([]);
let area = ref<Area>();

onMounted(async () => {
  getAreaOwnerships();
});

const getAreaOwnerships = async () => {
  console.log(route.params.adminid);
  areaOwnerships.value = await $fetch<AreaOwnershipsDescr[]>(`area_ownership/owners_descr/${route.params.landid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  //Object.assign(areaOwnershops, allPersonsArea);
  console.log(areaOwnerships);
}

const getArea = async () => {
  area.value = await $fetch<Area>(``, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  }
  )
}

///area_ownership/owners_descr/{area_id}
</script>

<style lang="less" scoped>

.phone-link {
  text-decoration: none;
  color: inherit;
  margin-left: 5px;
}
</style>