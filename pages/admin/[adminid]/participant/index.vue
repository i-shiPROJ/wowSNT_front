<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <wow-toppagetitle namePage="Реестр участников" />
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <Wow-card>
              <template #header><b>Участники СТ</b></template>
              <template #body>

                <el-table :data="persons" stripe style="width: 100%" class="cur-pointer" @row-click="showPersonInfo">
                  <el-table-column prop="lastName" label="Фамилия" min-width="170"/>
                  <el-table-column prop="firstName" label="Имя" min-width="170"/>
                  <el-table-column prop="patronymic" label="Отчество" min-width="170"/>
                  <el-table-column prop="phoneNum" label="Телефон" width="170">
                    <template #default="scope">
                      <div class="fc fc-row fc-align-content-center">
                        <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                        <a class="phone-link" :href="`tel:${scope.row.phoneNum}`"> {{ scope.row.phoneNum }}</a>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="email" label="email" width="250"/>
                </el-table>

              </template>
            </Wow-card>
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
const route = useRoute();
const persons = ref<Personinfo[]>([]);

onMounted(async () => {
  getAllLend();
});

const getAllLend = async () => {
  try {
    //TODO подправить данные под таблицу
    persons.value = await $fetch<Personinfo[]>(`person/snt-members/${route.params.adminid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  }
  catch (error) {
    console.error(error)
  }
}

const showPersonInfo = (row: Area) => {
  navigateTo(`${router.currentRoute.value.path}/${row.id}`)
}


</script>

<style lang="less" scoped></style>