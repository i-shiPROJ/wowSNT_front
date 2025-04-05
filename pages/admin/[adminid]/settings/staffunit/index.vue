<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <wow-toppagetitle namePage="Перечень должностей" />

        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Должности: </b></template>
              <template #header-options>

                <el-tooltip content="Добавить должность" placement="bottom-end" effect="light">
                  <el-button type="primary" @click="addStuff" circle>
                    <el-icon style="vertical-align: middle">
                      <wow-icon type="mdi" :path="$mdi.mdiPlus" />
                    </el-icon>
                  </el-button>
                </el-tooltip>

              </template>
              <template #body>
                <el-table :data="allStuffUnit" stripe style="width: 100%" class="cur-pointer"
                  @row-click="showStuffInfo">
                  <el-table-column prop="jobTitle" label="Должность" min-width="200" />
                  <el-table-column prop="ratesNum" label="Ставка" min-width="300" />
                  <el-table-column prop="salary" label="Зарплата" >
                    <template #default="scope">
                      {{ `${scope.row.salary.toLocaleString()} руб.`}}
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template #footer>
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
  title: 'Перечень должностей СТ'
})

import { reactive, onMounted, ref } from 'vue';
import type { Stuff_unit } from '~/interface/Stuff_unit.interface';

const route = useRoute();
const router = useRouter();
const allStuffUnit = ref<Stuff_unit[]>([]);

onMounted(() => {
  getStuffunit()
});

const getStuffunit = async () => {
  try {
    allStuffUnit.value = await $fetch<Stuff_unit[]>(`staff_unit/list/${route.params.adminid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
    console.log(allStuffUnit);
  }
  catch (error) {
    console.error(error)
  }
}

const showStuffInfo = async (row: Stuff_unit) => {
  navigateTo(`${router.currentRoute.value.path}/${row.id}`)
}

const addStuff = () => {
  console.log('addstuff');
}

</script>

<style lang="less" scoped>
.label-body {
  padding: 10px 0;

  .area-naming-st {
    padding: 10px;
    border-left: 4px solid #F56C6C;
  }
}
</style>