<template>
  <div>

    <el-row class="wow-user">
      <el-col :xs="24" :sm="10" :md="6" :lg="6" :xl="7">
        <wow-card class="cur-pointer" @click="switchMode()">
          <template #header><b>Переключение режима</b></template>
          <template #body>
            <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">

              <wow-icon type="mdi" :path="$mdi.mdiHomeSwitchOutline" style="width: 70px; height: 70px;"></wow-icon>
              <span>Режим садовода</span>
            </div>
          </template>
        </wow-card>
      </el-col>

    </el-row>

    <el-row class="bbb">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <wow-card class="cur-pointer" @click="switchMode()">
          <template #header>Членство в СНТ краснодаргорстрой</template>
          <template #body>
            <el-row>
              <el-col :xs="24" :sm="10" :md="5" :lg="4" :xl="1" class="widget-snt">
                <div class="fc fc-row fc-align-end">
                  <wow-icon class="icon" type="mdi" :path="$mdi.mdiEmailOutline"
                    style="width: 50px; height: 50px;"></wow-icon>
                  <div class="text f-w-900">
                    2 сообщ.
                  </div>
                </div>

                <span>Сообщения</span>
              </el-col>
              <el-col :xs="24" :sm="10" :md="5" :lg="4" :xl="1" class="widget-snt">
                <div class="fc fc-row fc-align-end">
                  <wow-icon class="icon" type="mdi" :path="$mdi.mdiCurrencyRub"
                    style="width: 50px; height: 50px;"></wow-icon>
                  <div class="text f-w-900">
                    14500p.
                  </div>
                </div>

                <span>Оплата</span>

              </el-col>

            </el-row>
          </template>
        </wow-card>
      </el-col>
    </el-row>

    <!--     <div class="fc fc-row fc-wrap fc-justify-space-b">
      <wow-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
        <template #body>
          <div class="fc fc-row fc-wrap fc-justify-space-b">

            <wow-card-col class="cur-pointer" :xs="1" :sm="2" :md="2" :lg="4" :xl="4" @click="switchMode()">
              <template #header><b>Переключение режима</b></template>
      <template #body>
                <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">

                  <wow-icon type="mdi" :path="$mdi.mdiHomeSwitchOutline" style="width: 70px; height: 70px;"></wow-icon>
                  <span>Режим садовода</span>
                </div>
              </template>
      </wow-card-col>
      </div>

      </template>
      </wow-col>

      </div> -->

  </div>



</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'user'
})

const switchMode = () => navigateTo('/admin');

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

.widget-snt {
  width: 100%;
  height: 100px;
  border: 1px dotted #E0E3EA;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 4px solid #9AA1B7;
  transition: color 0.9s ease, border-left-color 0.9s ease;;

  .icon {
    width: 50px;
    color: #9AA1B7;
    transition: color 0.9s ease;
  }

  .text {
    width: calc(100% - 50px);
    text-align: end;
    color: #dd6f48;
  }
}

.widget-snt:hover {
  border-left: 4px solid #dd6f48;
  color: #dd6f48;

  .icon {
    color: #dd6f48;
  }
}

</style>