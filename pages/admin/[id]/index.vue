<template>
  <NuxtLayout name="admin">
    <template #main>

      <el-row class="">

        <el-col :xs="24" :sm="11" :md="6" :lg="6" :xl="7">
          <wow-card class="cur-pointer" @click="switchMode()">
            <template #header><b>Переключение режима</b></template>
            <template #body>
              <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">
                <wow-icon type="mdi" :path="$mdi.mdiHomeSwitchOutline" style="width: 70px; height: 70px;"></wow-icon>
                <span>В кабинет садовода</span>
              </div>
            </template>
          </wow-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="7">
          <wow-card class="cur-pointer" @click="navToSolujtion()">
            <template #header><b>Заявки на вступление</b></template>
            <template #body>
              <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">
                <wow-badge :value="processedCount">
                  <template #icon>
                    <wow-icon type="mdi" :path="$mdi.mdiHomePlusOutline" style="width: 70px; height: 70px;"></wow-icon>
                  </template>
                </wow-badge>
              </div>
            </template>
          </wow-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="7">
          <wow-card class="cur-pointer">
            <template #header><b>Электронные обращения</b></template>
            <template #body>
              <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">
                <wow-badge :value="3">
                  <template #icon>
                    <wow-icon type="mdi" :path="$mdi.mdiEmailOutline" style="width: 70px; height: 70px;"></wow-icon>
                  </template>
                  <template #value>2</template>
                </wow-badge>
              </div>
            </template>
          </wow-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="7">
          <wow-card class="cur-pointer" @click="switchMode()">
            <template #header><b>Членские взносы за 2025</b></template>
            <template #body>
              <div class="row-col-1 fc fc-col fc-justify-end">
                <div class="fc fc-row fc-align-end ">
                  <div class="header-summa">₽ {{ headerSumma.toLocaleString() }} </div>
                  <div class="header-summa-done"> / {{ headerSummaDone.toLocaleString() }}</div>
                </div>

                <div>
                  <el-progress :percentage="percentage" :color="customColors" />
                </div>
                <!-- <el-button-group>
                      <el-button :icon="Minus" @click="decrease" />
                      <el-button :icon="Plus" @click="increase" />
                    </el-button-group> -->
              </div>

            </template>
          </wow-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="7">
          <wow-card class="cur-pointer" @click="switchMode()">
            <template #header><b>Садоводы должны</b></template>
            <template #body>
              <div class="row-col-1 fc fc-col fc-align-end fc-justify-end">
                <div class="header-summa tc-bright_red">₽ {{ headerSumma.toLocaleString() }} </div>
                <div>
                  <span class="header-indebted t">345</span> <span>домов</span>
                </div>
                <div class="header-summa-done"> </div>
              </div>
            </template>
          </wow-card>
        </el-col>

      </el-row>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/userInfo';

import type { Memberships } from '~/stores/interface/Memberships';

const userInfoStore = useUserStore();
const router = useRouter();
const currentRoute = router.currentRoute.value;

const switchMode = () => router.push('/user');

onMounted(() => {
  if ((checkAdminST()).length === 0) {
    router.push('/user');
  }
  getProcessedCount();
});

const checkAdminST = () => {
  //check if user is admin of ST
  const route = useRoute();
  return userInfoStore.currentUser.memberships ? userInfoStore.currentUser.memberships.filter((item: Memberships) => item.role.code === 'ROLE_P' && item.snt.id === Number(route.params.id)) : [];
}

const navToSolujtion = () => {
  const currentRoute = router.currentRoute.value;
  navigateTo(`/admin/${currentRoute.params.id}/solution`);
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

  //navigateTo(router.'/admin/solution');
}

const percentage = ref(20)
const headerSumma = computed(() => {
  return 45463322
});
const headerSummaDone = computed(() => {
  return 87965742
});

const customColors = [
  { color: '#f56c6c', percentage: 40 },
  { color: '#e6a23c', percentage: 90 },
  { color: '#5cb87a', percentage: 100 },
]

const processedCount = ref(0);
const getProcessedCount = async () => {
  try {
    const response = await fetch(`${useRuntimeConfig().public.baseURL}/register-request/not-processed-count/${currentRoute.params.id}`, {
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
      return 0
    }

    if (!response.ok) {
      throw new Error("Ошибка сети");
    }

    const data: number = await response.json();
    processedCount.value = data;
    //userInfoStore.setUser(data);
    //console.log('store', userInfoStore.currentUser);

    //router.push('/user');
  } catch (error) {
    console.error("Error in signIn:", error);
    ElMessage.error("Ошибка запроса");
  }
}


</script>

<style scoped>
.row-col-1 {
  height: 65px;

  .fontMail {
    height: 50px;
    width: 60px;
  }
}

.header-summa {
  font-size: 1.8rem;
}

.header-indebted {
  font-size: 1.8rem;
}

.header-summa-done {
  font-size: 1rem;

}
</style>