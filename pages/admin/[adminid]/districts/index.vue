<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Реестр районов" />
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Все районы</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Добавить район" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="addDistrinct()" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPlus" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>

                </div>
              </template>
              <template #body>

                <el-table :data="distriсts" stripe style="width: 100%" class="cur-pointer"
                  @row-click="showDistrinctInfo">
                  <el-table-column prop="id" label="id" min-width="200" />
                  <el-table-column prop="title" label="Название" min-width="300" />
                  <el-table-column prop="seniorId" label="id старшего" />
                  <el-table-column prop="residentsNum" label="" width="70">
                    <template #default="scope">
                      <el-tooltip content="Удалить участок" placement="bottom-end" effect="light">
                        <el-button type="danger" @click.stop="deleteDistrict(scope.row)" circle>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiTrashCanOutline" />
                          </el-icon>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>

              </template>
            </wow-card>
          </el-col>
        </el-row>

        <District-add-edit-dialog ref="dialogDistrinct" />
        <Confirm-dialog ref="confirmDialog" />

      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Районы'
})

import { ref } from 'vue';
import type { District } from '~/interface/District.interface';

const dialogDistrinct = ref();
const confirmDialog = ref();

const router = useRouter();
const route = useRoute();
const distriсts = ref<District[]>([]);


onMounted(async () => {
  getAllDistrict();
});

const getAllDistrict = async () => {
  try {
    distriсts.value = await $fetch<District[]>(`district/snt/${route.params.adminid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });

  }
  catch (error) {
    console.error(error)
  }
}

const showDistrinctInfo = async (row: District) => {
  navigateTo(`${router.currentRoute.value.path}/${row.id}`)
}

const addDistrinct = () => {
  dialogDistrinct.value.showDialog();
  dialogDistrinct.value.parentFunctions.updateParrentTable = getAllDistrict;
}

const deleteDistrict = (row: District) => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Удалить выбранный район?`;
  confirmDialog.value.acceptFunction = async () => {
    try {
      await $fetch<District[]>(`district/${row.id}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'delete'
      });
      getAllDistrict();
      confirmDialog.value.showCloseDialog();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  confirmDialog.value.showConfirmDialog();
}


</script>

<style lang="less" scoped></style>