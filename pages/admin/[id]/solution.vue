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
import { useUserStore } from '~/stores/userInfo';
import { ref } from 'vue';
import type { SolutionInterface } from '~/components/widgets/admin/solution/interface/SolutionInterface';



interface ColumnType {
  prop: string;
  label: string;
}

const userInfoStore = useUserStore();

const router = useRouter();
const currentRoute = router.currentRoute.value;

const solutionData = ref<SolutionInterface[]>([]);


onMounted(async () => {
  try {
    const response = await fetch(`${useRuntimeConfig().public.baseURL}/register-request/not-processed/${currentRoute.params.id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.authToken}`,
      },
    });

    if (response.status === 401) {
      ElMessage.error("Ошибка авторизации");
      navigateTo(`/auth/SignIn`);
      return;
    }

    if (!response.ok) throw new Error("Ошибка сети");

    const rawData = await response.json();
    console.log(rawData);
    solutionData.value = rawData;
  } catch (error) {
    console.error("Error:", error);
    ElMessage.error("Ошибка запроса");
  }
});


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

const showSolution = (index: number, row: SolutionInterface) => {
  console.log(solutiondialog);
  console.log(index, row);
  solutiondialog.value.showDialog(row, solutionData.value);

}

</script>

<style type="less" scoped></style>