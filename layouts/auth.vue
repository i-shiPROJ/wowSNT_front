<template>
  <div class=" auth-layout wow-dark tc-dark_gray_0_soft tc-dark-gray-4">
    <el-row class="auth-panel" :gutter="10">

      <el-col :xs="24" :sm="12">
        <div class="auth-panel ">
          <div class="bodyLogo fc fc-align-center fc-justify-center">
            wow-SNT
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12">
        <div class="forms fc fc-col fc-justify-center">
          <div class="bodyForm ">
            <slot />
          </div>
          <div class="footer ">
            <div class="padding-5-5 fc fc-justify-center">
              <el-button link @click="toPageSignIn"> вход </el-button>
              <el-button link @click="toPageRegister"> регистрация </el-button>
            </div>
          </div>
        </div>
      </el-col>

    </el-row>

  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toPageSignIn = () => router.push('/auth/signIn');
const toPageRegister = () => {
  navigateTo('/auth/registerQuestion');
  //router.push('/auth/registerQuestion');
  //const data = getDataTest();
  // console.log(data);
};
const toPageRegisterSt = () => router.push('/auth/registerSt');

const getDataTest = async (url = 'http://185.42.14.187:8080/person', data = {}) => {
  try {
    const response = await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX08iLCJST0xFX1AiXSwic3ViIjoiamFzb24iLCJpYXQiOjE3MzcyODQxMTYsImV4cCI6MTczNzI4NTkxNn0.keqOiywYvkrhlKKiBsrFupMKi5nn_KX5l9f2CeEQiO0`
      }
    });

    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Assuming response is JSON
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;

  } catch (error) {
    console.error('Error in getDataTest:', error);
  }
  // Optionally redirect or handle errors differently
  // router.push('/auth/registerQuestion');
};


</script>

<style lang="less" scoped>
.auth-layout {
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
  /*     @media (max-width: 768px) {
    overflow-y: scroll;
  } */

  .auth-panel {
    height: 100%;
    width: 100%;

    .bodyLogo {
      font-size: 2rem;
      height: 100%;
      width: 100%;
    }

    .forms {
      height: 100%;
      width: 100%;
    }

    .bodyForm {
      /* max-width: 550px; */
      border-width: 0 0 0 1px;
      border-style: solid;
      border-image: linear-gradient(to bottom, #303030, #767676, #303030) 1;
      padding: 0px 40px;

      @media (min-width: 1200px) {
        max-width: 550px;
      }

      @media (max-width: 450px) {
        padding: 0px 10px;
      }
    }

    .footer {
      width: 100%;

      >div {
        padding: 0px 40px;

        @media (min-width: 1200px) {
          max-width: 550px;

        }
      }


      .el-button.is-link {
        color: #66999d;
      }

      .el-button.is-link:hover {
        color: #5fafaf;
      }
    }
  }



}
</style>