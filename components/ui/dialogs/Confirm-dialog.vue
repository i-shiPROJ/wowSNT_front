<template>
  <el-dialog v-model="centerDialogVisible" :title="title" width="500" align-center :key="'solutiondialog1'">
    <span>{{ titleBody }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="acceptFunction"> Да </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const centerDialogVisible = ref(false);

const showConfirmDialog = () => { centerDialogVisible.value = true };
const showCloseDialog = () => { centerDialogVisible.value = false };
const title = ref('Заголовок');
const titleBody = ref('Текст тела');
const acceptFunction = ref(() => { console.log('accept'); });

//экспорт функции для использования через ref
defineExpose({ showConfirmDialog, showCloseDialog, title, titleBody, acceptFunction });

</script>

<style scoped></style>