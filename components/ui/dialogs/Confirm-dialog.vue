<template>
  <el-dialog v-model="centerDialogVisible" :title="title" width="500" align-center :key="'solutiondialog1'">


    <div class="dialog-body">
      <span>{{ titleBody }}</span>
      <div class="dialog-form" v-if="formVisible">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
          <el-form-item label="Причина отказа" prop="comment">
            <el-input v-model="form.comment" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onDecline">{{ declineLabel }}</el-button>
        <el-button type="primary" @click="acceptFunction">{{ acceptLabel }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

interface Form {
  comment: string;
}

const ruleFormRef = ref<FormInstance>()
const form = ref<Form>({ comment: '' });
const rules = ref<FormRules>({ comment: [{ required: true, min: 5, message: 'Пожалуйста, введите текст', trigger: 'blur' }] });


const centerDialogVisible = ref(false);
const formVisible = ref(false);

const showConfirmDialog = () => { centerDialogVisible.value = true };
const showCloseDialog = () => { centerDialogVisible.value = false };
const title = ref('Заголовок');
const titleBody = ref('Текст тела');
const acceptLabel = ref('Да');
const declineLabel = ref('Отмена');
const acceptFunction = ref(() => { });
const declineFunction = ref(() => { });

//экспорт функции для использования через ref
defineExpose({ showConfirmDialog, showCloseDialog, title, titleBody, acceptLabel, declineLabel, acceptFunction, declineFunction, formVisible, ruleFormRef, form });

const onDecline = () => {
  if (typeof declineFunction.value === 'function') {
    declineFunction.value();
  } else {
    centerDialogVisible.value = false;
  }
};

</script>

<style scoped>
.dialog-body {
  padding: 20px;

  .dialog-form {
    margin-top: 20px;
  }
}
</style>