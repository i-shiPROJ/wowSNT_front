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
                        <el-select-v2 @click.stop @change="selectPerson" v-model="editingPersone.personId"
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
        <Confirm-dialog ref="confirmDialog" />


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
import type { Pagination } from '~/interface/Pagination.interface';


const route = useRoute();
const editDialog = ref();
const confirmDialog = ref();
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

const showParticipantInfo = async (row: AreaOwnershipsDescr) => {
  if (editingIndex.value === -1) navigateTo(`/admin/${route.params.adminid}/participant/${row.personId}`);
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
  personId: 0,
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
    personId: 1,
    part: 0,
    startDate: '',
    endDate: '',
  };
  areaOwnerships.value.push(newAreaOwnership);
  editPersoneInLand(areaOwnerships.value.length - 1, newAreaOwnership);
};

const editPersoneInLand = (index: number, row: AreaOwnershipsDescr) => {
  editingPersone.value = { ...row };
  fetchOptionsPersons();
  editingIndex.value = index;
};

const fetchOptionsPersons = async () => {
  const response = await $fetch<Pagination<Personinfo>>(`person/snt/${route.params.adminid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });

  Object.assign(allPersonInfo, response);

  optionsPersons.value = response.items.map((item: Personinfo) => ({
    value: item.id,
    label: `${item.lastName} ${item.firstName} ${item.patronymic}`
  }));
};

const selectPerson = () => {
  const changePersone = allPersonInfo.find(item => item.id === editingPersone.value.personId)!;
  editingPersone.value.fio = `${changePersone.lastName} ${changePersone.firstName} ${changePersone.patronymic}`;
  editingPersone.value.part = 0;
  editingPersone.value.phoneNum = changePersone.phoneNum;
  editingPersone.value.startDate = '';
  editingPersone.value.endDate = '';
}

const deletePersoneInLand = async (index: number) => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Удалить собственника с участка?`;
  confirmDialog.value.acceptFunction = async () => {
    try {
      await $fetch(`/area_ownership/${areaOwnerships.value[index].id}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'DELETE',
      });
    } catch (error: any) {
      console.error("Error:", error);
      ElMessage({
        message: error.data.message,
        type: 'error',
      });
    }
    confirmDialog.value.showCloseDialog();
    getAreaOwnerships();
  };
  confirmDialog.value.showConfirmDialog();
}

const cancelEdit = () => {
  if (areaOwnerships.value[areaOwnerships.value.length - 1].id === 0) {
    areaOwnerships.value.pop();
  }
  editingIndex.value = -1;
}

const savePersone = async () => {
  try {
    await $fetch(`/area_ownership`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'POST',
      body: JSON.stringify({
        id: editingPersone.value.id === 0 ? null : editingPersone.value.id,
        personId: editingPersone.value.personId,
        areaId: route.params.landid,
        part: editingPersone.value.part,
        startDate: editingPersone.value.startDate,
        endDate: editingPersone.value.endDate
      }),
    });
    editingIndex.value = -1;
    getAreaOwnerships();
  } catch (error: any) {
    console.error("Error:", error);
    ///TODO с бека приходит валидатор со свойствами, где ошибка, необходимо написать функцию для возврата ошибок
    ElMessage({
      message: error.data.message,
      type: 'error',
    });
  }
};

//TODO в документах на участках только доки на участок, а в каждом пользователе есть свои док-ты на участок(выписка из егрн о собтсвенности)
</script>

<style lang="less" scoped></style>