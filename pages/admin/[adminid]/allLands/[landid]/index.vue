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
                        <div class="label-body fc fc-col">
                          <div>Кадастровый номер:</div>
                          <div class="area-naming-st">{{ `${area?.cadastralNum}` }} </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Район:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              {{ area?.sntId }}
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <div class="label-body fc fc-col">
                      <div>Адрес:</div>
                      <div class="area-naming-st">{{ `${area?.address}` }} </div>
                    </div>
                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Площадь участка:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              {{ area?.square }}
                            </div>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Кол-во проживающих:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              {{ `${area?.residentsNum} чел.` }}
                            </div>

                          </div>
                        </div>
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
                        <a class="phone-link" :href="`tel:${scope.row.phoneNums}`" @click.stop> {{ scope.row.phoneNums
                        }}</a>
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
  area.value = await $fetch<Area>(`area/${route.params.landid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  }
  )
}

const showParticipantInfo = async (row: Area) => {
  navigateTo(`/admin/${route.params.adminid}/participant/${row.id}`)
}

const editArea = ()=>{
  console.log('edit Area');
}

///area_ownership/owners_descr/{area_id}
</script>

<style lang="less" scoped>
.label-body {
  padding: 10px 0;

  .area-naming-st {
    padding: 10px;
    border-left: 4px solid #F56C6C;
  }
}
</style>