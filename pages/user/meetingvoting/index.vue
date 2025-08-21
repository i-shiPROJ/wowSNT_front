<template>

  <NuxtLayout name="user">
    <template #main>
      <div>
        <wow-toppagetitle namePage="Собрания и голосование" />
        <el-row v-for="area in getArraySTROLE_O" :key="area.id">

          <el-col v-for="(voiting, index) in votings" :key="voiting.id || index" :xs="24" :sm="24" :md="6" :lg="6"
            :xl="6">
            <wow-card>
              <template #header><b>Голосование в {{ area.area.snt.title }}:</b></template>
              <template #body>
                <div>
                  <span>{{ voiting.protocolNum }}</span>
                  <div class="statistik-block fc fc-row fc-justify-space-b fc-justify-center fc-wrap">
                    <div class="detail-voiting fc fc-row m-10">
                      <div class="icon-border fc fc-align-center fc-justify-center" :class="getColor(voiting.isUsed)">
                        <wow-icon :size="25" type="mdi"
                          :path="voiting.isUsed ? $mdi.mdiCheck : $mdi.mdiFlagCheckered" />
                      </div>
                      <div class="inform-block fc fc-col fc-align-left fc-justify-center">
                        <div class="size f-w-700">Статус</div>
                        <div class="label">{{ voiting.isUsed ? `уже голосовали` : `не голосовали` }}</div>
                      </div>
                    </div>

                    <div class="detail-voiting fc fc-row m-10">
                      <div class="icon-border fc fc-align-center fc-justify-center">
                        <wow-icon :size="30" type="mdi" :path="$mdi.mdiClockOutline" />
                      </div>
                      <div class="inform-block fc fc-col fc-align-left fc-justify-center">
                        <div class="size f-w-700">До конца</div>
                        <div class="label">{{ getDoneTime(voiting) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #footer>
                <el-button type="primary" @click="openFormMeeting(voiting.id)"
                  :disabled="voiting.isUsed">Голосовать</el-button>
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

import { reactive, onMounted, ref, computed } from 'vue';
import moment from 'moment';
import type { Ownerships } from '~/interface/Ownerships.interface';
import type { Meeting } from '~/interface/meeting/Meeting';
import type { Pagination } from '~/interface/Pagination.interface';
import { useUserStore } from '@/stores/userInfo';
import type { Bulletin } from '~/interface/bulletin/Bulletin';
const userInfoStore = useUserStore();


const router = useRouter();
const route = useRoute();

const meetings = ref<Pagination<Meeting[]>>();
const votings = ref<Meeting[]>([]);


// Обработчик для обновления страницы
onMounted(async () => {
  await loadMeetings();
});

// Отдельная функция для загрузки
const loadMeetings = async () => {
  if (getArraySTROLE_O.value.length === 0) return;

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
  const meetingsArray = validResults.flatMap(result => result.items || []).flat();

  // Загружаем бюллетени для каждого голосования
  await Promise.all(
    meetingsArray.map(async (item) => {
      try {
        const resultBulletin: Bulletin = await $fetch<Bulletin>(`/meeting/bulletin/${item.id}`, {
          baseURL: useRuntimeConfig().public.baseURL,
          method: 'GET'
        });
        item.isUsed = resultBulletin.isUsed;
      } catch (error) {
        item.isUsed = false;
      }
    })
  )

  votings.value = meetingsArray.filter(item => getVisible(item.votingEndDate));

};



const getArraySTROLE_O = computed(() => {
  //вовзрат массива для отображения своих участков в садоводчестве, где нет даты окончания владения участком
  return userInfoStore.currentUser.areaOwnerships ? userInfoStore.currentUser.areaOwnerships.filter((item: Ownerships) => !item.endDate) : [];
});

const openFormMeeting = (id: number | null) => {
  navigateTo(`/user/meetingvoting/${id}`);
}

const getColor = (isUsed: boolean) => {
  return isUsed ? 'green' : '';
}

const getDoneTime = (voting: Meeting) => {
  const now = moment();
  const end = moment(voting.votingEndDate);
  const duration = moment.duration(end.diff(now));
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  return `${days} д. ${hours} ч. ${minutes} мин.`;
}

const getVisible = (votingEndDate: string) => {
  const now = moment();
  const end = moment(votingEndDate);
  const duration = moment.duration(end.diff(now));

  return duration.milliseconds() > 0 ? true : false;
}



</script>

<style lang="less" scoped>
.statistik-block {
  padding: 5px 0px;

  .detail-voiting {

    .icon-border {
      width: 55px;
      height: 55px;
      border: 2px solid;
      border-radius: 50%;

      &.green {
        border-color: #8ec07c;
        color: #8ec07c;
      }

      &.red {
        border-color: #F56C6C;
        color: #F56C6C;
      }
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