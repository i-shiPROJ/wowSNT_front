<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <wow-toppagetitle namePage="Реестр участников" />
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <Wow-card>
              <template #header><b>Участники СТ</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Добавить участника" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="addPerson()" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPlus" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>
              <template #body>

                <el-table :data="persons?.items" stripe style="width: 100%" class="cur-pointer" @row-click="showPersonInfo">
                  <el-table-column prop="lastName" label="Фамилия" min-width="170" />
                  <el-table-column prop="firstName" label="Имя" min-width="170" />
                  <el-table-column prop="patronymic" label="Отчество" min-width="170" />
                  <el-table-column prop="phoneNum" label="Телефон" width="230">
                    <template #default="scope">
                      <div class="fc fc-row fc-align-content-center">
                        <a :href="`tel:${scope.row.phoneNum}`" class="el-button el-button--info a-txt-dec-none no-select" @click.stop>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiCellphone" />
                          </el-icon>
                          {{ scope.row.phoneNum }}
                        </a>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="email" label="email" width="250" />
                  <el-table-column prop="residentsNum" label="" width="70">
                    <template #default="scope">
                      <el-tooltip content="Удалить участника" placement="bottom-end" effect="light">
                        <el-button type="danger" @click.stop="deletePerson(scope.row)" circle>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiTrashCanOutline" />
                          </el-icon>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>

                <el-pagination class="mt-20 mb-5" v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[1, 2, 100]"
                  layout="sizes, prev, pager, next" :total="persons?.totalItems || 0" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />

              </template>
            </Wow-card>
          </el-col>
        </el-row>

        <Person-add-edit-dialog ref="personAddDialog" label="Форма добавления участника"/>
        <Confirm-dialog ref="confirmDialog" />
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Участники СТ'
})

import { ref } from 'vue';
import type { Personinfo } from '~/interface/Personinfo.interface';
import type { Area } from '~/interface/Area.interface';
import type { Pagination } from '~/interface/Pagination.interface';

const personAddDialog = ref();
const confirmDialog = ref();

const router = useRouter();
const route = useRoute();
const persons = ref<Pagination<Personinfo[]>>();

onMounted(async () => {
  getAllPerson();
});

const getAllPerson = async () => {
  try {
    persons.value = await $fetch<Pagination<Personinfo[]>>(`person/snt/${route.params.adminid}?page_num=${currentPage.value}&page_size=${pageSize.value}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  }
  catch (error) {
    console.error(error)
  }
}

const showPersonInfo = (row: Area) => {
  navigateTo(`${router.currentRoute.value.path}/${row.id}`)
}

const addPerson = () => {
  personAddDialog.value.showDialog();
  personAddDialog.value.parentFunctions.updateParrentTable = getAllPerson;
}

const deletePerson = (row: Personinfo) => {

  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Удалить выбранного участника?`;
  confirmDialog.value.acceptFunction = async () => {
    try {
      await $fetch(`person/${row.id}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'delete'
      });
      getAllPerson();
      confirmDialog.value.showCloseDialog();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  confirmDialog.value.showConfirmDialog();
}

const currentPage = ref(1);
const pageSize = ref(100);

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  currentPage.value = 1; // сбрасываем на первую страницу
  getAllPerson();
}

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  getAllPerson();
}


</script>

<style lang="less" scoped></style>