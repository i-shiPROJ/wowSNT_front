<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="8">
            <wow-card>
              <template #header><b>Юридическая информация: {{ dataSnt.title }}</b></template>
              <template #body>

                <div class="fc fc-col">
                  <div class="label-body fc fc-col">
                    <div>Адресс:</div>
                    <div class="area-naming-st">{{ dataSnt.address }}</div>
                  </div>
                  <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <div class="label-body fc fc-col">
                        <div>ИНН:</div>
                        <div class="area-naming-st">{{ dataSnt.inn }}</div>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <div class="label-body fc fc-col">
                        <div>ОГРН:</div>
                        <div class="area-naming-st">{{ dataSnt.ogrn }}</div>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <div class="label-body fc fc-col">
                        <div>ОКТМО:</div>
                        <div class="area-naming-st">{{ dataSnt.oktmoCode }}</div>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <div class="label-body fc fc-col">
                        <div>Дата регистрации:</div>
                        <div class="area-naming-st">{{ dataSnt.regDate }}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </template>
              <template #footer>
                <el-button type="primary" @click="openFormLegalInform()">Изменить</el-button>
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="5">
            <wow-card>
              <template #header><b>Роли</b></template>
              <template #body>

                Всего ролей - 4шт.


              </template>
              <template #footer>
                <el-button type="primary">Изменить</el-button>
              </template>
            </wow-card>
          </el-col>

        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="5">
            <wow-card>
              <template #header><b>Тариф</b></template>
              <template #body>

                Ваш текущий Тариф><br />
                Окончание
                Оплата 100р в год


              </template>
              <template #footer>
                <el-button type="primary">Изменить</el-button>
              </template>
            </wow-card>
          </el-col>
        </el-row>

      </div>

      <LegalInformEditDialog ref="solutiondialog" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Настройки'
})

import { reactive, onMounted, ref } from 'vue';
import type { SntInterface } from '~/interface/Snt.interface';

const route = useRoute();
//const currentRoute = router.currentRoute.value;

// Создайте реактивный объект, соответствующий SntInterface
let dataSnt = reactive<SntInterface>({
  id: 0,
  inn: '',
  ogrn: '',
  regDate: '',
  title: '',
  oktmoCode: '',
  address: ''
});

onMounted(async () => {
  //const fetchedData = await loadInfoSnt(); // Дождитесь завершения загрузки данных
  await setDataSnt(); // Передайте полученные данные в updDataSnt
})

const setDataSnt = async () => {
  Object.assign(dataSnt, await loadInfoSnt());
}

const loadInfoSnt = async () => {
  const fetchedData = await $fetch<SntInterface>(`/snt/${route.params.adminid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  return fetchedData;
}

const solutiondialog = ref();
const openFormLegalInform = async () => {
  const loading = ElLoading.service({ text: 'Загрузка...', fullscreen: true, background: 'rgba(0, 0, 0, 0.7)' });
  try {
    await setDataSnt();
    solutiondialog.value.parentFunctions.setDataSnt = setDataSnt;
    solutiondialog.value.showDialog(dataSnt, setDataSnt); // Дождитесь завершения загрузки данных
  } catch (error) {
    console.error("Error:", error);
    ElMessage.error("Ошибка запроса");
  } finally {
    loading.close();
  }
};
</script>

<style lang="less" scoped>
.label-body {
  padding: 10px 0;

  .area-naming-st {
    padding: 10px;
    border-left: 4px solid #F56C6C;
  }
}

</style>