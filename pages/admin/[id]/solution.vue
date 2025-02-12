<template>
  <NuxtLayout name="admin">
    <template #main>

      <el-row>
        <el-col :xs="24" :sm="11" :md="6" :lg="6" :xl="7">
          <wow-card class="cur-pointer">
            <template #header><b>fuck solutions</b></template>
            <template #body>
              body
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
  getSolutioon();
})

const getSolutioon = async () => {
  try {
    const response = await fetch(`${useRuntimeConfig().public.baseURL}/register-request/solution/${currentRoute.params.id}`, {
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


</script>

<style type="less" scoped></style>