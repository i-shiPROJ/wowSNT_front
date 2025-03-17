<template>
  <div class="info-page fc fc-col">
    <div class="name-page"><b>{{ props.namePage }} </b></div>
    <div class="breadcrumb fc fc-row fc-align-content-center">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in tree">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tooltip content="На уровень вверх" placement="bottom-end" effect="light">
        <div class="cursor-up" @click="toUp">
          <wow-icon :size="21" type="mdi" :path="$mdi.mdiArrowUp" />
        </div>
      </el-tooltip>

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

const toUp = () => {
  navigateTo({ path: router.currentRoute.value.path.split('/').slice(0, -1).join('/') })
}

</script>

<style lang="less" scoped>
.info-page {
  margin: 15px;
  cursor: default;

  .name-page {
    font-size: 1.2rem;
    padding-bottom: 15px;
  }

  .breadcrumb {
    .cursor-up {
      margin-left: 5px;
      position: relative;
      top: -4px;
      cursor: pointer;
    }

  }
}
</style>