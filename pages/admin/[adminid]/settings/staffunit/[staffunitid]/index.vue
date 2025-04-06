<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация о должности" />

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>{{ currentStuff?.jobTitle }}</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Редактирвоать" placement="bottom-end" effect="light">
                    <el-button @click="editStuff" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPencilOutline" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>

                  <el-tooltip content="Удалить" placement="bottom-end" effect="light">
                    <el-button type="danger" @click="removeStuff" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiTrashCanOutline" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>
              <template #body>
                <div v-if="!edit">
                  <div class="fc fc-col">
                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Дата ввода:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              <span class=""> {{ currentStuff?.beginDate }}</span>
                            </div>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Дата вывода:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              <span class=""> {{ currentStuff?.endDate }}</span>
                            </div>

                          </div>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Ставка:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              <span class=""> {{ currentStuff?.ratesNum }}</span>
                            </div>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Зарплата:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              <span class=""> {{ `${currentStuff?.salary.toLocaleString()} руб.` }}</span>
                            </div>

                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div v-else="edit">
                  edit
                </div>
              </template>
              <template #footer>
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>Состоят в должности </b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Добавить в должность" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="addPersone" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPlus" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip content="Удалить из должности" placement="bottom-end" effect="light">
                    <el-button type="danger" @click="removeStuff" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiTrashCanOutline" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>
              <template #body>
                <!-- <el-table :data="allStuffUnit" stripe style="width: 100%" class="cur-pointer"
                  @row-click="showStuffInfo">
                  <el-table-column prop="jobTitle" label="Должность" min-width="200" />
                  <el-table-column prop="ratesNum" label="Ставка" min-width="300" />
                  <el-table-column prop="salary" label="Зарплата">
                    <template #default="scope">
                      {{ `${scope.row.salary.toLocaleString()} руб.` }}
                    </template>
    </el-table-column>
    </el-table> -->
              </template>
              <template #footer>
              </template>
            </wow-card>
          </el-col>

        </el-row>

        <Confirm-dialog ref="confirmDialog" />

      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Информация о должности'
});

import type { Stuff_unit } from '~/interface/Stuff_unit.interface';

const route = useRoute();

const currentStuff = ref<Stuff_unit>();
let edit = ref<boolean>(false);
const confirmDialog = ref();

onMounted(async () => {
  getCurrentStuff();
});

const getCurrentStuff = async () => {
  currentStuff.value = await $fetch<Stuff_unit>(`staff_unit/${route.params.staffunitid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  //Object.assign(areaOwnershops, allPersonsArea);
}

const editStuff = () => {
  edit.value = !edit.value;
}

const removeStuff = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Удалить должность?`;
  confirmDialog.value.acceptFunction = async () => {
    confirmDialog.value.showCloseDialog();
    await $fetch(`/staff_unit/${route.params.staffunitid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'DELETE',
    });
    navigateTo(`/admin/${route.params.adminid}/settings/staffunit`);
  };
  confirmDialog.value.showConfirmDialog();
}

const addPersone = () => {
  console.log('add person');
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