<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация о собрании" />
        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Редактор собрания:</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Сохранить собрание" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="saveMeeting()" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiContentSave" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip content="Закрыть редактор" placement="bottom-end" effect="light">
                    <el-button type="danger" @click="closeEdit()" circle>
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
                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <wow-label-text label="Дата и время собрания:" color="coral">
                        <template #body>
                          <el-date-picker v-model="dataMeeting.meetingDate" type="datetime" format="YYYY-MM-DD HH:mm"
                            value-format="YYYY-MM-DDTHH:mm:ssZ" style="width: 100%;" />
                        </template>
                      </wow-label-text>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <wow-label-text label="Дата начала голосования:" color="coral">
                        <template #body>
                          <el-date-picker v-model="dataMeeting.votingStartDate" type="datetime"
                            format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DDTHH:mm:ssZ" style="width: 100%;" />
                        </template>
                      </wow-label-text>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <wow-label-text label="Дата окончания голосования:" color="coral">
                        <template #body>
                          <el-date-picker v-model="dataMeeting.votingEndDate" type="datetime" format="YYYY-MM-DD HH:mm"
                            value-format="YYYY-MM-DDTHH:mm:ssZ" style="width: 100%;" />
                        </template>
                      </wow-label-text>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <wow-label-text label="Место:" color="coral">
                        <template #body>
                          <el-input v-model="dataMeeting.venue" />
                        </template>
                      </wow-label-text>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <wow-label-text label="Номер протокола:" color="coral">
                        <template #body>
                          <el-input v-model="dataMeeting.protocolNum" />
                        </template>
                      </wow-label-text>
                    </el-col>

                  </el-row>

                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <wow-label-text label="Порядок проведения собрания" color="coral">
                        <template #body>
                          <el-select-v2 @click.stop v-model="dataMeeting.meetingTypeCode"
                            placeholder="порядок роведения собрания:" :options="typesCodes.meetingTypeCode"
                            filterable />
                        </template>
                      </wow-label-text>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <wow-label-text label="Тип собрания:" color="coral">
                        <template #body>
                          <el-select-v2 @click.stop v-model="dataMeeting.votingFormCode" placeholder="Тип собрания:"
                            :options="typesCodes.votingFormCode" filterable />
                        </template>
                      </wow-label-text>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <wow-label-text label="Доступность собрания:" color="coral">
                        <template #body>
                          <el-select-v2 @click.stop v-model="dataMeeting.votingTypeCode"
                            placeholder="доступность собрания:" :options="typesCodes.votingTypeCode" filterable />
                        </template>
                      </wow-label-text>
                    </el-col>
                  </el-row>

                </div>
              </template>
            </wow-card>
          </el-col>

        </el-row>

        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

            <wow-card>
              <template #header><b> Приложения к голосованию:</b></template>
              <template #header-options>

              </template>
              <template #body>
                <div class="fc fc-col">
              <Wow-file-viewer :files="dataMeeting.files" typeUrl="meeting"/>
                </div>
              </template>
              <template #footer>
                <div class="fc fc-col wow-w-100">
                  <el-upload v-model:file-list="fileList" :limit="10" :auto-upload="false" :file-size="500000"
                    accept=".png,.jpg,.jpeg,.pdf" multiple>
                    <template #trigger>
                      <el-button type="primary">Выбрать файл</el-button>
                    </template>
                    <template #tip>
                      <div class="wow-fileUpload">
                        Максимум 10 файлов. Разрешены только JPG, PNG и PDF. Общий размер файлов не должен превышать 5
                        мегабайт.
                      </div>
                    </template>
                  </el-upload>
                </div>
              </template>
            </wow-card>
          </el-col>
        </el-row>


        <el-row>

          <el-col v-for="(item, index) in dataMeeting.votingItems" :key="item.ordNum" :xs="24" :sm="24" :md="24" :lg="6"
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
                <div class="fc fc-col wow-w-100">
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


        <Confirm-dialog ref="confirmDialog" />

      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Информация о собрании'
});

import moment from 'moment';

import type { Meeting } from '~/interface/meeting/Meeting';
import type { Voitingitem } from '~/interface/meeting/VoitingItem';
import type { VotingOptions } from '~/interface/meeting/VotingOptions';

import type { UploadUserFile } from 'element-plus';
const fileList = ref<UploadUserFile[]>([]);


interface selected {
  value: number; label: string;
}


