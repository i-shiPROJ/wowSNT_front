<template>
  <div>
    <NuxtLayout name="bilboard">
      <template #header> Some header template content. </template>
      The rest of the page
      <main name="main">
        <b-button type="is-primary">Primary</b-button>
      </main>
    </NuxtLayout>
    
    <el-button type="primary">Primary</el-button>
    <el-button @click="ElMessage('hello')">button</el-button>
    <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
    <LazyElButton type="warning">lazy button</LazyElButton>

  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>