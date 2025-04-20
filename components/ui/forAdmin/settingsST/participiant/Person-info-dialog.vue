<template>
  <div>
    <el-dialog v-model="dialogFormVisible" :title="props.label" :width="getWidthDialog">

      <el-form ref="formRef" style="width: 100%" :model="person" label-width="auto" :rules="rules">

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item prop="lastName" label="Фамилия">
              <el-input v-model="person.lastName" />
            </el-form-item>
            <el-form-item prop="firstName" label="Имя">
              <el-input v-model="person.firstName" />
            </el-form-item>
            <el-form-item prop="patronymic" label="Отчество">
              <el-input v-model="person.patronymic" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="Телефон" prop="phoneNum">
              <el-input v-model="person.phoneNum" v-mask="'+7 (###) ### ## ##'" placeholder="+7 (999) 999 99 99" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item prop="email" label="email">
              <el-input v-model="person.email" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="showDeclineDialog"> Отменить </el-button>
          <el-button type="primary" @click="showConfirmDialog(formRef)"> Принять </el-button>
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
import type { Personinfo } from '~/interface/Personinfo.interface';

import { ElMessage, ElLoading } from 'element-plus';

const props = defineProps({
  label: {
    type: String,
    default: 'Форма изменения данных участника'
  }
})

const mobileStore = useMobileStore();
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });

let person = reactive(<Personinfo>{});
const formRef = ref<FormInstance>();

const rules = reactive<FormRules<typeof person>>({
  lastName: [
    { required: true, message: 'Введите Фамилию', trigger: 'change', },
  ],
  firstName: [
    { required: true, message: 'Введите Имя', trigger: 'change', },
  ],
  patronymic: [
    { required: true, message: 'Введите Отчество', trigger: 'change', },
  ],
  phoneNum: [
    { required: true, message: 'Введите номер телефона', trigger: 'blur' },
    { pattern: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/, message: 'Неверный номер', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Введите e-mail вдрес', trigger: 'blur', },
    { type: 'email', message: 'email некорректен', trigger: 'blur', },
  ],

})

const dialogFormVisible = ref(false);
const parentFunctions = ref({ updatePersonInfo: () => { } });

const showDialog = (currentSolution: Personinfo) => {
  person = reactive({ ...currentSolution });//JSON.parse(JSON.stringify(currentSolution))
  dialogFormVisible.value = true;
};

const confirmDialog = ref();
const showDeclineDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Не сохранять участника?`;
  confirmDialog.value.acceptFunction = async () => {
    confirmDialog.value.showCloseDialog();
    dialogFormVisible.value = false;
  };
  confirmDialog.value.showConfirmDialog();
};

const showConfirmDialog = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //жмем батон на принятие
      confirmDialog.value.title = 'Внимание!'
      confirmDialog.value.titleBody = `Сохранить участника?`;
      confirmDialog.value.acceptFunction = async () => {
        try {
          await $fetch(`/person`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'POST',
            body: JSON.stringify(person),
          });
          parentFunctions.value.updatePersonInfo();
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