const router = useRouter();
const route = useRoute();
const dataMeeting = reactive(<Meeting>{});
const confirmDialog = ref();
const typesCodes = reactive<{
  meetingTypeCode: selected[],
  votingFormCode: selected[],
  votingTypeCode: selected[],
}>({
  meetingTypeCode: [],
  votingFormCode: [],
  votingTypeCode: [],
});


onMounted(async () => {
  getCurrentMeeting();
  await getAllOptions();
  getAllOptions();
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

const getAllOptions = async () => {
  const [meetingTypes, votingForms, votingTypes] = await Promise.all([
    $fetch<{ code: number; name: string }[]>(`dict/meetingTypes`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    }),
    $fetch<{ code: number; name: string }[]>(`dict/votingForms`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    }),
    $fetch<{ code: number; name: string }[]>(`dict/votingTypes`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    }),
  ]);

  const meetingTypeOptions = meetingTypes.map(item => ({
    value: item.code,
    label: item.name
  }));
  const votingFormOptions = votingForms.map(item => ({
    value: item.code,
    label: item.name
  }));
  const votingTypeOptions = votingTypes.map(item => ({
    value: item.code,
    label: item.name
  }));
  typesCodes.meetingTypeCode = meetingTypeOptions;
  typesCodes.votingFormCode = votingFormOptions;
  typesCodes.votingTypeCode = votingTypeOptions;
};

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
  const formatDate = (date: string) => {
    const m = moment(date, 'YYYY-MM-DDTHH:mm:ss');
    return m.isValid() ? m.format('YYYY-MM-DDTHH:mm:ssZZ') : null;
  };

  const payload = {
    ...dataMeeting,
    meetingDate: formatDate(dataMeeting.meetingDate),
    votingStartDate: formatDate(dataMeeting.votingStartDate),
    votingEndDate: formatDate(dataMeeting.votingEndDate),
  };

  // Проверка на пустые даты
  if (!payload.meetingDate || !payload.votingStartDate || !payload.votingEndDate) {
    ElMessage({
      message: 'Пожалуйста, выберите все даты!',
      type: 'error',
    });
    return;
  }

  try {
    let totalFileSize = 0;
    fileList.value.forEach(file => {
      if (file.raw) {
        totalFileSize += file.raw.size;
      }
    });
    if (totalFileSize > 5000000) {
      ElMessage.error('Общий размер файлов превышает 5 мегабайт');
      return;
    } else {
      const formData = new FormData();

      // Добавляем данные формы
      formData.append('dto', JSON.stringify(payload));

      // Добавляем файлы
      fileList.value.forEach((file, index) => {
        if (file.raw) {
          formData.append(`file`, file.raw, file.name);
        }
      });

      await $fetch<Meeting>(`meeting`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'POST',
        body: formData
      });
      ElMessage({
        message: 'Сохранено',
        type: 'success',
      });
    }

  } catch (error: any) {
    ElMessage({
      message: error.data.message,
      type: 'error',
    });
    throw new Error(String(error));
  }
};

const closeEdit = () => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Сохранить изменения перед закрытием?`;
  confirmDialog.value.declineLabel = `Нет`;

  confirmDialog.value.acceptFunction = async () => {
    try {
      await saveMeeting();
      router.push(`/admin/${route.params.adminid}/meetingvoting`);
      confirmDialog.value.showCloseDialog();
    } catch (error: any) {
      ElMessage({
        message: error.data.message,
        type: 'error',
      });
      throw new Error(String(error));
    }
  };
  confirmDialog.value.declineFunction = async () => {
    router.push(`/admin/${route.params.adminid}/meetingvoting`);
    confirmDialog.value.showCloseDialog();
  };

  confirmDialog.value.showConfirmDialog();
}

const deleteQuestion = (index: number) => {
  dataMeeting.votingItems.splice(index, 1);
}

const deleteVoting = (item: VotingOptions[], index: number) => {
  item.splice(index, 1);
}

const addVoting = (items: VotingOptions[]) => {
  items.push({ id: null, ordNum: 0, wording: '' });
  items.forEach((item, index) => item.ordNum = index);
}

// http://185.42.14.187:8080/dict/allocationTypes
// http://185.42.14.187:8080/dict/meetingTypes
// http://185.42.14.187:8080/dict/votingForms
// http://185.42.14.187:8080/dict/votingTypes
// http://185.42.14.187:8080/dict/roles

</script>

<style lang="less" scoped>
.wow-fileUpload {
  padding: 20px 0;

}
</style>