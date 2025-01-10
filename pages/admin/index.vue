<template>
  <NuxtLayout name="admin">
    <template #main>
      <div class="fc fc-row fc-wrap fc-justify-space-b">

        <wow-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <template #body>
            <div class="fc fc-row fc-wrap fc-justify-space-b">

              <wow-card :xs="1" :sm="2" :md="2" :lg="3" :xl="3">
                <template #header><b>Новых сообющений</b></template>
                <template #body>
                  <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">

                    <el-badge :value="2" class="item">
                      <wow-icon type="mdi" :path="$mdi.mdiEmailOutline" style="width: 70px; height: 70px;"></wow-icon>
                    </el-badge>
                    
                  </div>
                </template>
              </wow-card>

              <wow-card :xs="1" :sm="2" :md="2" :lg="3" :xl="3">
                <template #header><b>Членские взносы за 2025</b></template>
                <template #body>
                  <div class="row-col-1 fc fc-col fc-justify-end">
                    <div class="fc fc-row fc-align-end ">
                      <div class="header-summa">₽ {{ headerSumma.toLocaleString() }} </div>
                      <div class="header-summa-done"> / {{ headerSummaDone.toLocaleString() }}</div>
                    </div>

                    <div>
                      <el-progress :percentage="percentage" :color="customColors" />
                    </div>
                    <!-- <el-button-group>
                      <el-button :icon="Minus" @click="decrease" />
                      <el-button :icon="Plus" @click="increase" />
                    </el-button-group> -->
                  </div>

                </template>
              </wow-card>

              <wow-card :xs="1" :sm="2" :md="2" :lg="3" :xl="3">
                <template #header><b>Садоводы должны</b></template>
                <template #body>
                  <div class="row-col-1 fc fc-col fc-align-end fc-justify-end">
                    <div class="header-summa tc-bright_red">₽ {{ headerSumma.toLocaleString() }} </div>
                    <div>
                      <span class="header-indebted t">345</span> <span>домов</span>
                    </div>
                    <div class="header-summa-done"> </div>
                  </div>
                </template>
              </wow-card>

            </div>

          </template>
        </wow-col>

        <!--         <wow-col :xs="1" :sm="1" :md="2" :lg="2" :xl="2" :style="{ width: '50%' }">
          <template #body>
            <wow-card :xs="1" :sm="2" :md="3" :lg="4" :xl="5">
              <template #header>Садовое товарищество </template>
              <template #body>Краснодаргорстрой </template>
            </wow-card>
          </template>
        </wow-col> -->

      </div>
      <!--       <div class="fc fc-row fc-wrap fc-justify-space-b">
        <wow-card v-for="(item, index) in items" :key="index" :xs="1" :sm="2" :md="3" :lg="4" :xl="5">
          <template #header>Header {{ item }}</template>
          <template #body>Body {{ item }}</template>
        </wow-card>
      </div> -->
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { Minus, Plus } from '@element-plus/icons-vue'

const percentage = ref(20)
const headerSumma = computed(() => {
  return 45463322
});
const headerSummaDone = computed(() => {
  return 87965742
});

const customColors = [
  { color: '#f56c6c', percentage: 40 },
  { color: '#e6a23c', percentage: 90 },
  { color: '#5cb87a', percentage: 100 },
]

const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}
const decrease = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}

</script>

<style scoped>
.row-col-1 {
  height: 65px;

  .fontMail {
    height: 50px;
    width: 60px;
  }
}

.header-summa {
  font-size: 1.8rem;
}

.header-indebted {
  font-size: 1.8rem;
}

.header-summa-done {
  font-size: 1rem;

}
</style>