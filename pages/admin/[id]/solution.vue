<template>

  <NuxtLayout name="admin">
    <template #main>

      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <wow-card class="cur-pointer">
            <template #header><b>Список заявок</b></template>
            <template #body>

              <el-table :data="solutionData" style="width: 100%">
                <el-table-column v-for="item in getColumns()" :key="item.prop" :prop="item.prop" :label="item.label" min-width="100"/>

                <el-table-column fixed="right" min-width="100">
                  <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">
                      <el-button type="primary">открыть</el-button>
                    </el-button>

                  </template>
                </el-table-column>
              
              </el-table>

            </template>
          </wow-card>
        </el-col>
      </el-row>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userInfo';

interface DataSolutionType {
  cadastralNum: string;
  email: string;
  firstName: string;
  id: number;
  isProcessed: boolean;
  lastName: string;
  patronymic: string;
  phoneNum: string;
  processDate: string;
  requestDate: string;
}

interface ColumnType {
  prop: string;
  label: string;
}

const userInfoStore = useUserStore();

const router = useRouter();
const currentRoute = router.currentRoute.value;

const solutionData = ref<DataSolutionType[]>([]);

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
    solutionData.value = rawData.map((item: any) => ({
      cadastralNum: item.cadastralNum,
      email: item.email,
      lastName: item.lastName,
      firstName: item.firstName,
      phoneNum: item.phoneNum,
      requestDate: item.requestDate,
    }));
  } catch (error) {
    console.error("Error:", error);
    ElMessage.error("Ошибка запроса");
  }
});
const handleClick = () => {
  console.log('click')
}

const getColumns = () => {
  return [
    { prop: "cadastralNum", label: "Кадастровый номер" },
    { prop: "email", label: "email" },
    { prop: "lastName", label: "Фамилия" },
    { prop: "firstName", label: "Имя" },
    { prop: "phoneNum", label: "Телефон" },
    { prop: "requestDate", label: "Дата регистрации" },

  ]
}



</script>

<style type="less" scoped></style>