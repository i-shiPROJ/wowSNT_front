<template>
  <div>
    <el-dialog v-model="dialogFormVisible"
      :title="`Заявка на вступление #${currentSolutionObject.id} от ${currentSolutionObject.requestDate}`"
      :width="getWidthDialog">

      <div class="area-cadastr-number fc fc-row">
        <div class="title">Участок:</div>
        <div class="area f-w-900"><span>{{ fromCadastrNumber }}</span></div>
      </div>


      <el-form ref="formRef" style="width: 100%" :model="currentSolutionObject" label-width="auto" :rules="rules">

        <el-form-item label="Кадастровый номер" prop="cadastralNum">
          <el-input v-model="currentSolutionObject.cadastralNum" />
        </el-form-item>

        <el-form-item prop="email" label="email">
          <el-input v-model="currentSolutionObject.email" />
        </el-form-item>

        <el-form-item label="Фамилия" prop="lastName">
          <el-input v-model="currentSolutionObject.lastName" />
        </el-form-item>

        <el-form-item label="Имя" prop="firstName">
          <el-input v-model="currentSolutionObject.firstName" />
        </el-form-item>

        <el-form-item label="Отчество" prop="patronymic">
          <el-input v-model="currentSolutionObject.patronymic" />
        </el-form-item>

        <el-form-item label="Телефон" prop="phoneNum">
          <el-input v-model="currentSolutionObject.phoneNum" v-mask="'+7 (###) ### ## ##'"
            placeholder="+7 (999) 999 99 99" />
        </el-form-item>

      </el-form>

      <span></span>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="showDeclineDialog">Отклонить</el-button>
          <el-button type="primary" @click="showConfirmDialog">
            Принять
          </el-button>
        </div>
      </template>
    </el-dialog>

    <Confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMobileStore } from '~/stores/mobileInfo';
import type { SolutionInterface } from '~/components/widgets/admin/solution/interface/SolutionInterface';
import type { FormInstance, FormRules } from 'element-plus';
import type { cadastrInterface } from '~/stores/interface/CadastrInterface';

const mobileStore = useMobileStore();
let currentSolutionObject = reactive(<SolutionInterface>{});
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 500 });

const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

const fromCadastrNumber = ref('');

const getFromCadastrNumber = async () => {
  try {
    const fromCadastr = await $fetch<cadastrInterface>(`${useRuntimeConfig().public.baseURL}/cadastral/${currentSolutionObject.cadastralNum}`, {
      method: 'GET'
    });
    console.log(fromCadastr);
    fromCadastrNumber.value = fromCadastr.address;
  } catch (error: any) {
    console.error("Error:", error);
    ElMessage.error("Не смог подтянуть участок по кадастровому номеру");
  }
};

const showDialog = (currentSolution: SolutionInterface) => {
  currentSolutionObject = reactive({ ...currentSolution });
  dialogFormVisible.value = true;
  getFromCadastrNumber();
};

const formRef = ref<FormInstance>();
//const solutionForm = reactive<SolutionInterface>({...currentSolutionObject});

const rules = reactive<FormRules<typeof currentSolutionObject>>({
  cadastralNum: [
    { required: true, message: 'Введите кадастровый номер', trigger: 'change', },
  ],
  email: [
    { required: true, message: 'Введите e-mail вдрес', trigger: 'blur', },
    { type: 'email', message: 'Please input correct email address', trigger: 'blur', },
  ],
  firstName: [
    { required: true, message: 'Введите Имя', trigger: 'change', },
  ],
  id: [],
  isProcessed: [],
  lastName: [
    { required: true, message: 'Введите Фамилию', trigger: 'change', },
  ],
  patronymic: [
    { required: true, message: 'Введите Отчество', trigger: 'blur' },
    { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' },
  ],
  phoneNum: [
    { required: true, message: 'Введите номер телефона', trigger: 'blur' },
    { pattern: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/, message: 'Неверный номер', trigger: 'blur' },
  ],
  processDate: [],
  requestDate: [],

})

const confirmDialog = ref();
const showDeclineDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Отказать "${currentSolutionObject.lastName} ${currentSolutionObject.firstName}" во вступлении?`;
  confirmDialog.value.acceptFunction = () => {
    console.log('Отклонили');
  };
  confirmDialog.value.showConfirmDialog();
};
const showConfirmDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Принять "${currentSolutionObject.lastName} ${currentSolutionObject.firstName}" в товарищество?`;
  confirmDialog.value.acceptFunction = () => {
    console.log('Приняли');
  };
  confirmDialog.value.showConfirmDialog();
};


//экспорт функции для использования через ref
defineExpose({ showDialog });

</script>

<style type="less" scoped>
.area-cadastr-number {
  padding: 0 5px;
  margin-bottom: 18px;

  .title {
    padding: 0 12px 0 0;
  }


}
</style>