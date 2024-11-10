<template>

  <el-row class=" auth-layout bg-0" justify="center" align="middle">
    <el-col class="wow-card-auth bg-4" :xs="22" :sm="7" :md="6" :lg="5" :xl="4">
      <div>
        <slot name="header" />
      </div>
      <div class="slot">
        <slot />
      </div>
    </el-col>
  </el-row>

</template>

<script setup>

</script>

<style lang="less" scoped>
.auth-layout {
  width: 100%;
  height: 100%;

  .wow-card-auth {
    height: 400px;
    border-radius: 15px;
    padding: 10px;
  }

  .second {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slot {}
}
</style>