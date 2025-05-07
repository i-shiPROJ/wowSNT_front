<template>
  <div>
    <el-dialog v-model="dialogFormVisible" :title="labelHeaderDialog" :width="getWidthDialog">

      <el-form ref="formRef" style="width: 100%" :model="person" :label-position="labelPosition" label-width="auto"
        :rules="rules">

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

      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-table :data="person.addPhoneNums" style="width: 100%" class="cur-pointer">
            <el-table-column label="Дополнительные телефоны">
              <template #default="scope">
                <div v-if="editingIndex === scope.$index" class="fc fc-row fc-align-content-center">
                  <el-input v-model="editingPhone" v-mask="'+7 (###) ### ## ##'" placeholder="+7 (999) 999 99 99" />
                </div>
                <div v-else class="fc fc-row fc-align-content-center">
                  <wow-icon :size="20" type="mdi" :path="$mdi.mdiCellphone" />
                  <span class="ml-2">{{ scope.row }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template #default="scope">
                <div class="fc fc-row fc-align-content-center">
                  <el-button v-if="editingIndex === scope.$index" type="success" @click="savePhone(scope.$index)"
                    circle>
                    <el-icon style="vertical-align: middle">
                      <wow-icon type="mdi" :path="$mdi.mdiContentSave" />
                    </el-icon>
                  </el-button>
                  <el-button v-else type="primary" @click="editPhone(scope.$index)" circle>
                    <el-icon style="vertical-align: middle">
                      <wow-icon type="mdi" :path="$mdi.mdiPencilOutline" />
                    </el-icon>
                  </el-button>
                  <el-button type="danger" @click.stop="deletePhone(scope.$index)" circle>
                    <el-icon style="vertical-align: middle">
                      <wow-icon type="mdi" :path="$mdi.mdiTrashCanOutline" />
                    </el-icon>
                  </el-button>
                </div>

              </template>
            </el-table-column>
          </el-table>
          <div class="fc fc-justify-center mt-15">
            <el-button @click="addNewPhone">
              <wow-icon :size="20" type="mdi" :path="$mdi.mdiPlus" />
              Добавить телефон
            </el-button>
          </div>
        </el-col>

      </el-row>

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
  edit: {
    type: Boolean,
    default: false
  }
});

const mobileStore = useMobileStore();
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });
const labelPosition = computed(() => { return mobileStore.isMobile ? 'top' : 'right' });

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
const parentFunctions = ref({ updateTable: () => { } });
const labelHeaderDialog = computed(() => {
  return props.edit ? 'Форма редактирования участника' : 'Форма добавления участника'
});

const showDialog = (currentSolution: Personinfo) => {
  if (!props.edit) {
    person = reactive(<Personinfo>{});
  }
  dialogFormVisible.value = true;
};

const confirmDialog = ref();
const showDeclineDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = props.edit ? 'Не сохранять участника?' : `Не добавлять участника?`;
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
      confirmDialog.value.titleBody = props.edit ? 'Сохранить участника?' : `Добавить участника?`;
      confirmDialog.value.acceptFunction = async () => {
        try {
          await $fetch(`/person`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'POST',
            body: JSON.stringify(person),
          });
          parentFunctions.value.updateTable();
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

const editingIndex = ref(-1);
const editingPhone = ref('');

const addNewPhone = () => {
  if (!person.addPhoneNums) {
    person.addPhoneNums = [];
  }
  person.addPhoneNums.push('');
  editingIndex.value = person.addPhoneNums.length - 1;
  editingPhone.value = '';
};

const editPhone = (index: number) => {
  editingIndex.value = index;
  editingPhone.value = person.addPhoneNums[index];
};

const deletePhone = (index: number) => {
  person.addPhoneNums.splice(index);
}

const savePhone = (index: number) => {
  if (editingPhone.value && /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/.test(editingPhone.value)) {
    person.addPhoneNums[index] = editingPhone.value;
    editingIndex.value = -1;
    editingPhone.value = '';
  }else{
    ElMessage({
      message: 'Неправильный номер телефона!',
      type: 'error',
      appendTo: '.el-overlay',
    });
  }

};

//экспорт функции для использования через ref
defineExpose({ showDialog, dialogFormVisible, parentFunctions, person });

</script>

<style type="less" scoped>

</style>