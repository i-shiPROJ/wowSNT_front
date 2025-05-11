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
              <template #header><b>Документы участка</b></template>
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
                  <el-table-column prop="fio" label="ФИО" min-width="200">
                    <template #default="scope">
                      <div v-if="editingIndex !== scope.$index">{{ scope.row.fio }}</div>
                      <div v-else>
                        <el-select-v2 @click.stop @change="selectPerson" v-model="editingPersone.id"
                          placeholder="Выберите ответственного" :options="optionsPersons" filterable />
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column label="Телефон" width="170">
                    <template #default="scope">
                      <div v-if="editingIndex !== scope.$index" class="fc fc-row fc-align-content-center">
                        <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                        <a class="phone-link" :href="`tel:${scope.row.phoneNums}`" @click.stop>
                          {{ scope.row.phoneNums }}
                        </a>
                      </div>
                      <div v-else>{{ editingPersone.phoneNum }}</div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="part" label="Доля">
                    <template #default="scope">
                      <div v-if="editingIndex !== scope.$index">{{ scope.row.part }}</div>
                      <div v-else>
                        <el-input-number @click.stop v-model="editingPersone.part" :min="0.1" :step="0.01" :max="1" />
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="startDate" label="нач. собств">
                    <template #default="scope">
                      <div v-if="editingIndex !== scope.$index">{{ scope.row.startDate }}</div>
                      <div v-else>
                        <el-date-picker @click.stop v-model="editingPersone.startDate" type="date"
                          placeholder="Выберите дату" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                          style="width: 100%;" />
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="endDate" label="оконч. собств">
                    <template #default="scope">
                      <div v-if="editingIndex !== scope.$index">{{ scope.row.endDate }}</div>
                      <div v-else>
                        <el-date-picker @click.stop v-model="editingPersone.endDate" type="date"
                          placeholder="Выберите дату" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                          style="width: 100%;" />
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column width="120">
                    <template #default="scope">
                      <div class="fc fc-row fc-align-content-center">
                        <el-button v-if="editingIndex !== scope.$index" type="primary"
                          @click.stop="editPersoneInLand(scope.$index, scope.row)" circle>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiPencilOutline" />
                          </el-icon>
                        </el-button>

                        <el-button v-else type="success" @click.stop="savePersone()" circle>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiContentSave" />
                          </el-icon>
                        </el-button>

                        <el-button v-if="editingIndex !== scope.$index" type="danger"
                          @click.stop="deletePersoneInLand(scope.$index)" circle>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiTrashCanOutline" />
                          </el-icon>
                        </el-button>

                        <el-button v-else type="warning" @click.stop="cancelEdit()" circle>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiCancel" />
                          </el-icon>
                        </el-button>

                      </div>

                    </template>
                  </el-table-column>
                </el-table>

                <div class="fc fc-justify-center mt-15">
                  <el-button @click="addPersoneInLand">
                    <wow-icon :size="20" type="mdi" :path="$mdi.mdiPlus" />
                    Добавить собственника участка
                  </el-button>
                </div>

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
import type { Personinfo } from '~/interface/Personinfo.interface';


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

const editingIndex = ref(-1);
const editingPersone = ref<AreaOwnershipsDescr>({
  fio: '',
  phoneNum: '',
  phoneNums: '',
  id: 0,
  part: 0,
  startDate: '',
  endDate: '',
});
const optionsPersons = ref<{ value: number; label: string; }[]>([]);
const allPersonInfo = reactive<Personinfo[]>([]);


const addPersoneInLand = () => {
  let newAreaOwnership: AreaOwnershipsDescr = {
    fio: '',
    phoneNum: '',
    phoneNums: '',
    id: 0,
    part: 0,
    startDate: '',
    endDate: '',
  };
  areaOwnerships.value.push(newAreaOwnership);
  editPersoneInLand(areaOwnerships.value.length - 1, newAreaOwnership);
  console.log('object, ', areaOwnerships.value);
};

const editPersoneInLand = (index: number, row: AreaOwnershipsDescr) => {
  editingPersone.value = { ...row };
  fetchOptionsPersons();
  editingIndex.value = index;
};

const fetchOptionsPersons = async () => {
  const response = await $fetch<Personinfo[]>(`person/snt-members/${route.params.adminid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });

  Object.assign(allPersonInfo, response);

  optionsPersons.value = response.map(item => ({
    value: item.id,
    label: `${item.lastName} ${item.firstName} ${item.patronymic}`
  }));
};

const selectPerson = () => {
  const changePersone = allPersonInfo.find(item => item.id === editingPersone.value.id)!;
  editingPersone.value.fio = `${changePersone.lastName} ${changePersone.firstName} ${changePersone.patronymic}`;
  editingPersone.value.part = 0;
  editingPersone.value.phoneNum = changePersone.phoneNum;
  editingPersone.value.startDate = '';
  editingPersone.value.endDate = '';
}

const deletePersoneInLand = (index: number) => {
  //TODO еще в разработке на беке
  areaOwnerships.value.splice(index);
}

const cancelEdit = () => {
  editingIndex.value = -1;
}

const savePersone = () => {
  console.log(editingPersone.value);

  // POST: /area_ownership

  // if (editingPhone.value && /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/.test(editingPhone.value)) {
  //   person.addPhoneNums[index] = editingPhone.value;
  //   editingIndex.value = -1;
  //   editingPhone.value = '';
  // }else{
  //   ElMessage({
  //     message: 'Неправильный номер телефона!',
  //     type: 'error',
  //     appendTo: '.el-overlay',
  //   });
  // }

};

//TODO таблица собтсвенников кнопка редактирования и кнопка просмотр исторических данных, необходимо добавить в таблицу для каждой строки кнопку 
// редактировани/сохранения, так-же кнопку + для добавления нового собственника
// в документах на участках только доки на участок, а в каждом пользователе есть свои док-ты на участок(выписка из егрн о собтсвенности)

///area_ownership/owners_descr/{area_id}
</script>

<style lang="less" scoped></style>