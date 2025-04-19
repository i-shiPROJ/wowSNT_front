<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Реестр районов" />
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Все районы</b></template>
              <template #body>

                <el-table :data="distrincts" stripe style="width: 100%" class="cur-pointer" @row-click="showDistrinctInfo">
                  <el-table-column prop="id" label="id" min-width="200" />
                  <el-table-column prop="title" label="Название" min-width="300" />
                  <el-table-column prop="seniorId" label="id старшего" />
                </el-table>

              </template>
            </wow-card>
          </el-col>
        </el-row>

      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Районы'
})

import { ref } from 'vue';
import type { Distrinct } from '~/interface/District.interface';

const landDialog = ref();

const router = useRouter();
const route = useRoute();
const distrincts = ref<Distrinct[]>([]);

onMounted(async () => {
  getAllLend();
});

const getAllLend = async () => {
  try {
    distrincts.value = await $fetch<Distrinct[]>(`district/snt/${route.params.adminid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });

  }
  catch (error) {
    console.error(error)
  }
}

const showDistrinctInfo = async (row: Distrinct) => {
  navigateTo(`${router.currentRoute.value.path}/${row.id}`)
}


</script>

<style lang="less" scoped></style>