<template>
 <el-row>
  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

    <el-table :data="testDatas" border style="width: 100%;margin-top:10px">
      <el-table-column v-if="columnList.length > 0" type="index" :label="'编号'" :width="50"></el-table-column>
      <el-table-column v-for="(col, idx) in columnList" :key="col.prop" :prop="col.prop" :label="col.label"
        :index="idx" />
    </el-table>

  </el-col></el-row>

</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user'
})

const columnList = [
  { prop: "name", label: '姓名' },
  { prop: "age", label: '年龄' },
  { prop: "city", label: '城市' },
  { prop: "tel", label: '电话' }
];

const testDatas = [
  { name: '张三', age: 24, city: '广州', tel: '13312345678' },
  { name: '李四', age: 25, city: '九江', tel: '18899998888' }
];
</script>

<style scoped></style>