<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация об участнике" />

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
            <wow-card>
              <template #header><b>Данные участника</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Редактировать участника" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="editParticipiant" circle>
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
                    <wow-label-text label="ФИО:"
                      :text="`${person?.lastName} ${person?.firstName} ${person?.patronymic}`" color="coral" />
                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <wow-label-text label="Телефон:" color="coral">
                          <template #body>
                            <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                            <a class="phone-link" :href="`tel:${person?.phoneNum}`"> {{ person?.phoneNum }}</a>
                          </template>
                        </wow-label-text>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <wow-label-text label="Email:" color="coral">
                          <template #body>
                            <wow-icon :size="20" type="mdi" :path="$mdi.mdiEmailFastOutline" />
                            <a class="phone-link" :href="`mailto:${person?.email}`"> {{ person?.email }}</a>
                          </template>
                        </wow-label-text>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </template>
              <template #footer>
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5">
            <wow-card>
              <template #header><b>Доп. телефоны</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Редактировать номера  телефонов" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="editParticipiant" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPencilOutline" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>

              <template #body>
                <wow-label-text color="coral">
                  <template #body>
                    <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                    <a class="phone-link" :href="`tel:${person?.phoneNum}`"> {{ person?.phoneNum }}</a>
                  </template>
                </wow-label-text>
                <wow-label-text color="coral">
                  <template #body>
                    <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                    <a class="phone-link" :href="`tel:${person?.phoneNum}`"> {{ person?.phoneNum }}</a>
                  </template>
                </wow-label-text>
                <wow-label-text color="coral">
                  <template #body>
                    <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                    <a class="phone-link" :href="`tel:${person?.phoneNum}`"> {{ person?.phoneNum }}</a>
                  </template>
                </wow-label-text>
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5">
            <wow-card>
              <template #header><b>Имеет доступ</b></template>
              <template #body>
                <div class="info-user-view">
                  <div class="fc fc-col">
                    <div class="label-body fc fc-col">
                      <div>К участкам закрепленного района</div>
                      <div>К долгам по закреп. району</div>
                      <div>К номерам телефонов собственников закреп. района</div>
                      <!-- <div v-if="(person?.memberships.length ?? 0) === 0">
                        <div class="area-naming-st">Садовод</div>
                      </div>

                      <div v-else>
                        <div>Роли:</div>
                        <div class="area-naming-st">
                          здесь роли
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </template>
              <template #footer> </template>
            </wow-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5">
            <wow-card>
              <template #header><b>Закрепленный район</b></template>
              <template #body>
                <div class="info-user-view">
                  <div class="fc fc-col">
                    <div class="label-body fc fc-col">
                      <!-- <div v-if="(person?.memberships.length ?? 0) === 0">
                        <div class="area-naming-st">Садовод</div>
                      </div>

                      <div v-else>
                        <div>Роли:</div>
                        <div class="area-naming-st">
                          здесь роли
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </template>
              <template #footer> </template>
            </wow-card>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>Данные об участках</b></template>
              <template #body>
                <div class="info-user-view">
                  <div class="fc fc-col">
                    <wow-label-text v-for="area in area_ownerships" :key="area.id" :label="area.area.cadastralNum"
                      color="coral">
                      <template #body>
                        <div class="fc fc-col wow-w-100" style="">
                          <div>{{ area.area.address }}</div>
                          <div class="fc padding-15-0 fc-justify-space-b fc-align-center">
                            <div>
                              {{ `Владеет с ${area.startDate}` }}
                            </div>
                            <div>долг: 4500</div>
                          </div>
                          <div class="fc fc-justify-end">
                            <el-button @click="viewLand(area.area.id)" type="primary">Просмотр</el-button>
                          </div>
                        </div>
                      </template>
                    </wow-label-text>

                  </div>
                </div>
              </template>
              <template #footer>
              </template>
            </wow-card>
          </el-col>

          <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <wow-card>
              <template #header><b>Документы</b></template>
              <template #body>

              </template>
            </wow-card>
          </el-col> -->
        </el-row>

        <Person-add-edit-dialog ref="personDialog" edit />
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Информация об участнике'
});

import type { Personinfo } from '~/interface/Personinfo.interface';
import type { Area_ownerships } from '~/interface/Area_ownerships';
import type { Memberships } from '~/interface/Memberships.interface';

const route = useRoute();
const person = reactive(<Personinfo>{});
const area_ownerships = ref<Area_ownerships[]>([]);
const memberships = reactive(<Memberships>{});

onMounted(async () => {
  getPerson();
  getArea_ownerships();
  // getMemberShips();
});

const getPerson = async () => {
  const data = await $fetch<Personinfo>(`person/${route.params.participiantid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  Object.assign(person, data);
}

const getArea_ownerships = async () => {
  area_ownerships.value = await $fetch<Area_ownerships[]>(`area_ownership/${route.params.participiantid}?sntId=${route.params.adminid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
}


const personDialog = ref();

// const showPersonEdit = async () => {
//   const loading = ElLoading.service({ text: 'Загрузка...', fullscreen: true, background: 'rgba(0, 0, 0, 0.7)' });
//   try {
//     const person: Personinfo = await $fetch<Personinfo>(`person/${route.params.participiantid}`, {
//       baseURL: useRuntimeConfig().public.baseURL,
//       method: 'GET'
//     });
//     personDialog.value.parentFunctions.updatePersonInfo = getPerson();
//     personDialog.value.showDialog(person);
//   } catch (error) {
//     console.error("Error:", error);
//     ElMessage.error("Ошибка запроса");
//   } finally {
//     loading.close();
//   }
// };

const editParticipiant = () => {
  Object.assign(personDialog.value.person, person);
  personDialog.value.showDialog();
  personDialog.value.parentFunctions.updateTable = getPerson;
}

const viewLand = (landId: number) => {
  navigateTo(`/admin/${route.params.adminid}/allLands/${landId}`)
}

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