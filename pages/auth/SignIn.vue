<template>
  <NuxtLayout name="auth">
    <div>
      <div>
        <div class="padding-5-5 font-text-transform-uppercase">Вход</div>

        <div class="el-p fc fc-justify-center">
          <el-input v-model="login" style="width: 240px" placeholder="Логин">
            <template #prefix>
              <el-icon>
                <wow-icon type="mdi" :path="$mdi.mdiAccount" />
              </el-icon>
            </template>
          </el-input>
        </div>

        <div class="el-p fc fc-justify-center">
          <el-input v-model="password" style="width: 240px" type="password" placeholder="Пароль" show-password>
            <template #prefix>
              <wow-icon type="mdi" :path="$mdi.mdiKey" />
            </template>
          </el-input>
        </div>
      </div>

      <div class="btn-goup fc fc-justify-center">
        <el-button type="primary" style="width: 50%" round @click="signIn">
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
import { ref } from "vue";
import { ElMessage } from "element-plus";

const { $mdi } = useNuxtApp();

const login = ref("");
const password = ref("");

const toPageUser = () => navigateTo(`/user`);

const signIn = async () => {
  try {
    const response = await fetch(`${useRuntimeConfig().public.baseURL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: login.value, password: password.value }),
    });

    if (response.status === 401) {
      ElMessage.error("Введены неправильные логин или пароль");
      return;
    }

    if (!response.ok) {
      throw new Error("Ошибка сети");
    }

    const data = await response.json();
    // Сохраните токен в sessionStorage
    sessionStorage.setItem("authToken", data.token);
    ElMessage.success("Вы успешно авторизовались");
    toPageUser();
    //router.push('/user');
  } catch (error) {
    console.error("Error in signIn:", error);
    ElMessage.error("Ошибка авторизации");
  }
};
</script>

<style lang="less" scoped>
.el-p {
  padding: 10px 0px;
}

.btn-goup {
  padding: 25px 0px;
}
</style>
