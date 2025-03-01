<template>
  <div>
    <el-dialog v-model="dialogFormVisible"
      :title="`Заявка на вступление #${currentSolutionObject.regRequest?.id} от ${currentSolutionObject.regRequest?.requestDate}`"
      :width="getWidthDialog">



      <el-form ref="formRef" style="width: 100%" :model="currentSolutionObject" label-width="auto" :rules="rules">

        <el-tooltip v-if="!!currentSolutionObject.area.id" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('cadastralNum', currentSolutionObject.area.cadastralNum)">
            <span>{{ `${currentSolutionObject.area.address} кадастровый
              номер: ${currentSolutionObject.area.cadastralNum}` }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip>
        <el-form-item prop="regRequest.cadastralNum" label="Кадастровый номер">
          <el-input v-model="currentSolutionObject.regRequest.cadastralNum" @input="debounceCadastrNumer" />
        </el-form-item>
        <div v-if="fromCadastrNumber" class="area-cadastr-number fc fc-row">
          <div class="title">Участок по кадастровому номеру:</div>
          <div class="area f-w-900"><span class="tc-bright_red">{{ fromCadastrNumber }}</span></div>
        </div>

        <el-tooltip v-if="!!currentSolutionObject.person.id" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('email', currentSolutionObject.person.email)">
            <span>{{ currentSolutionObject.person.email }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip>
        <el-form-item prop="regRequest.email" label="email">
          <el-input v-model="currentSolutionObject.regRequest.email" />
        </el-form-item>

        <el-tooltip v-if="!!currentSolutionObject.person.id" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('lastName', currentSolutionObject.person.lastName)">
            <span>{{ currentSolutionObject.person.lastName }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip>
        <el-form-item prop="regRequest.lastName" label="Фамилия">
          <el-input v-model="currentSolutionObject.regRequest.lastName" />
        </el-form-item>

        <el-tooltip v-if="!!currentSolutionObject.person.id" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('firstName', currentSolutionObject.person.firstName)">
            <span>{{ currentSolutionObject.person.firstName }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip>
        <el-form-item prop="regRequest.firstName" label="Имя">
          <el-input v-model="currentSolutionObject.regRequest.firstName" />
        </el-form-item>

        <el-tooltip v-if="!!currentSolutionObject.person.id" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('patronymic', currentSolutionObject.person.patronymic)">
            <span>{{ currentSolutionObject.person.patronymic }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip>
        <el-form-item prop="regRequest.patronymic" label="Отчество">
          <el-input v-model="currentSolutionObject.regRequest.patronymic" />
        </el-form-item>

        <el-tooltip v-if="!!currentSolutionObject.person.id" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('phoneNum', currentSolutionObject.person.phoneNums)">
            <span>{{ currentSolutionObject.person.phoneNums }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip>
        <el-form-item prop="regRequest.phoneNums" label="Телефон">
          <el-input v-model="currentSolutionObject.regRequest.phoneNum" v-mask="'+7 (###) ### ## ##'"
            placeholder="+7 (999) 999 99 99" />
        </el-form-item>

      </el-form>


      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="showDeclineDialog"> Отклонить </el-button>
          <el-button type="primary" @click="showConfirmDialog" :disabled="!!fromCadastrNumber"> Принять </el-button>
        </div>
      </template>
    </el-dialog>

    <Confirm-dialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useMobileStore } from '~/stores/mobileInfo';
import type { SolutionInterface } from '~/components/widgets/admin/solution/interface/SolutionInterface';
import type { FormInstance, FormRules } from 'element-plus';
import type { cadastrInterface } from '~/interface/Cadastr.interface';
import type { SolutionEdit } from '~/interface/solution/SolutionEdit.interface';
import { ElMessage, ElLoading } from 'element-plus';

const mobileStore = useMobileStore();
let currentSolutionObject = reactive(<SolutionEdit>{});
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });

const dialogFormVisible = ref(false);

const fromCadastrNumber = ref('');

const showDialog = (currentSolution: SolutionEdit) => {
  currentSolutionObject = reactive({ ...currentSolution });//JSON.parse(JSON.stringify(currentSolution))
  console.log(currentSolutionObject);
  dialogFormVisible.value = true;
  debounceCadastrNumer();
};

const formRef = ref<FormInstance>();
//const solutionForm = reactive<SolutionInterface>({...currentSolutionObject});

const rules = reactive<FormRules<typeof currentSolutionObject>>({
  'regRequest.cadastralNum': [
    { required: true, message: 'Введите кадастровый номер', trigger: 'change', },
  ],
  'regRequest.email': [
    { required: true, message: 'Введите e-mail вдрес', trigger: 'blur', },
    { type: 'email', message: 'Please input correct email address', trigger: 'blur', },
  ],
  'regRequest.firstName': [
    { required: true, message: 'Введите Имя', trigger: 'change', },
  ],
  'regRequest.lastName': [
    { required: true, message: 'Введите Фамилию', trigger: 'change', },
  ],
  'regRequest.patronymic': [
    { required: true, message: 'Введите Отчество', trigger: 'blur' },
    { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' },
  ],
  'regRequest.phoneNum': [
    { required: true, message: 'Введите номер телефона', trigger: 'blur' },
    { pattern: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/, message: 'Неверный номер', trigger: 'blur' },
  ],

})

const confirmDialog = ref();
const showDeclineDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Отказать "${currentSolutionObject.regRequest.lastName} ${currentSolutionObject.regRequest.firstName}" во вступлении?`;
  confirmDialog.value.formVisible = true;
  confirmDialog.value.acceptFunction = async () => {

    await confirmDialog.value.ruleFormRef.validate(async (valid: any, fields: any) => {
      if (valid) {
        console.log(confirmDialog.value.form.comment, currentSolutionObject.regRequest.id);
        try {
          await $fetch(`${useRuntimeConfig().public.baseURL}/register-request/reject-request/${currentSolutionObject.regRequest.id}?comment=${confirmDialog.value.form.comment}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${sessionStorage.authToken}`,
            },
          });
          confirmDialog.value.showCloseDialog();
          dialogFormVisible.value = false;
        } catch (error) {
          console.error("Error:", error);
        }
      }
    })
    // const rejectRequest = await $fetch<SolutionInterface>(`${useRuntimeConfig().public.baseURL}register-request/reject-request/${currentSolutionObject.regRequest.id}?comment=<причина отклонения>${currentSolutionObject.regRequest.cadastralNum}`);
  };

  confirmDialog.value.showConfirmDialog();
};

const showConfirmDialog = async () => {
  try {
    const cadastr = await $fetch<cadastrInterface>(`${useRuntimeConfig().public.baseURL}/cadastral/${currentSolutionObject.regRequest.cadastralNum}`);
    fromCadastrNumber.value = cadastr.address;

    //жмем батон на принятие
    confirmDialog.value.title = 'Внимание!'
    confirmDialog.value.titleBody = `Принять "${currentSolutionObject.regRequest.lastName} ${currentSolutionObject.regRequest.firstName}" в товарищество?`;
    confirmDialog.value.acceptFunction = () => {
      confirmDialog.value.showCloseDialog();
      console.log('Приняли');
    };
    confirmDialog.value.showConfirmDialog();

  } catch (error) {
    console.error("Error:", error);
    ElMessage.error("Ошибка запроса");
    fromCadastrNumber.value = "Неправильный кадастровый номер";
  }



};

const updateField = (field: 'patronymic' | 'firstName' | 'lastName' | 'email' | 'phoneNum' | 'cadastralNum', value: string) => {
  currentSolutionObject.regRequest[field] = value;
  if (field === 'cadastralNum') {
    debounceCadastrNumer();
  }
};

const cadastrNumerInputTimeout = ref<NodeJS.Timeout | null>(null);

const debounceCadastrNumer = async () => {
  if (cadastrNumerInputTimeout.value) {
    clearTimeout(cadastrNumerInputTimeout.value);
  }
  cadastrNumerInputTimeout.value = setTimeout(async () => {
    // const loading = ElLoading.service({ text: 'Загрузка...', fullscreen: true, background: 'rgba(0, 0, 0, 0.7)', lock: true });
    try {
      const cadastr = await $fetch<cadastrInterface>(`${useRuntimeConfig().public.baseURL}/cadastral/${currentSolutionObject.regRequest.cadastralNum}`);
      fromCadastrNumber.value = cadastr.address;
    } catch (error) {
      console.error("Error:", error);
      ElMessage.error("Ошибка запроса");
      fromCadastrNumber.value = "Неправильный кадастровый номер";
    } finally {
      // loading.close();
    }
  }, 1000);
};

//экспорт функции для использования через ref
defineExpose({ showDialog });

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