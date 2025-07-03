<template>

  <NuxtLayout name="admin">
    <template #main>
      <div>

        <wow-toppagetitle namePage="Информация о собрании" />
        <el-row>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header><b>О собрании:</b></template>
              <template #header-options>
                <div>
                  <el-tooltip content="Редактировать район" placement="bottom-end" effect="light">
                    <el-button type="primary" @click="editMeeting()" circle>
                      <el-icon style="vertical-align: middle">
                        <wow-icon type="mdi" :path="$mdi.mdiPencilOutline" />
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


        <el-row v-for="item in dataMeeting.votingItems" :key="item.id">

          <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
            <wow-card>
              <template #header><b>{{ item.wording }}:</b></template>
              <template #header-options>
                <div> </div>
              </template>
              <template #body>
                <div class="fc fc-col">
                  <el-row>

                  </el-row>
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
  Object.assign(dataMeeting, data);
}

const editMeeting = () => {
  router.push(`/admin/${route.params.adminid}/meetingvoting/${route.params.meetingid}/edit`);
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