<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="Форма добавления участка" :width="getWidthDialog">

      <el-form ref="formRef" style="width: 100%" :model="area" label-width="auto" :rules="rules">

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

            <el-form-item prop="cadastralNum" label="Кадастровый номер">
              <el-input v-model="area.cadastralNum" style="width: 100%;" placeholder="Введите кадастровый номер">
                <template #append>
                  <el-tooltip content="Найти по кадастр. номеру" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="searchCadastrNumber" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiMagnify" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="address" label="Адрес участка">
              <el-input v-model="area.address" style="width: 100%;" placeholder="Введите адрес" />
            </el-form-item>
            <el-form-item prop="square" label="Площадь участка">
              <el-input-number v-model="area.square" :min="0" :step="0.5" :max="9999" />
            </el-form-item>
            <el-form-item prop="residentsNum" label="Количество проживающих">
              <el-input-number v-model="area.residentsNum" :min="0" :step="1" :max="999" />
            </el-form-item>
            <el-form-item label="Район" prop="districtId">
              <el-select-v2 v-model="area.districtId" placeholder="Выберите район для участка" :options="optionsDistricts" filterable />
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
import { reactive, ref, onMounted } from 'vue'
import { useMobileStore } from '~/stores/mobileInfo';
import type { Area } from '~/interface/Area.interface';
import type { cadastrInterface } from '~/interface/Cadastr.interface';
import type { District } from '~/interface/District.interface';
import type { FormInstance, FormRules } from 'element-plus';

import { ElMessage, ElLoading } from 'element-plus';

const route = useRoute();
const mobileStore = useMobileStore();
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 800 });

let area = reactive(<Area>{});

const formRef = ref<FormInstance>();

const rules = reactive<FormRules<typeof area>>({
  cadastralNum: [
    { required: true, message: 'Введите Фамилию', trigger: 'change', },
  ],
  address: [
    { required: true, message: 'Введите адрес участка', trigger: 'change', },
  ],
  square: [
    { required: true, message: 'Введите площадь участка', trigger: 'blur' },
    { type: 'number', min: 0, max: 999, message: 'Длина поля от 0 - 999', trigger: 'blur' }
  ],
  residentsNum: [
    { required: true, message: 'Введите кол-во проживающих', trigger: 'blur' },
    { type: 'number', min: 0, max: 99, message: 'Длина поля от 0 - 99', trigger: 'blur' }
  ],
  districtId: [
    { required: false, message: 'Выберите СТ', trigger: 'change' }
  ],
})

const dialogFormVisible = ref(false);
const parentFunctions = ref({ updateParrentTable: () => { } });

const showDialog = () => {
  area = reactive(<Area>{});
  dialogFormVisible.value = true;
};

const confirmDialog = ref();
const showDeclineDialog = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Не добавлять участок?`;
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
      confirmDialog.value.titleBody = `Добавить участок?`;
      confirmDialog.value.acceptFunction = async () => {
        area.sntId = parseInt(String(route.params.adminid));
        try {
          await $fetch(`/area`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'POST',
            body: JSON.stringify(area),
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

const searchCadastrNumber = async () => {
  try {
    const modelObject = await $fetch<cadastrInterface>(`cadastral/${area.cadastralNum}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });

    area.address = modelObject.address;
    area.square = modelObject.square;

  } catch (error: any) {

    console.error("Ошибка:", error);
    if (error.response.status > 400 && error.response.status < 500) {
      ElMessage.error('Скорее всего, что Вы ошиблись, попробуйте ввести кадастровый номер еще раз');
    }

    if (error.response.status > 500 && error.response.status < 600) {
      ElMessage.info('Не удалось получить информацию из Росреестра, вбейте адрес вручную');
    }

  }
};

const optionsDistricts = ref<{ value: number; label: string; }[]>([]);

const fetchOptionsDistricts = async () => {
  const response = await $fetch<District[]>(`district/snt/${route.params.adminid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  optionsDistricts.value = response.map(item => ({
    value: item.id,
    label: item.title
  }));
};

// Вызовите эту функцию, когда компонент будет смонтирован
onMounted(() => {
  fetchOptionsDistricts();
});

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