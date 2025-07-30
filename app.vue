<template>
  <NuxtLayout>
    <el-config-provider :locale="ru">
      <NuxtPage />
    </el-config-provider>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import ru from 'element-plus/dist/locale/ru.mjs'
</script>

<style lang="less">
html,
body,
#__nuxt {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>