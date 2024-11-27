<template>

  <el-col :span="24">
    <el-menu :active-text-color="activeTextColor" :background-color="backgroundColor" class="el-menu-vertical-admin"
      default-active="1" :text-color="textColor">
      <!--         
      
      @open="handleOpen"
        @close="handleClose" -->
      <el-menu-item index="1">
        <el-icon>
          <wow-icon type="mdi" :path="$mdi.mdiPageLast" />
        </el-icon>
        <span>Главная</span>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

    </el-menu>
  </el-col>

</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  activeTextColor: { type: String, default: "#fff" },
  backgroundColor: { type: String, default: "#ffffff00" },
  textColor: { type: String, default: "#E9E9EB" },
});
</script>

<style scoped>

.el-menu-vertical-admin {
  border-right: none;
  --el-menu-item-height{
    height: 40pxs;
  }
  .el-menu--vertical {
  --el-menu-vertical-height: 100px;
}

}
</style>