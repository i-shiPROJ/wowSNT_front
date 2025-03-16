<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Участники СТ</b></template>
              <template #body>

                <el-table :data="areas" stripe style="width: 100%" class="cur-pointer" @row-click="showLandInfo">
                  <el-table-column prop="cadastralNum" label="Кад. номер" min-width="200" />
                  <el-table-column prop="address" label="Адрес" min-width="300" />
                  <el-table-column prop="square" label="Площадь" />
                  <el-table-column prop="residentsNum" label="Доля" />
                </el-table>

              </template>
            </wow-card>
          </el-col>
        </el-row>

        <LendInfoDialog ref="landDialog" />

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

const landDialog = ref();

const router = useRouter();
const areas = ref<Area[]>([]);

onMounted(async () => {
  getAllLend();
});

const getAllLend = async () => {
  try {
    areas.value = await $fetch<Area[]>(`person/${router.currentRoute.value.params.id}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  }
  catch (error) {
    console.error(error)
  }
}

const showLandInfo = (row: Area) => {
  landDialog.value.showDialog();
  console.log(row);
}


</script>

<style lang="less" scoped></style>