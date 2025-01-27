<template>
  <div>
    <el-row class="wow-user">
      <el-col :xs="24" :sm="10" :md="6" :lg="6" :xl="7">
        <wow-card class="cur-pointer">
          <template #header><b>Message</b></template>
          <template #body>
            <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">

              <wow-icon type="mdi" :path="$mdi.mdiHomeSwitchOutline" style="width: 70px; height: 70px;"></wow-icon>
              <span>Режим садовода</span>
            </div>
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

<style scoped></style>