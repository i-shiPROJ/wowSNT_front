<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация об участнике" />

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>Данные участника</b></template>
              <template #body>
                <div class="info-user-view">
                  <div class="fc fc-col">
                    <div class="label-body fc fc-col">
                      <div>ФИО:</div>
                      <div class="area-naming-st">{{ `${person?.lastName} ${person?.firstName} ${person?.patronymic}` }}
                      </div>
                    </div>
                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Телефон:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                              <a class="phone-link" :href="`tel:${person?.phoneNums}`"> {{ person?.phoneNums }}</a>
                            </div>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="label-body fc fc-col">
                          <div>Email:</div>
                          <div class="area-naming-st">
                            <div class="fc fc-row fc-align-content-center">
                              <wow-icon :size="20" type="mdi" :path="$mdi.mdiEmailFastOutline" />
                              <a class="phone-link" :href="`mailto:${person?.email}`"> {{ person?.email }}</a>
                            </div>

                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </template>
              <template #footer>
                <el-button type="primary" @click="showPersonEdit()">Изменить</el-button>
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <wow-card>
              <template #header><b>Данные об участке</b></template>
              <template #body>
                <div class="info-user-view">
                  <div class="fc fc-col">
                    <div class="label-body fc fc-col">
                      <div>ФИО:</div>
                      <div class="area-naming-st">{{ `${person?.lastName} ${person?.firstName} ${person?.patronymic}` }}
                      </div>
                    </div>

                  </div>
                </div>
              </template>
              <template #footer>
                <el-button type="primary">Изменить</el-button>
              </template>
            </wow-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <wow-card>
              <template #header><b>Имеет роли</b></template>
              <template #body>
                <div class="info-user-view">
                  <div class="fc fc-col">
                    <div class="label-body fc fc-col">
                      <div>ФИО:</div>
                      <div class="area-naming-st">{{ `${person?.lastName} ${person?.firstName} ${person?.patronymic}` }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #footer>
                <el-button type="primary">Изменить</el-button>
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


        <PersonInfoDialog ref="personDialog" />
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Информация об участнике'
});

import type { Personinfo } from '~/interface/Personinfo.interface';

import type { AreaOwnershipsDescr } from '~/interface/solution/AreaOwnershipsDescr.interface';
import type { Area } from '~/interface/Area.interface';

const route = useRoute();
let areaOwnerships = ref<AreaOwnershipsDescr[]>([]);
const person = ref<Personinfo>();
const area = ref<Area>();

onMounted(async () => {
  getPerson();
});

const getPerson = async () => {
  person.value = await $fetch<Personinfo>(`person/${route.params.participiantid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  //Object.assign(areaOwnershops, allPersonsArea);
}

const getArea = async () => {
  console.log(route.params.participiantid);
  person.value = await $fetch<Personinfo>(`person/${route.params.participiantid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  //Object.assign(areaOwnershops, allPersonsArea);
  console.log(areaOwnerships);
}

const personDialog = ref();



const showPersonEdit = async () => {
  const loading = ElLoading.service({ text: 'Загрузка...', fullscreen: true, background: 'rgba(0, 0, 0, 0.7)' });
  try {
    const person: Personinfo = await $fetch<Personinfo>(`person/${route.params.participiantid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
    personDialog.value.parentFunctions.updatePersonInfo = getPerson();
    personDialog.value.showDialog(person);
  } catch (error) {
    console.error("Error:", error);
    ElMessage.error("Ошибка запроса");
  } finally {
    loading.close();
  }
};

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