<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="Форма добавиления новой должности" :width="getWidthDialog">

      <el-form ref="formRef" style="width: 100%" :model="stuffUnit" :label-position="labelPosition" label-width="auto" :rules="rules">

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item prop="jobTitle" label="Название должности">
              <el-input v-model="stuffUnit.jobTitle" />
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item prop="ratesNum" label="Ставка">
              <el-input-number v-model="stuffUnit.ratesNum" :min="0.1" :step="0.01" :max="10" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item prop="salary" label="Зарплата">
              <el-input-number v-model="stuffUnit.salary" :min="0" :step="5000" :max="9999999" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item prop="beginDate" label="Дата ввода">
              <el-date-picker v-model="stuffUnit.beginDate" type="date" aria-label="Pick a date"
                placeholder="Выберите дату" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="showConfirmDialog(formRef)"> Добавить должность </el-button>
        </div>
      </template>
    </el-dialog>

    <Confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMobileStore } from '~/stores/mobileInfo';
import type { Stuff_unit } from '~/interface/Stuff_unit.interface';

import type { FormInstance, FormRules } from 'element-plus';

const route = useRoute();
const mobileStore = useMobileStore();
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });
const labelPosition = computed(() => { return mobileStore.isMobile ? 'top' : 'right' });

let stuffUnit = reactive(<Stuff_unit>{});
const formRef = ref<FormInstance>();

const rules = reactive<FormRules<typeof stuffUnit>>({
  jobTitle: [
    { required: true, message: 'Введите название должности', trigger: 'change', },
  ],
  ratesNum: [
    { required: true, message: 'Введите ставку', trigger: 'change', },
  ],
  salary: [
    { required: true, message: 'Введите Зарплата', trigger: 'change', },
  ],
  beginDate: [
    { required: true, type: 'date', message: 'Введите дату регистрации', trigger: 'change' },
  ],

})

const dialogFormVisible = ref(false);
const parentFunctions = ref({ updateStuffUnit: () => { } });

const showDialog = () => {
  if (Object.keys(stuffUnit).length > 0) {
    stuffUnit = reactive(<Stuff_unit>{});
  }
  dialogFormVisible.value = true;
};

const confirmDialog = ref();


const showConfirmDialog = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      confirmDialog.value.title = 'Внимание!'
      confirmDialog.value.titleBody = `Точно хотите добавить должность?`;
      confirmDialog.value.acceptFunction = async () => {
        try {
          stuffUnit.sntId = String(route.params.adminid);
          await $fetch(`staff_unit`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'POST',
            body: JSON.stringify(stuffUnit),
          });
          parentFunctions.value.updateStuffUnit();
          confirmDialog.value.showCloseDialog();
          dialogFormVisible.value = false;
        } catch (error) {
          console.error("Error:", error);
        }
      };
      confirmDialog.value.showConfirmDialog();
    } else {
      console.error('error submit!', fields)
    }
  })


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