<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card class="cur-pointer">
              <template #header><b>Список заявок</b></template>
              <template #body>

                <el-table :data="solutionData" style="width: 100%">
                  <el-table-column v-for="(item, index) in getColumns()" :key="item.prop" :prop="item.prop"
                    :label="item.label" :min-width="index == 0 ? '50' : '100'" />

                  <el-table-column fixed="right" min-width="100">
                    <template #default="scope">
                      <el-button type="primary" @click="showSolution(scope.$index, scope.row)">открыть</el-button>
                    </template>
                  </el-table-column>

                </el-table>

              </template>
            </wow-card>
          </el-col>
        </el-row>

        <Solution-dialog ref="solutiondialog" />

      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Заявки на вступление'
})

import { useUserStore } from '~/stores/userInfo';
import { ref, watch, watchEffect } from 'vue';
import type { SolutionInterface } from '~/components/widgets/admin/solution/interface/SolutionInterface';
import type { SolutionEdit } from '~/interface/solution/SolutionEdit.interface';
import { ElMessage, ElLoading } from 'element-plus';

interface ColumnType {
  prop: string;
  label: string;
}

const userInfoStore = useUserStore();

const route = useRoute();
/* const router = useRouter();
const currentRoute = router.currentRoute.value; */

const solutionData = ref<SolutionInterface[]>([]);


onMounted(async () => {
  //loadData();
});

const loadData = async () => {
  try {
    solutionData.value = await $fetch<SolutionInterface[]>(`/register-request/not-processed/${route.params.adminid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  } catch (error) {
    console.error("Error:", error);
    ElMessage.error("Ошибка запроса");
  }
}

const getColumns = () => {
  return [
    { prop: "id", label: "id" },
    { prop: "cadastralNum", label: "Кадастровый номер" },
    { prop: "email", label: "email" },
    { prop: "lastName", label: "Фамилия" },
    { prop: "firstName", label: "Имя" },
    { prop: "phoneNum", label: "Телефон" },
    { prop: "requestDate", label: "Дата регистрации" },

  ]
}

const solutiondialog = ref();

const showSolution = async (index: number, row: SolutionInterface) => {
  const loading = ElLoading.service({ text: 'Загрузка...', fullscreen: true, background: 'rgba(0, 0, 0, 0.7)' });
  try {
    //TODO вставить в solutiondialog обновление из него данных в текущей таблице, а не через watch
    const response:SolutionEdit = await $fetch<SolutionEdit>(`register-request/solution/${row.id}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "GET",
    });

    console.log('response', response);

    solutiondialog.value.showDialog(response);
  } catch (error) {
    console.error("Error:", error);
    ElMessage.error("Ошибка запроса");
  } finally {
    loading.close();
  }
};

watch(
  () => solutiondialog.value?.dialogFormVisible,
  (newValue) => {
    if (newValue == false) {
      loadData();
    }
  }
);

</script>

<style type="less" scoped></style>