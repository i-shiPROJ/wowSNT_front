<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>
        <wow-toppagetitle namePage="Собрания и голосование" />
        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Текущие голосования:</b></template>
              <template #body>
                <div>
                  <span>Голосование от 24.06.2024</span>
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
                <!-- <el-button type="primary" @click="openFormLegalInform()">Изменить</el-button> -->
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>Все собрания:</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Добавить собрание" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="addMeeting()" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPlus" />
                      </el-icon>
                    </el-button>
                  </el-tooltip>

                </div>
              </template>
              <template #body>
                <el-table :data="meetings?.items" stripe style="width: 100%" class="cur-pointer" @row-click="showInfo">
                  <el-table-column label="Дата собрания" width="200">
                    <template #default="scope">
                      <span>{{ moment(scope.row.votingEndDate).format('YYYY-MM-DD HH:mm') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="protocolNum" label="Протокол №" width="200" />
                  <el-table-column prop="venue" label="Место проведения" min-width="200" />
                  <el-table-column label="Начало" width="200">
                    <template #default="scope">
                      <span>{{ moment(scope.row.votingEndDate).format('YYYY-MM-DD HH:mm') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Конец" width="200">
                    <template #default="scope">
                      <span>{{ moment(scope.row.votingEndDate).format('YYYY-MM-DD HH:mm') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="" width="70">
                    <template #default="scope">
                      <el-tooltip content="Удалить собрание" placement="bottom-end" effect="light">
                        <el-button type="danger" @click.stop="deleteRow(scope.row)" circle>
                          <el-icon style="vertical-align: middle">
                            <wow-icon type="mdi" :path="$mdi.mdiTrashCanOutline" />
                          </el-icon>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>

                <el-pagination class="mt-20 mb-5" v-model:current-page="currentPage" v-model:page-size="pageSize"
                  :page-sizes="[10, 50, 100]" layout="sizes, prev, pager, next" :total="meetings?.totalItems || 0"
                  @size-change="handleSizeChange" @current-change="handleCurrentChange" />

              </template>
              <template #footer>
                <!-- <el-button type="primary" @click="openFormLegalInform()">Изменить</el-button> -->
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
import type { Pagination } from '~/interface/Pagination.interface';

const router = useRouter();
const route = useRoute();
//const currentRoute = router.currentRoute.value;

const confirmDialog = ref();
const meetings = ref<Pagination<Meeting[]>>();
const currentPage = ref(1);
const pageSize = ref(100);

onMounted(async () => {
  getMeetings();
})

const getMeetings = async () => {
  try {
    meetings.value = await $fetch<Pagination<Meeting[]>>(`meeting/snt/${route.params.adminid}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });
  }
  catch (error) {
    console.error(error)
  }
}

const addMeeting = () => {
  router.push(`/admin/${route.params.adminid}/meetingvoting/add`);
}

const showInfo = (row: Meeting) => {
  router.push(`/admin/${route.params.adminid}/meetingvoting/${row.id}/edit`);
}

const deleteRow = async (row: Meeting) => {
  confirmDialog.value.title = 'Внимание!'
  confirmDialog.value.titleBody = `Удалить выбранное собрание?`;

  confirmDialog.value.acceptFunction = async () => {
    try {
      await $fetch<Meeting>(`meeting/${row.id}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'DELETE',
      });
      getMeetings();
      confirmDialog.value.showCloseDialog();
    } catch (error: any) {
      ElMessage({
        message: error.data.message,
        type: 'error',
      });
      throw new Error(String(error));
    }
  };

  confirmDialog.value.showConfirmDialog();

}


const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  currentPage.value = 1; // сбрасываем на первую страницу
  getMeetings();
}

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  getMeetings();
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