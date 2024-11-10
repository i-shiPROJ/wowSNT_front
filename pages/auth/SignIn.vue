<template>
  <NuxtLayout name="auth">
    <template #header>
      <h1>Мой заголовок</h1>
    </template>

    <div>
      <div>

      </div>
      <el-button type="primary">
        <el-icon style="vertical-align: middle">
          <wow-icon type="mdi" :path="$mdi.mdiAccount"></wow-icon>
        </el-icon>
        <span style="vertical-align: middle"> Search </span>
      </el-button>
      Основной контент ыыыы
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { $mdi } = useNuxtApp();

</script>

<style lang="less" scoped></style>