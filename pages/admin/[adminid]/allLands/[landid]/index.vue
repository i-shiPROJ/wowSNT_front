<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <div class="info-page fc fc-col">
          <div class="name-page"><b>Информация об участке - </b></div>
          <div class="breadcrumb">{{ router.currentRoute.value.fullPath }}</div>
        </div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Таблица собственников по текущему участку</b></template>
              <template #body>



              </template>
            </wow-card>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Таблица собственников по текущему участку</b></template>
              <template #body>



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
  title: 'Участок'
});

const router = useRouter();

</script>

<style lang="less" scoped>
.info-page {
  margin: 12px;

  .name-page {
    font-size: 1.2rem;
    padding-bottom: 15px;
  }
}
</style>