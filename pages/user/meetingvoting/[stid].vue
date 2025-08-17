<template>

  <NuxtLayout name="user">
    <template #main>
      <div>
        <wow-toppagetitle namePage="Собрания и голосование" />
        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Приложения к голосованию:</b></template>
              <template #body>
                <div class="fc fc-col">
                  <Wow-file-viewer :files="meeting.files" :folder="meeting.id?.toString()" typeUrl="meeting" />
                </div>
              </template>
              <template #footer>
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Бюллетень:</b></template>
              <template #header-options>
              </template>
              <template #body>
                <el-form ref="votingForm" :model="votingFormData" :rules="votingRules" label-width="0">
                  <div class="fc fc-col">
                    <el-row>

                      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                        <wow-label-text label="Дата начала голосования:">
                          <template #body>
                            <span>{{ moment(meeting.votingStartDate).format('YYYY-MM-DD HH:mm') }}</span>
                          </template>
                        </wow-label-text>
                      </el-col>

                      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                        <wow-label-text label="Дата окончания голосования:">
                          <template #body>
                            <span>{{ moment(meeting.votingEndDate).format('YYYY-MM-DD HH:mm') }}</span>
                          </template>
                        </wow-label-text>
                      </el-col>

                    </el-row>

                    <el-row>
                      <el-col v-for="(voiting, index) in bulletin.votingItems" :xs="24" :sm="24" :md="24" :lg="11"
                        :xl="7" class="widget-voit">
                        <div class="header"><b> {{ voiting.wording }}</b></div>
                        <el-form-item :prop="`votingResults.${index}`" :rules="votingRules.resultVoting">
                          <el-radio-group class="wow-w-100" v-model="votingFormData.votingResults[index]"
                            @change="updateMeetingVoting(index, $event)">
                            <el-radio v-for="ansver in voiting.votingOptions" :value="ansver.votingOptionId || ''"
                              border class="ansverTect">
                              {{ ansver.wording }}
                            </el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-form>
              </template>
              <template #footer>
                <el-button type="primary" @click="sendQuestion()">Отправить бюллетень</el-button>
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
import type { Meeting } from '~/interface/meeting/Meeting';
import type { Bulletin } from '~/interface/bulletin/Bulletin';

const router = useRouter();
const route = useRoute();
//const currentRoute = router.currentRoute.value;

const confirmDialog = ref();
const meeting = reactive(<Meeting>({} as Meeting));
const bulletin = reactive(<Bulletin>({} as Bulletin));

const votingForm = ref();
const votingFormData = reactive({
  votingResults: [] as (string | number | undefined)[]
});

const votingRules = {
  resultVoting: [
    { required: true, message: 'Пожалуйста, выберите вариант ответа', trigger: 'change' }
  ]
};

onMounted(async () => {
  getMeeting();
})

const getMeeting = async () => {
  try {
    Object.assign(meeting, await $fetch<Meeting>(`meeting/${route.params.stid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    }));

    Object.assign(bulletin, await $fetch<Meeting>(`/meeting/bulletin/${route.params.stid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    }));

    // Инициализируем массив для валидации
    votingFormData.votingResults = new Array(meeting.votingItems?.length || 0).fill('');

    // Если уже есть выбранные ответы, копируем их
    if (meeting.votingItems) {
      meeting.votingItems.forEach((item, index) => {
        if (item.resultVoting) {
          votingFormData.votingResults[index] = item.resultVoting;
        }
      });
    }
  }
  catch (error) {
    console.error(error)
  }
}

const updateMeetingVoting = (index: number, value: any) => {
  // Обновляем данные в bulletin для совместимости
  if (bulletin.votingItems && bulletin.votingItems[index]) {
    bulletin.votingItems[index].resultVoting = value;
  }
  console.log('bulletin', bulletin);
}

const sendQuestion = async () => {
  try {
    const valid = await votingForm.value.validate();
    if (valid) {
      console.log('send', meeting);
      const modelSend = bulletin.votingItems.map((item, index) => ({
        "id": '',
        "personId": '',
        "votingItemId": item.votingItemId,
        "votingOptionId": votingFormData.votingResults[index]
      }));
      console.log('send', modelSend);
    }
  } catch (error) {
    console.error('Ошибка валидации:', error);
    ElMessage.error(`Не все ответы выбраны`);
  }
}


</script>

<style lang="less" scoped>
.widget-voit {
  cursor: default;
  width: 100%;
  min-height: 100px;
  border: 1px dotted #E0E3EA;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 4px solid #9AA1B7;
  transition: color 0.9s ease, border-left-color 0.9s ease;

  .header {
    color: #9AA1B7;
    margin-bottom: 10px;
    transition: color 0.9s ease;
  }

  .text {
    // width: calc(100% - 50px);
    text-align: end;
    color: #F56C6C;
  }

  .ansverTect {
    width: 100%;
    margin: 5px 15px;
  }
}

.widget-voit:hover {
  border-left: 4px solid #dd6f48;
  color: #F56C6C;

  .header {
    color: #F56C6C;
  }
}
</style>