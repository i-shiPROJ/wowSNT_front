<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация об участке" />
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>Об участке</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Редактировать участок" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="editArea" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPencilOutline" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>

              <template #body>
                <div class="info-user-view">
                  <div class="fc fc-col">
                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <wow-label-text label="Кадастровый номер:" :text="area?.cadastralNum" color="coral" />
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <wow-label-text label="Район:" :text="area?.districtTitle" color="coral" />
                      </el-col>
                    </el-row>
                    <wow-label-text label="Адрес:" :text="area?.address" color="coral" />
                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <wow-label-text label="Площадь участка:" :text="String(area?.square ?? '')" color="coral" />
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <wow-label-text label="Кол-во проживающих:" :text="String(area?.residentsNum ?? '')"
                          color="coral" />
                      </el-col>
                    </el-row>
                  </div>
                </div>
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
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Таблица собственников</b></template>
              <template #body>

                <el-table :data="areaOwnerships" style="width: 100%" class="cur-pointer"
                  @row-click="showParticipantInfo">
                  <el-table-column prop="fio" label="ФИО" min-width="200" />
                  <el-table-column label="Телефон" width="170">
                    <template #default="scope">
                      <div class="fc fc-row fc-align-content-center">
                        <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                        <a class="phone-link" :href="`tel:${scope.row.phoneNums}`" @click.stop>
                          {{ scope.row.phoneNums }}
                        </a>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="part" label="Доля" width="70" />
                  <el-table-column prop="startDate" label="нач. собств" min-width="100" />
                  <el-table-column prop="endDate" label="оконч. собств" min-width="100"> </el-table-column>
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
        </el-row>


        <land-add-edit-dialog ref="editDialog" edit />

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
const editDialog = ref();
let areaOwnerships = ref<AreaOwnershipsDescr[]>([]);
let area = reactive(<Area>{});

onMounted(async () => {
  getAreaOwnerships();
  getArea();
});

const getAreaOwnerships = async () => {
  areaOwnerships.value = await $fetch<AreaOwnershipsDescr[]>(`area_ownership/owners_descr/${route.params.landid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  //Object.assign(areaOwnershops, allPersonsArea);
}

const getArea = async () => {
  const data = await $fetch<Area>(`area/${route.params.landid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  Object.assign(area, data);
};

const showParticipantInfo = async (row: Area) => {
  navigateTo(`/admin/${route.params.adminid}/participant/${row.id}`)
}

const editArea = () => {
  Object.assign(editDialog.value.area, area);
  editDialog.value.showDialog();
  editDialog.value.parentFunctions.updateParrentTable = getArea;
};
//TODO таблица собтсвенников кнопка редактирования и кнопка просмотр исторических данных, необходимо добавить в таблицу для каждой строки кнопку 
// редактировани/сохранения, так-же кнопку + для добавления нового собственника
// в документах на участках только доки на участок, а в каждом пользователе есть свои док-ты на участок(выписка из егрн о собтсвенности)

///area_ownership/owners_descr/{area_id}
</script>

<style lang="less" scoped></style>