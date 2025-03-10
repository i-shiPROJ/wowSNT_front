<template>
  <div>
    <el-dialog v-model="dialogFormVisible"
      :title="`Заявка на вступление #${currentSolutionObject.regRequest?.id} от ${currentSolutionObject.regRequest?.requestDate}`"
      :width="getWidthDialog">



      <el-form ref="formRef" style="width: 100%" :model="currentSolutionObject" label-width="auto" :rules="rules">

        <!-- <el-tooltip v-if="!!currentSolutionObject.area.id" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('cadastralNum', currentSolutionObject.area.cadastralNum)">
            <span>{{ `${currentSolutionObject.area.address} кадастровый
              номер: ${currentSolutionObject.area.cadastralNum}` }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip> -->

        <!-- TODO  если у нас найден id currentSolutionObject.area.id тогда подставляем поля с заменой, если они отличаются-->
        <div>
          <div class="f-w-900 tc-heading-blue">Таблица собственников по текущему участку</div>
          <el-table :data="currentSolutionObject.existingAreaOwnershipsDescr" style="width: 100%">
            <el-table-column prop="fio" label="ФИО" width="180" />
            <el-table-column prop="part" label="Доля" width="180" />
            <el-table-column prop="startDate" label="нач. собств" />
            <el-table-column label="оконч. собств">
              <template #default="scope">
                <el-date-picker v-if="!scope.row.endDate" v-model="scope.row.endDate" style="width: 100%;" type="date"
                  aria-label="Pick a date" placeholder="Дата окончания" :disabled="!!scope.row.endDate" />
                <!-- {{ scope.row.endDate ? $moment(scope.row.endDate).format('YYYY-MM-DD') : '' }} -->
                <div v-else>{{ $moment(scope.row.endDate).format('YYYY-MM-DD') }}</div>

                <!-- <el-button type="primary" @click="showSolution(scope.$index, scope.row)">открыть</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="padding-20-0 fc fc-row fc-justify-center  fc-align-start tc-dark-gray-5"
          v-if="currentSolutionObject.existingAreaOwnershipsDescr.length > 0">
          <div class="f-w-900 tc-bright_red">{{ `Внимание! Текущий
            владелец другой: ${currentSolutionObject.existingAreaOwnershipsDescr[getIndexcurrentSolutionObject]?.fio}.
            Владееет
            от
            ${currentSolutionObject.existingAreaOwnershipsDescr[getIndexcurrentSolutionObject]?.startDate}` }}
          </div>
        </div> -->

        <div class="area-task">
          <div class="f-w-900 tc-heading-blue">Заявка:</div>
          <el-form-item prop="regRequest.cadastralNum" label="Кадастровый номер">
            <el-input v-model="currentSolutionObject.regRequest.cadastralNum" @input="debounceCadastrNumer" />
          </el-form-item>
          <div v-if="fromCadastrNumber" class="area-cadastr-number fc fc-row">
            <div class="title">Участок по кадастровому номеру:</div>
            <div class="area f-w-900"><span class="">{{ fromCadastrNumber }}</span></div>
          </div>
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="area.square" label="Площадь участка">
                <el-input-number v-model="currentSolutionObject.area.square" :min="0" :step="0.5" :max="9999" />
                <!-- <el-input v-model="currentSolutionObject.area.square" @input="debounceCadastrNumer" /> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="area.residentsNum" label="Количество проживающих">
                <el-input-number v-model="currentSolutionObject.area.residentsNum" :min="0" :step="1" :max="999" />
                <!-- <el-input v-model="currentSolutionObject.area.residentsNum" @input="debounceCadastrNumer" /> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="areaOwnershipDescr.part" label="Доля">
                <el-input-number v-model="currentSolutionObject.areaOwnershipDescr.part" :min="0.1" :step="0.01"
                  :max="1" />
                <!-- <el-input v-model="currentSolutionObject.areaOwnershipDescr.part" @input="debounceCadastrNumer" /> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="areaOwnershipDescr.startDate" label="Дата начала владения">
                <el-date-picker v-model="currentSolutionObject.areaOwnershipDescr.startDate" type="date"
                  aria-label="Pick a date" placeholder="Выберите дату" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="regRequest.email" label="email">
                <el-input v-model="currentSolutionObject.regRequest.email" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="regRequest.phoneNums" label="Телефон">
                <el-input v-model="currentSolutionObject.regRequest.phoneNum" v-mask="'+7 (###) ### ## ##'"
                  placeholder="+7 (999) 999 99 99" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item prop="regRequest.lastName" label="Фамилия">
                <el-input v-model="currentSolutionObject.regRequest.lastName" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="regRequest.firstName" label="Имя">
                <el-input v-model="currentSolutionObject.regRequest.firstName" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item prop="regRequest.patronymic" label="Отчество">
                <el-input v-model="currentSolutionObject.regRequest.patronymic" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>






        <!-- <el-tooltip v-if="!!currentSolutionObject.area.id"
          content="Заменить нижнее поле старыми данными" placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('email', currentSolutionObject.person.email)">
            <span>{{ currentSolutionObject.person.email }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip> -->


        <!-- <el-tooltip v-if="currentSolutionObject.existingAreaOwnershipsDescr.length > 0" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('lastName', currentSolutionObject.person.lastName)">
            <span>{{ currentSolutionObject.person.lastName }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip> -->


        <!-- <el-tooltip v-if="currentSolutionObject.existingAreaOwnershipsDescr.length > 0" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('firstName', currentSolutionObject.person.firstName)">
            <span>{{ currentSolutionObject.person.firstName }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip> -->


        <!-- <el-tooltip v-if="currentSolutionObject.existingAreaOwnershipsDescr.length > 0" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('patronymic', currentSolutionObject.person.patronymic)">
            <span>{{ currentSolutionObject.person.patronymic }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip> -->


        <!-- <el-tooltip v-if="currentSolutionObject.existingAreaOwnershipsDescr.length > 0" content="Заменить нижнее поле старыми данными"
          placement="bottom-end" effect="light">
          <div class="fc fc-row fc-justify-end  fc-align-start tc-dark-gray-5 cur-pointer"
            @click="updateField('phoneNum', currentSolutionObject.person.phoneNums)">
            <span>{{ currentSolutionObject.person.phoneNums }}</span>
            <wow-icon type="mdi" :path="$mdi.mdiArrowDownRight" />
          </div>
        </el-tooltip> -->


      </el-form>


      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="showDeclineDialog"> Отклонить </el-button>
          <el-button type="primary" @click="showConfirmDialog" :disabled="cadastrNumberComputed"> Принять </el-button>
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

const cadastrNumberComputed = computed(() => { return !fromCadastrNumber.value; });

const mobileStore = useMobileStore();
let currentSolutionObject = reactive(<SolutionEdit>{});
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });

const dialogFormVisible = ref(false);

const fromCadastrNumber = ref('');

const showDialog = (currentSolution: SolutionEdit) => {
  currentSolutionObject = reactive({ ...currentSolution });//JSON.parse(JSON.stringify(currentSolution))
  dialogFormVisible.value = true;
  debounceCadastrNumer();
};

const formRef = ref<FormInstance>();
//const solutionForm = reactive<SolutionInterface>({...currentSolutionObject});

const rules = reactive<FormRules<typeof currentSolutionObject>>({
  'regRequest.cadastralNum': [
    { required: true, message: 'Введите кадастровый номер', trigger: 'change', },
  ],
  // 'areaOwnershipDescr.part': [
  //   { required: true, message: 'Введите долю', trigger: 'change', },
  // ],
  'areaOwnershipDescr.startDate': [
    { required: true, type: 'date', message: 'Введите дату начала владения', trigger: 'change' },
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
  'area.square': [
    { required: true, message: 'Введите площадь участка', trigger: 'blur' },
    { type: 'number', min: 0, max: 999, message: 'Длина поля от 0 - 999', trigger: 'blur' },
  ],
  'area.residentsNum': [
    { required: true, message: 'Введите кол-во проживающих', trigger: 'blur' },
    { type: 'number', min: 0, max: 99, message: 'Длина поля от 0 - 99', trigger: 'blur' },
  ],
  'areaOwnershipDescr.part': [
    { required: true, message: 'Введите долю', trigger: 'blur' },
    { type: 'number', min: 0.01, max: 50, message: 'Длина поля от 0.01 - 1', trigger: 'blur' },
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
        try {
          await $fetch(`/register-request/reject-request/${currentSolutionObject.regRequest.id}?comment=${confirmDialog.value.form.comment}`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'GET'
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
  // try {
  //   const cadastr = await $fetch<cadastrInterface>(`${useRuntimeConfig().public.baseURL}/cadastral/${currentSolutionObject.regRequest.cadastralNum}`);
  //   fromCadastrNumber.value = cadastr.address;

  //жмем батон на принятие
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Принять "${currentSolutionObject.regRequest.lastName} ${currentSolutionObject.regRequest.firstName}" в товарищество?`;
  confirmDialog.value.acceptFunction = async () => {

    try {
      ///register-request/apply-solution
      await $fetch(`/register-request/apply-solution`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'POST',
        body: JSON.stringify(currentSolutionObject),
      });
      confirmDialog.value.showCloseDialog();
      dialogFormVisible.value = false;
    } catch (error) {
      console.error("Error:", error);
    }

    // const rejectRequest = await $fetch<SolutionInterface>(`${useRuntimeConfig().public.baseURL}register-request/reject-request/${currentSolutionObject.regRequest.id}?comment=<причина отклонения>${currentSolutionObject.regRequest.cadastralNum}`);
  };
  confirmDialog.value.showConfirmDialog();

  // } catch (error: any) {
  //   console.error("Error:1111", error);
  //   ElMessage.error("Ошибка запроса");
  //   fromCadastrNumber.value = error.response?.status === 503
  //     ? 'Сервер распознования кадастрового номера недоступен'
  //     : "Неправильный кадастровый номер" + error.response?.status;
  // }



};

const updateField = (field: 'patronymic' | 'firstName' | 'lastName' | 'email' | 'phoneNum' | 'cadastralNum', value: string) => {
  currentSolutionObject.regRequest[field] = value;
  if (field === 'cadastralNum') {
    debounceCadastrNumer();
  }
};

const cadastrNumerInputTimeout = ref<NodeJS.Timeout | null>(null);

//loader start
const debounceCadastrNumer = async () => {
  //TODO возникет ошибка Uncaught ResizeObserver loop completed with undelivered notifications. при повторном открытии формы
  if (cadastrNumerInputTimeout.value) {
    clearTimeout(cadastrNumerInputTimeout.value);
  }
  cadastrNumerInputTimeout.value = setTimeout(async () => {
    // const loading = ElLoading.service({ text: 'Загрузка...', fullscreen: true, background: 'rgba(0, 0, 0, 0.7)', lock: true });
    try {
      const cadastr = await $fetch<cadastrInterface>(`/cadastral/${currentSolutionObject.regRequest.cadastralNum}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
      fromCadastrNumber.value = cadastr.address;
    } catch (error: any) {
      console.error("Error:", error);
      ElMessage.error("Ошибка запроса");
      fromCadastrNumber.value = error.response?.status === 503
        ? currentSolutionObject.area.address
        : "Неправильный кадастровый номер";
    } finally {
      // loading.close();
    }
  }, 100);
};

const getIndexcurrentSolutionObject = computed(() => {
  return <number>currentSolutionObject.existingAreaOwnershipsDescr.length - 1;
});

//экспорт функции для использования через ref
defineExpose({ showDialog, dialogFormVisible });

</script>

<style type="less" scoped>
.text-cadastnum {
  line-height: 20px;
  text-align: center;
}

.area-task {
  padding-top: 25px;
}

.area-cadastr-number {
  padding: 0 5px;
  margin-bottom: 18px;

  .title {
    padding: 0 12px 0 0;
  }


}
</style>