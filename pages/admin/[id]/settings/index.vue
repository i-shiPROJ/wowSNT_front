<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="8">
            <wow-card class="cur-pointer">
              <template #header><b>Информация об товариществе {{ dataSnt.title }}</b></template>
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

                <div class="wow-card-footer">
                  <el-button type="primary">Изменить</el-button>
                </div>

              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="5">
            <wow-card class="cur-pointer">
              <template #header><b>Роли</b></template>
              <template #body>

                Всего ролей - 4шт.
                <div class="wow-card-footer">
                  <el-button type="primary">Изменить</el-button>
                </div>

              </template>
            </wow-card>
          </el-col>

        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="5">
            <wow-card class="cur-pointer">
              <template #header><b>Тариф</b></template>
              <template #body>

                Ваш текущий Тариф><br />
                Окончание
                Оплата 100р в год
                <div class="wow-card-footer">
                  <el-button type="primary">Изменить</el-button>
                </div>

              </template>
            </wow-card>
          </el-col>
        </el-row>

      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Настройки'
})

import { reactive, onMounted } from 'vue';
import type { SntInterface } from '~/interface/Snt.interface';

const router = useRouter();
const currentRoute = router.currentRoute.value;

// Создайте реактивный объект, соответствующий SntInterface
const dataSnt = reactive<SntInterface>({
  id: 0,
  inn: '',
  ogrn: '',
  regDate: '',
  title: '',
  oktmoCode: '',
  address: ''
});

onMounted(() => {
  loadInfoSnt();
})

const loadInfoSnt = async () => {
  const fetchedData = await $fetch<SntInterface>(`/snt/${currentRoute.params.id}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });

  // Обновите свойства dataSnt
  Object.assign(dataSnt, fetchedData);
  console.log(dataSnt);
}
</script>

<style lang="less" scoped>
.label-body {
  padding: 10px 0;

  .area-naming-st {
    padding: 10px;
    border-left: 4px solid #F56C6C;
  }
}


.wow-card-footer {
  display: flex;
  justify-content: end;
}
</style>