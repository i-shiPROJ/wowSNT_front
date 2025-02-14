<template>

  <NuxtLayout name="admin">
    <template #main>

      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <wow-card class="cur-pointer">
            <template #header><b>Список заявок</b></template>
            <template #body>

              <el-table :data="testDatas" border style="width: 100%;margin-top:10px">
                <el-table-column v-if="columnList.length > 0" type="index" :label="'编号'" :width="50"></el-table-column>
                <el-table-column v-for="(col, idx) in columnList" :key="col.prop" :prop="col.prop" :label="col.label"
                  :index="idx" />
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

const userInfoStore = useUserStore();

const router = useRouter();
const currentRoute = router.currentRoute.value;

const columnList = [
  { prop: "name", label: '姓名' },
  { prop: "age", label: '年龄' },
  { prop: "city", label: '城市' },
  { prop: "tel", label: '电话' }
];

const testDatas= [
  { name: '张三', age: 24, city: '广州', tel: '13312345678' },
  { name: '李四', age: 25, city: '九江', tel: '18899998888' }
];

  onMounted(() => {
    console.log(currentRoute.params);
    /*   console.log({
        path: currentRoute.path,
        name: currentRoute.name,
        params: currentRoute.params,
        query: currentRoute.query,
        fullPath: currentRoute.fullPath,
        hash: currentRoute.hash,
        matched: currentRoute.matched,
        redirectedFrom: currentRoute.redirectedFrom
      }); */
    //getSolutioon();
  })

///register-request/solution/{id} - кнопка готово и отклонить еще не готово
const getSolutioon = async () => {
  try {
    const response = await fetch(`${useRuntimeConfig().public.baseURL}/register-request/not-processed/${currentRoute.params.id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.authToken}`,
      },
    });

    console.log(response.status);

    if (response.status === 401) {
      ElMessage.error("Ошибка авторизации");
      navigateTo(`/auth/SignIn`);
      return
    }

    if (!response.ok) {
      throw new Error("Ошибка сети");
    }

    const data = await response.json();
    console.log(data);
    //userInfoStore.setUser(data);
    //console.log('store', userInfoStore.currentUser);

    //router.push('/user');
  } catch (error) {
    console.error("Error in signIn:", error);
    ElMessage.error("Ошибка запроса");
  }
}

const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]


</script>

<style type="less" scoped></style>