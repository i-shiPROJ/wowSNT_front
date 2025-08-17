<template>

  <NuxtLayout name="user">
    <template #main>
      <div>
        <wow-toppagetitle namePage="Собрания и голосование" />
        <el-row v-for="area in getArraySTROLE_O" :key="area.id">

          <el-col v-for="(voiting, index) in votings" :key="voiting.id || index" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <wow-card>
              <template #header><b>Голосования в {{ area.area.snt.title }}:</b></template>
              <template #body>
                <div>
                  <span>{{ voiting.protocolNum }}</span>
                  <div class="statistik-block fc fc-row fc-justify-space-b fc-justify-center fc-wrap">
                    <div class="detail-voiting fc fc-row m-10">
                      <div class="icon-border fc fc-align-center fc-justify-center">
                        <wow-icon :size="25" type="mdi" :path="$mdi.mdiCheck" />
                      </div>
                      <div class="inform-block fc fc-col fc-align-left fc-justify-center">
                        <div class="size f-w-700">243 чел.</div>
                        <div class="label">проголосовало</div>
                      </div>
                    </div>

                    <div class="detail-voiting fc fc-row m-10">
                      <div class="icon-border fc fc-align-center fc-justify-center">
                        <wow-icon :size="30" type="mdi" :path="$mdi.mdiChartLine" />
                      </div>
                      <div class="inform-block fc fc-col fc-align-left fc-justify-center">
                        <div class="size f-w-700">3%</div>
                        <div class="label">эффективность</div>
                      </div>
                    </div>

                    <div class="detail-voiting fc fc-row m-10">
                      <div class="icon-border fc fc-align-center fc-justify-center">
                        <wow-icon :size="30" type="mdi" :path="$mdi.mdiClockOutline" />
                      </div>
                      <div class="inform-block fc fc-col fc-align-left fc-justify-center">
                        <div class="size f-w-700">2:30</div>
                        <div class="label">до конца</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #footer>
                <el-button type="primary" @click="openFormMeeting(voiting.id)">Голосовать</el-button>
              </template>
            </wow-card>
          </el-col>


        </el-row>

        <Confirm-dialog ref="confirmDialog" />

      </div>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Собрания и голосование'
})

import { reactive, onMounted, ref } from 'vue';
import moment from 'moment';
import type { Ownerships } from '~/interface/Ownerships.interface';
import type { Meeting } from '~/interface/meeting/Meeting';
import type { Pagination } from '~/interface/Pagination.interface';



import { useUserStore } from '@/stores/userInfo';
const userInfoStore = useUserStore();


const router = useRouter();
const route = useRoute();

const meetings = ref<Pagination<Meeting[]>>();
  const votings = ref<Meeting[]>([]);

onMounted(async () => {
  // Загружаем голосования для всех участков
  const promises = getArraySTROLE_O.value.map(async (area) => {
    try {
      return await $fetch<Pagination<Meeting[]>>(`meeting/snt/${area.area.snt.id}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'GET',
      });
    } catch (error: any) {
      ElMessage({
        message: error.data.message,
        type: 'error',
      });
      return null;
    }
  });
  
  const results = await Promise.all(promises);
  const validResults = results.filter(Boolean) as Pagination<Meeting[]>[];
  votings.value = validResults.flatMap(result => result.items || []).flat();
  console.log(votings.value);
});

const getArraySTROLE_O = computed(() => {
  //вовзрат массива для отображения своих участков в садоводчестве, где нет даты окончания владения участком
  return userInfoStore.currentUser.areaOwnerships ? userInfoStore.currentUser.areaOwnerships.filter((item: Ownerships) => !item.endDate) : [];
});

const openFormMeeting = (id:number|null)=>{
  navigateTo(`/user/meetingvoting/${id}`);
}

</script>

<style lang="less" scoped>
.statistik-block {
  padding: 5px 30px;

  .detail-voiting {

    .icon-border {
      width: 55px;
      height: 55px;
      border: 2px solid #F56C6C;
      border-radius: 50px;
      color: #F56C6C;
    }

    .inform-block {
      // height: calc(100% - 1px);
      padding-left: 20px;

      .size {
        font-size: 1.8rem;
      }

      .label {}
    }
  }
}
</style>