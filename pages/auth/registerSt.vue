<template>
  <NuxtLayout name="auth">
    <div>
      
      <div>
        <div class="padding-5-5 font-text-transform-uppercase">
          Регистрация ст
        </div>

        <div class="el-p">
          <el-input v-model="login" style="width: 240px" placeholder="Логин">
            <template #prefix>
              <el-icon>
                <wow-icon type="mdi" :path="$mdi.mdiAccount" />
              </el-icon>
            </template>
          </el-input>
        </div>

        <div class="el-p">
          <el-input v-model="password" style="width: 240px" type="password" placeholder="Пароль" show-password>
            <template #prefix>
              <wow-icon type="mdi" :path="$mdi.mdiKey" />
            </template>
          </el-input>
        </div>

      </div>

      <div class="btn-goup">
        <el-button type="primary" style="width: 100%" round>
          <el-icon style="vertical-align: middle">
            <wow-icon type="mdi" :path="$mdi.mdiAccount"></wow-icon>
          </el-icon>
          <span style="vertical-align: middle"> Вход </span>
        </el-button>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { $mdi } = useNuxtApp();

const login = ref('');
const password = ref('');


</script>

<style lang="less" scoped>
.el-p {
  padding: 10px 0px;
}

.btn-goup {
  padding: 25px 0px;
}
</style>