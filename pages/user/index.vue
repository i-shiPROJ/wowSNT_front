<template>
  <NuxtLayout name="user">
    <template #main>
      <div class="fc fc-row fc-wrap fc-justify-space-b">

        <wow-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <template #body>
            <div class="fc fc-row fc-wrap fc-justify-space-b">

              <wow-card class="cur-pointer" :xs="1" :sm="2" :md="2" :lg="4" :xl="4" @click="switchMode()">
                <template #header><b>Переключение режима</b></template>
                <template #body>
                  <div class="row-col-1 fc fc-col fc-align-center fc-justify-end">

                    <wow-icon type="mdi" :path="$mdi.mdiHomeSwitchOutline"
                      style="width: 70px; height: 70px;"></wow-icon>
                    <span>Режим садовода</span>
                  </div>
                </template>
              </wow-card>



            </div>

          </template>
        </wow-col>

      </div>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const switchMode = () => router.push('/admin');

</script>

<style scoped></style>