<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <wow-toppagetitle namePage="Заявки на вступление" />
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card class="cur-pointer">
              <template #header><b>Обращения садоводов</b></template>
              <template #body>

                <!-- <el-table :data="solutionData" style="width: 100%">
                  <el-table-column v-for="(item, index) in getColumns()" :key="item.prop" :prop="item.prop"
                    :label="item.label" :min-width="index == 0 ? '50' : '100'" />

                  <el-table-column fixed="right" min-width="100">
                    <template #default="scope">
                      <el-button type="primary" @click="showSolution(scope.$index, scope.row)">открыть</el-button>
                    </template>
                  </el-table-column>

                </el-table> -->

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
  title: 'Обращение садоводов'
})
</script>

<style lang="less" scoped></style>