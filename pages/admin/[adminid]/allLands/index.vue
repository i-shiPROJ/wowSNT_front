<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Реестр участков" />
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Все участки</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Добавить участок" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="addLand" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPlus" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>

                  <el-tooltip content="Импортировать участки(не активно)" placement="bottom-end" effect="light">
                    <el-button type="info" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiFileImport" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>

              <template #body>

                <el-table :data="areas?.items" stripe style="width: 100%" class="cur-pointer" @row-click="showLandInfo">
                  <el-table-column prop="cadastralNum" label="Кад. номер" width="200" />
                  <el-table-column prop="address" label="Адрес" min-width="300" />
                  <el-table-column prop="square" label="Площадь м²" width="120" />
                  <el-table-column prop="residentsNum" label="Кол-во прож-их" width="100" />
                  <el-table-column prop="residentsNum" label="" width="70">
                    <template #default="scope">
                      <el-tooltip content="Удалить участок" placement="bottom-end" effect="light">
                        <el-button type="danger" @click.stop="deleteArea(scope.row)" circle>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiTrashCanOutline" />
                          </el-icon>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
                
                <el-pagination class="mt-20 mb-5" v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 50, 100]"
                  layout="sizes, prev, pager, next" :total="areas?.totalItems || 0" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />

              </template>
            </wow-card>
          </el-col>
        </el-row>

      </div>

      <land-add-edit-dialog ref="addDialog" />
      <Confirm-dialog ref="confirmDialog" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Участки'
})

import { ref } from 'vue';
import type { Area } from '~/interface/Area.interface';
import type { Pagination } from '~/interface/Pagination.interface';
import type { PersoneInfoSmall } from '~/interface/PersoneInfoSmall';

const landDialog = ref();

const router = useRouter();
const route = useRoute();
const areas = ref<Pagination<Area[]>>();
const addDialog = ref();
const confirmDialog = ref();

const currentPage = ref(1);
const pageSize = ref(100);

onMounted(async () => {
  getAllLend();
});

const getAllLend = async () => {
  try {
    areas.value = await $fetch<Pagination<Area[]>>(`area/snt/${route.params.adminid}?page_num=${currentPage.value}&page_size=${pageSize.value}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  }
  catch (error) {
    console.error(error)
  }
}

const showLandInfo = async (row: Area) => {
  navigateTo(`${router.currentRoute.value.path}/${row.id}`)
}

const addLand = () => {
  addDialog.value.showDialog();
  addDialog.value.parentFunctions.updateParrentTable = getAllLend;
}

const deleteArea = (row: Area) => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Удалить выбранный участок?`;
  confirmDialog.value.acceptFunction = async () => {
    try {
      await $fetch<Area[]>(`area/${row.id}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'delete'
      });
      getAllLend();
      confirmDialog.value.showCloseDialog();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  confirmDialog.value.showConfirmDialog();
}

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  currentPage.value = 1; // сбрасываем на первую страницу
  getAllLend();
}

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  getAllLend();
}

</script>

<style lang="less" scoped></style>