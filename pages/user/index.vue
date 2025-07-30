<template>
  <div>

    <el-row class="wow-user">

      <el-col v-for="(snt, index) in getArraySTRole_p" :key="snt.id" :xs="24" :sm="11" :md="6" :lg="6" :xl="7">
        <wow-card class="cur-pointer" @click="switchMode(snt.snt.id)">
          <template #header><b>Переключение режима</b></template>
          <template #body>
            <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">
              <wow-icon type="mdi" :path="$mdi.mdiHomeSwitchOutline" style="width: 70px; height: 70px;"></wow-icon>
              <span>Управлять товариществом</span>
              <span class="nameST"><b>{{ snt.snt.title }}</b></span>
            </div>
          </template>
        </wow-card>
      </el-col>

    </el-row>

    <el-row v-for="area in getArraySTROLE_O" :key="area.id" class="block-house">

      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10" class="wow-area-info">

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card class="cur-pointer">
              <template #header>{{ area.area.snt.title }}</template>
              <template #body>
                <div class="wow-stinfo">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <div class="fc fc-col st-time">
                        <div>пн: 18:00 - 20:00</div>
                        <div>пт: 14:00 - 19:00</div>
                        <div>сб: 10:00 - 15:00</div>
                      </div>
                      <div class="st-phone">
                        тел: +79676878656
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <div class="st-phone">
                        <span>ИНН: {{ area.area.snt.inn }}</span><br />
                        <span>ОГРН: {{ area.area.snt.ogrn }}</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </wow-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <wow-card>
              <template #header>Адрес вашего участка</template>
              <template #body>
                <div class="area-house">
                  <div>{{ area.area.cadastralNum }}</div>
                  <div>{{ area.area.address }}</div>
                  <div>Кол-во проживающих: {{ area.area.residentsNum }}</div>
                </div>

              </template>
            </wow-card>
          </el-col>
        </el-row>

      </el-col>


      <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14" class="wow-area-widgets">
        <wow-card class="">
          <template #header>Действия в СНТ краснодаргорстрой</template>
          <template #body>
            <div class="body-height">
              <el-row>

                <el-col :xs="24" :sm="24" :md="11" :lg="10" :xl="7" class="widget-snt cur-pointer"
                  @click="toPageMessage('12')">
                  <div class="fc fc-row fc-align-end">
                    <wow-icon class="icon" type="mdi" :path="$mdi.mdiEmailOutline"
                      style="width: 50px; height: 50px;"></wow-icon>
                    <div class="text f-w-900">
                      2 сообщ.
                    </div>
                  </div>
                  <span>Сообщения</span>
                </el-col>

                <el-col :xs="24" :sm="24" :md="11" :lg="10" :xl="7" class="widget-snt cur-pointer"
                  @click="toPagePayment">
                  <div class="fc fc-row fc-align-end">
                    <wow-icon class="icon" type="mdi" :path="$mdi.mdiCurrencyRub"
                      style="width: 50px; height: 50px;"></wow-icon>
                    <div class="text f-w-900">
                      1458800p.
                    </div>
                  </div>
                  <span>Оплата</span>
                </el-col>

                <el-col :xs="24" :sm="24" :md="11" :lg="10" :xl="7" class="widget-snt cur-pointer"
                  @click="toPageDocsst">
                  <div class="fc fc-row fc-align-end">
                    <wow-icon class="icon" type="mdi" :path="$mdi.mdiFileDocumentMultipleOutline"
                      style="width: 50px; height: 50px;"></wow-icon>
                    <div class="text f-w-900">
                      Посмотреть документ СТ
                    </div>
                  </div>
                  <span>Документы снт</span>
                </el-col>

                <el-col :xs="24" :sm="24" :md="11" :lg="10" :xl="7" class="widget-snt cur-pointer" @click="toPageNews">
                  <div class="fc fc-row fc-align-end">
                    <wow-icon class="icon" type="mdi" :path="$mdi.mdiNewspaperVariantOutline"
                      style="width: 50px; height: 50px;"></wow-icon>
                    <div class="text f-w-900">

                    </div>
                  </div>
                  <span>Новости СТ</span>
                </el-col>

                <el-col :xs="24" :sm="24" :md="11" :lg="10" :xl="7" class="widget-snt cur-pointer" @click="toPageVote">
                  <div class="fc fc-row fc-align-end">
                    <wow-icon class="icon" type="mdi" :path="$mdi.mdiBallotOutline"
                      style="width: 50px; height: 50px;"></wow-icon>
                    <div class="text f-w-900">
                      Новое голосование
                    </div>
                  </div>
                  <span>Голосование</span>
                </el-col>

              </el-row>
            </div>


          </template>
        </wow-card>
      </el-col>
    </el-row>

  </div>



</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user'
})

import { useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/userInfo';
const userInfoStore = useUserStore();

import type { Memberships } from '~/interface/Memberships.interface';
import type { Ownerships } from '~/interface/Ownerships.interface';
//const { $utils } = useNuxtApp();


onMounted(async () => {
  //await getUserInfo();
  //loadMounInfo();
});

const getArraySTRole_p = computed(() => {
  //вовзрат массива для отображения кнопок по управлению снт, где есть роль 
  return userInfoStore.currentUser.memberships ? userInfoStore.currentUser.memberships.filter((item: Memberships) => item.role.code === 'ROLE_P') : [];
});

const getArraySTROLE_O = computed(() => {
  //вовзрат массива для отображения своих участков в садоводчестве, где нет даты окончания владения участком
  return userInfoStore.currentUser.areaOwnerships ? userInfoStore.currentUser.areaOwnerships.filter((item: Ownerships) => !item.endDate) : [];
});




const toPageMessage = (id: string) => navigateTo(`/user/page-widgets/message/${id}`);
const toPagePayment = () => navigateTo(`/user/page-widgets/payment/1`);
const toPageDocsst = () => navigateTo(`/user/page-widgets/docsst/1`);
const toPageNews = () => navigateTo(`/user/page-widgets/news/1`);
const toPageVote = () => navigateTo(`/user/page-widgets/vote/1`);

const switchMode = (id: number) => navigateTo(`/admin/${id}`);

const percentage = ref(20);
const customColors = [
  { color: '#f56c6c', percentage: 40 },
  { color: '#e6a23c', percentage: 90 },
  { color: '#5cb87a', percentage: 100 },
]

</script>

<style scoped>
.wow-user {
  width: 100%;
}

.block-house {
  padding-bottom: 15px;
  border-bottom: dashed 2px #F56C6C;

  .body-height {
    min-height: 330px;
  }

  .wow-area-info {

    .wow-stinfo {
      min-height: 107px;

      .st-time {
        padding-left: 10px;
        border-left: 4px solid #87af87;

      }

      .st-phone {
        padding: 10px 0;
      }
    }

    .area-house {
      min-height: 107px;
      padding-left: 10px;
      border-left: 4px solid #F56C6C;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

  }

  .wow-area-widgets {
    min-height: 340px;

    .info-area-user {
      padding: 0px 5px;
    }

    .widget-snt {
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

      .icon {
        width: 50px;
        color: #9AA1B7;
        transition: color 0.9s ease;
      }

      .text {
        width: calc(100% - 50px);
        text-align: end;
        color: #F56C6C;
      }
    }

    .widget-snt:hover {
      border-left: 4px solid #dd6f48;
      color: #F56C6C;

      .icon {
        color: #F56C6C;
      }
    }
  }
}
</style>