<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация о собрании" />
        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Редактировать собрание:</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Сохранить собрание" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="saveMeeting()" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiContentSave" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip content="Отменить редактирование" placement="bottom-end" effect="light">
                    <el-button type="danger" @click="cancelEdit()" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiClose" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>
              <template #body>
                <div class="fc fc-col">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                      <wow-label-text label="Дата собрания:" :text="dataMeeting.meetingDate" color="coral" />
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                      <wow-label-text label="Тип собрания:" :text="dataMeeting.meetingTypeCode" color="coral" />
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                      <wow-label-text label="Место:" :text="dataMeeting.venue" color="coral" />
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                      <wow-label-text label="Дата начала голосования:" :text="dataMeeting.votingStartDate"
                        color="coral" />
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                      <wow-label-text label="Дата окончания голосования:" :text="dataMeeting.votingEndDate"
                        color="coral" />
                    </el-col>

                  </el-row>
                </div>
              </template>
            </wow-card>
          </el-col>

        </el-row>


        <el-row>

          <el-col v-for="(item, index) in dataMeeting.votingItems" :key="item.id" :xs="24" :sm="24" :md="24" :lg="6"
            :xl="6">
            <wow-card>
              <template #header><b> Вопрос {{ index + 1 }}:</b></template>
              <template #header-options>
                <el-tooltip content="Удалить пункт" placement="bottom-end" effect="light">
                  <el-button type="danger" @click="deleteQuestion(index)" circle>
                    <el-icon style="vertical-align: middle">
                      <wow-icon type="mdi" :path="$mdi.mdiClose" />
                    </el-icon>
                  </el-button>
                </el-tooltip>
              </template>
              <template #body>
                <div class="fc fc-col">
                  <el-input v-model="item.wording" :rows="2" type="textarea" placeholder="Введите вопрос" />
                </div>
              </template>
              <template #footer>
                <div class="fc fc-col">
                  <div><span>Варианты ответов:</span></div>
                  <div>
                    <div v-for="(voting, voitindex) in item.votingOptions" :id="`${index} ${voitindex}`"
                      class="fc fc-row fc-align-center mb-5">
                      <el-input v-model="voting.wording" placeholder="Введите вариант" style="width: 100%">
                        <template #append>
                          <el-button type="danger" @click="deleteVoting(item.votingOptions, voitindex)">
                            <el-icon style="vertical-align: middle">
                              <wow-icon type="mdi" :path="$mdi.mdiClose" />
                            </el-icon>
                          </el-button>
                        </template>
                      </el-input>
                    </div>

                    <el-tooltip content="Добавить вариант ответа" placement="bottom-end" effect="light">
                      <el-button type="info" @click="addVoting(item.votingOptions)" style="width: 100%">
                        <el-icon style="vertical-align: middle">
                          <wow-icon type="mdi" :path="$mdi.mdiPlus" />
                        </el-icon>
                      </el-button>
                    </el-tooltip>

                  </div>
                </div>
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <wow-card>
              <template #header><b></b></template>
              <template #header-options>
                <div> </div>
              </template>
              <template #body>
                <div class="fc fc-justify-center">
                  <el-tooltip content="Добавить вопрос" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="addQuestions()" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPlus" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>

              </template>
            </wow-card>
          </el-col>
        </el-row>


        <!-- <District-add-edit-dialog ref="dialogDistrinct" edit /> -->

      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Информация о собрании'
});

import type { District } from '~/interface/District.interface';

import type { AreaOwnershipsDescr } from '~/interface/solution/AreaOwnershipsDescr.interface';
import type { Area } from '~/interface/Area.interface';
import type { Meeting } from '~/interface/meeting/Meeting';
import type { Voitingitem } from '~/interface/meeting/VoitingItem';
import type { VotingOptions } from '~/interface/meeting/VotingOptions';

const dialogDistrinct = ref();

const router = useRouter();
const route = useRoute();
const dataMeeting = reactive(<Meeting>{});

// let area = ref<Area>();

onMounted(async () => {
  getCurrentMeeting();
});

const getCurrentMeeting = async () => {
  const data = await $fetch<Meeting>(`meeting/${route.params.meetingid}`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  if (data.votingItems) {
    data.votingItems.sort((a, b) => a.ordNum - b.ordNum);
    data.votingItems.forEach(item => item.votingOptions.sort((a, b) => a.ordNum - b.ordNum));
  }

  Object.assign(dataMeeting, data);
}

const addQuestions = () => {
  const voiting = reactive(<Voitingitem>{
    id: 0,
    ordNum: 0,
    wording: '',
    membersOnly: false,
    votingOptions: [
      { id: 0, ordNum: 0, wording: 'За' },
      { id: 1, ordNum: 1, wording: 'Против' },
      { id: 2, ordNum: 2, wording: 'Воздержался' }
    ]
  });
  dataMeeting.votingItems.push(voiting);
}

const saveMeeting = async () => {
  try {
    await $fetch<Meeting>(`meeting`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'POST',
      body: dataMeeting
    });

    ElMessage({
      message: 'Сохранено',
      type: 'success',
    });
  }
  catch (error: any) {
    throw new Error(String(error));

    ElMessage({
      message: error.data.message,
      type: 'error',
    });
  }
}

const cancelEdit = () => {
  router.push(`/admin/${route.params.adminid}/meetingvoting/${route.params.meetingid}`);
}

const deleteQuestion = (index: number) => {
  dataMeeting.votingItems.splice(index, 1);
  console.log('remove');
}

const deleteVoting = (item: VotingOptions[], index: number) => {
  console.log(index);
  item.splice(index, 1);
}

const addVoting = (items: VotingOptions[]) => {
  items.push({ id: null, ordNum: 0, wording: '' });
  items.forEach((item, index) => item.ordNum = index);
  console.log(items);
}

// const refreshData = async () => {
//   await getDistrict();
// }
// const getDistrict = async () => {
//   const data = await $fetch<District>(`district/${route.params.districtid}`, {
//     baseURL: useRuntimeConfig().public.baseURL,
//     method: 'GET'
//   });

//   Object.assign(district, data);
// }

// const editDistrinct = () => {
//   Object.assign(dialogDistrinct.value.district, district);
//   dialogDistrinct.value.showDialog();
//   dialogDistrinct.value.parentFunctions.updateParrentTable = refreshData;
// }

// const getArea = async () => {
//   area.value = await $fetch<Area>(``, {
//     baseURL: useRuntimeConfig().public.baseURL,
//     method: 'GET'
//   }
//   )
// }

const showParticipantInfo = async (row: Area) => {
  navigateTo(`/admin/${route.params.adminid}/participant/${row.id}`)
}

///area_ownership/owners_descr/{area_id}
</script>

<style lang="less" scoped></style>