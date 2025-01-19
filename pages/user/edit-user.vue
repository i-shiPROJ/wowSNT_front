<template>
  <div>
    <el-row class="bbb">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <wow-card class="cur-pointer">
          <template #header>Настройки пользователя</template>
          <template #body>
            вв
          </template>
        </wow-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user'
})
</script>

<style scoped>
.bbb {
  padding: 10px;
}
</style>