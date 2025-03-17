<template>
  <div class="info-page fc fc-col">
    <div class="name-page"><b>{{ props.namePage }} </b></div>
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in tree">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter();

const props = defineProps({
  namePage: {
    type: String,
    default: ''
  }
})

onMounted(() => {

})

const tree = computed(() => {
  return router.currentRoute.value.fullPath.split('/').filter(item => item !== '')
});
</script>

<style lang="less" scoped>
.info-page {
  margin: 15px;

  .name-page {
    font-size: 1.2rem;
    padding-bottom: 15px;
  }
}
</style>