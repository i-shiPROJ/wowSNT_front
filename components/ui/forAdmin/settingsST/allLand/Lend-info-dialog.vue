<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="Информация об участке" :width="getWidthDialog">

      <div>
        <div class="f-w-900 tc-heading-blue">Таблица собственников по текущему участку</div>
        <el-table :data="allPersonsArea" style="width: 100%">
          <el-table-column prop="fio" label="ФИО" width="180" />
          <el-table-column prop="part" label="Доля" width="180" />
          <el-table-column prop="startDate" label="нач. собств" />
          <el-table-column prop="endDate" label="оконч. собств" />
        </el-table>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="showDeclineDialog"> Отменить </el-button>
          <el-button type="primary" @click="showConfirmDialog"> Принять </el-button>
        </div>
      </template>
    </el-dialog>

    <Confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMobileStore } from '~/stores/mobileInfo';
import type { FormInstance, FormRules } from 'element-plus';
import type { SntInterface } from '~/interface/Snt.interface';
import type { PersoneInfoSmall } from '~/interface/PersoneInfoSmall';

import { ElMessage, ElLoading } from 'element-plus';

const mobileStore = useMobileStore();
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });
const dialogFormVisible = ref(false);

const allPersonsArea = reactive<PersoneInfoSmall[]>([]);

const parentFunctions = ref({ setDataSnt: () => { } });

const showDialog = (currentSolution: SntInterface) => {
  //currentSntObject = reactive({ ...currentSolution });//JSON.parse(JSON.stringify(currentSolution))
  dialogFormVisible.value = true;
};

const confirmDialog = ref();
const showDeclineDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Не сохранять изменения юридического лица?`;
  confirmDialog.value.acceptFunction = async () => {
    confirmDialog.value.showCloseDialog();
    dialogFormVisible.value = false;
  };
  confirmDialog.value.showConfirmDialog();
};

const showConfirmDialog = async () => {
  //жмем батон на принятие
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Принять изменения юридического лица?`;
  confirmDialog.value.acceptFunction = async () => {
    try {
      // await $fetch(`/snt`, {
      //   baseURL: useRuntimeConfig().public.baseURL,
      //   method: 'POST',
      //   body: JSON.stringify(currentSntObject),
      // });
      // parentFunctions.value.setDataSnt();
      confirmDialog.value.showCloseDialog();
      dialogFormVisible.value = false;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  confirmDialog.value.showConfirmDialog();
};

//экспорт функции для использования через ref
defineExpose({ showDialog, dialogFormVisible, parentFunctions, allPersonsArea });

</script>

<style type="less" scoped>
.text-cadastnum {
  line-height: 20px;
  text-align: center;
}

.area-cadastr-number {
  padding: 0 5px;
  margin-bottom: 18px;

  .title {
    padding: 0 12px 0 0;
  }


}
</style>