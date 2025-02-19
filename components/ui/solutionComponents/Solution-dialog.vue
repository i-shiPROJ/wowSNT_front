<template>
  <div>
    <el-dialog v-model="dialogFormVisible"
      :title="`Заявка на вступление #${currentSolutionObject.regRequest?.id} от ${currentSolutionObject.regRequest?.requestDate}`"
      :width="getWidthDialog">

      <div v-if="fromCadastrNumber" class="area-cadastr-number fc fc-row">
        <div class="title">Участок:</div>
        <div class="area f-w-900"><span>{{ fromCadastrNumber }}</span></div>
      </div>

      <el-form ref="formRef" style="width: 100%" :model="currentSolutionObject" label-width="auto" :rules="rules">

        <div class="text-cadastnum">
          {{ currentSolutionObject.area.address }}
        </div>
        <el-form-item prop="regRequest.cadastralNum" label="Кадастровый номер">
          <el-input v-model="currentSolutionObject.area.cadastralNum" />
        </el-form-item>

        <el-tooltip content="Заменить нижнее поле старыми данными" placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer">
            <span>Old title</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip>
        <el-form-item prop="person.email" label="email">
          <el-input v-model="currentSolutionObject.person.email" />
        </el-form-item>



        <el-form-item prop="person.lastName" label="Фамилия">
          <el-input v-model="currentSolutionObject.person.lastName" />
        </el-form-item>

        <el-form-item prop="person.firstName" label="Имя">
          <el-input v-model="currentSolutionObject.person.firstName" />
        </el-form-item>

        <el-form-item prop="person.patronymic" label="Отчество">
          <el-input v-model="currentSolutionObject.person.patronymic" />
        </el-form-item>

        <el-form-item prop="person.phoneNums" label="Телефон">
          <el-input v-model="currentSolutionObject.person.phoneNums" v-mask="'+7 (###) ### ## ##'"
            placeholder="+7 (999) 999 99 99" />
        </el-form-item>

      </el-form>


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
import type { cadastrInterface } from '~/interface/Cadastr.interface';
import type { SolutionEdit } from '~/interface/solution/SolutionEdit.interface';

const mobileStore = useMobileStore();
let currentSolutionObject = reactive(<SolutionEdit>{});
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });

const dialogFormVisible = ref(false);

const fromCadastrNumber = ref('');

const getFromCadastrNumber = async () => {
  // try {
  //   const fromCadastr = await $fetch<cadastrInterface>(`${useRuntimeConfig().public.baseURL}/cadastral/${currentSolutionObject.cadastralNum}`, {
  //     method: 'GET'
  //   });
  //   console.log(fromCadastr);
  //   fromCadastrNumber.value = fromCadastr.address;
  // } catch (error: any) {
  //   console.error("Error:", error);
  //   ElMessage.error("Не смог подтянуть участок по кадастровому номеру");
  // }
};

const showDialog = (currentSolution: SolutionEdit) => {
  currentSolutionObject = reactive({ ...currentSolution });//JSON.parse(JSON.stringify(currentSolution))
  console.log(currentSolutionObject);
  dialogFormVisible.value = true;
  getFromCadastrNumber();
};

const formRef = ref<FormInstance>();
//const solutionForm = reactive<SolutionInterface>({...currentSolutionObject});

const rules = reactive<FormRules<typeof currentSolutionObject>>({
  'regRequest.cadastralNum': [
    { required: true, message: 'Введите кадастровый номер', trigger: 'change', },
  ],
  'person.email': [
    { required: true, message: 'Введите e-mail вдрес', trigger: 'blur', },
    { type: 'email', message: 'Please input correct email address', trigger: 'blur', },
  ],
  'person.firstName': [
    { required: true, message: 'Введите Имя', trigger: 'change', },
  ],
  'person.lastName': [
    { required: true, message: 'Введите Фамилию', trigger: 'change', },
  ],
  'person.patronymic': [
    { required: true, message: 'Введите Отчество', trigger: 'blur' },
    { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' },
  ],
  'person.phoneNums': [
    { required: true, message: 'Введите номер телефона', trigger: 'blur' },
    { pattern: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/, message: 'Неверный номер', trigger: 'blur' },
  ],

})

const confirmDialog = ref();
const showDeclineDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Отказать "${currentSolutionObject.regRequest.lastName} ${currentSolutionObject.regRequest.firstName}" во вступлении?`;
  confirmDialog.value.acceptFunction = () => {
    console.log('Отклонили');
  };
  confirmDialog.value.showConfirmDialog();
};
const showConfirmDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Принять "${currentSolutionObject.regRequest.lastName} ${currentSolutionObject.regRequest.firstName}" в товарищество?`;
  confirmDialog.value.acceptFunction = () => {
    console.log('Приняли');
  };
  confirmDialog.value.showConfirmDialog();
};


//экспорт функции для использования через ref
defineExpose({ showDialog });

</script>

<style type="less" scoped>
.text-cadastnum {
  line-height: 20px;
}

.area-cadastr-number {
  padding: 0 5px;
  margin-bottom: 18px;

  .title {
    padding: 0 12px 0 0;
  }


}
</style>