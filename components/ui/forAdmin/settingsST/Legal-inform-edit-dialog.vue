<template>
  <div>
    <el-dialog v-model="dialogFormVisible" :title="`Форма изменения юр. лица`" :width="getWidthDialog">

      <el-form ref="formRef" style="width: 100%" :model="currentSntObject" label-width="auto" :rules="rules">

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item prop="title" label="Название СТ">
              <el-input v-model="currentSntObject.title" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="inn" label="ИНН">
              <el-input v-model="currentSntObject.inn" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="ogrn" label="ОГРН">
              <el-input v-model="currentSntObject.ogrn" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="oktmoCode" label="ОКТМО">
              <el-input v-model="currentSntObject.oktmoCode" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="regDate" label="Дата рег. юр.лица">
              <el-date-picker v-model="currentSntObject.regDate" type="date" aria-label="Pick a date"
                placeholder="Выберите дату" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item prop="address" label="Адрес юр.лица">
              <el-input v-model="currentSntObject.address" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

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

import { ElMessage, ElLoading } from 'element-plus';

const mobileStore = useMobileStore();
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });

let currentSntObject = reactive(<SntInterface>{});
const formRef = ref<FormInstance>();

const rules = reactive<FormRules<typeof currentSntObject>>({
  inn: [
    { required: true, message: 'Введите ИНН', trigger: 'change', },
  ],
  ogrn: [
    { required: true, message: 'Введите ОГРН', trigger: 'change', },
  ],
  regDate: [
    { required: true, type: 'date', message: 'Введите дату регистрации', trigger: 'change' },
  ],
  title: [
    { required: true, message: 'Введите Название садоводства', trigger: 'change', },
  ],
  oktmoCode: [
    { required: true, message: 'Введите ОКТМО', trigger: 'change', },
  ],
  address: [
    { required: true, message: 'Введите юр адрес садоводства', trigger: 'change', },
  ],
})

const dialogFormVisible = ref(false);
const parentFunctions = ref({ setDataSnt: () => { } });

const showDialog = (currentSolution: SntInterface) => {
  currentSntObject = reactive({ ...currentSolution });//JSON.parse(JSON.stringify(currentSolution))
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
      await $fetch(`/snt`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'POST',
        body: JSON.stringify(currentSntObject),
      });
      parentFunctions.value.setDataSnt();
      confirmDialog.value.showCloseDialog();
      dialogFormVisible.value = false;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  confirmDialog.value.showConfirmDialog();
};

//экспорт функции для использования через ref
defineExpose({ showDialog, dialogFormVisible, parentFunctions });

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