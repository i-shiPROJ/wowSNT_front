<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="Форма добавления района" :width="getWidthDialog">

      <el-form ref="formRef" style="width: 100%" :model="district" label-width="auto" :rules="rules">

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

            <el-form-item prop="title" label="Название района">
              <el-input v-model="district.title" style="width: 100%;" placeholder="ул. Первомайская" />
            </el-form-item>
            <el-form-item prop="seniorId" label="Ответственный">
              <el-select v-model="district.seniorId" placeholder="Выберите ответственного" filterable>
                <el-option v-for="person in persons"
                  :label="`${person.lastName} ${person.firstName} ${person.patronymic}`" :value="person.id" />
              </el-select>
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
import type { District } from '~/interface/District.interface';
import type { Personinfo } from '~/interface/Personinfo.interface';
import type { FormInstance, FormRules } from 'element-plus';

import { ElMessage, ElLoading } from 'element-plus';

const route = useRoute();
const mobileStore = useMobileStore();
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });
const persons = ref(<Personinfo[]>[]);

let district = reactive(<District>{});

const formRef = ref<FormInstance>();

const rules = reactive<FormRules<typeof district>>({
  title: [
    { required: true, message: 'Введите название района', trigger: 'change', },
  ],
  seniorId: [
    { required: true, message: 'Выберите ответственного', trigger: 'change', },
  ],

})

const dialogFormVisible = ref(false);
const parentFunctions = ref({ updateParrentTable: () => { } });

const showDialog = async () => {
  district = reactive(<District>{});
  try {
    persons.value = await $fetch<Personinfo[]>(`person/snt-members/${route.params.adminid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  }
  catch (error) {
    console.error(error)
  }
  dialogFormVisible.value = true;
};

const confirmDialog = ref();
const showDeclineDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Не сохранять район?`;
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
      confirmDialog.value.titleBody = `Сохранить район?`;
      confirmDialog.value.acceptFunction = async () => {
        district.sntId = parseInt(String(route.params.adminid));
        try {
          await $fetch(`/district`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'POST',
            body: JSON.stringify(district),
          });
          parentFunctions.value.updateParrentTable();
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