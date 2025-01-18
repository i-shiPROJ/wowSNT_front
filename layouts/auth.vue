<template>
  <div class="wow-dark auth-layout fc fc-justify-center tc-dark_gray_0_soft tc-dark-gray-4">
    <div class="auth-panel fc fc-row fc-wrap fc-justify-space-b">
      <wow-col :xs="1" :sm="1" :md="2" :lg="2" :xl="2" :style="{ width: '50%' }">
        <template #body>
          <div class="bodyLogo fc fc-align-center fc-justify-center">
            wow-SNT
          </div>
        </template>
      </wow-col>
      <wow-col :xs="1" :sm="1" :md="2" :lg="2" :xl="2" :style="{ width: '50%' }">
        <template #body>
          <div class="forms fc fc-col fc-justify-center">
            <div class="bodyForm fc fc-align-center fc-justify-center">
              <slot />
            </div>
            <div class="footer fc fc-col fc-justify-center ">
              <div class="padding-5-5 fc fc-justify-center">
                <el-button link @click="toPageSignIn"> вход </el-button>
                <el-button link @click="toPageRegister"> регистрация </el-button>
              </div>
            </div>
          </div>

        </template>
      </wow-col>
    </div>

    <!--     <div class="logo">logo</div>
    <div class="body">controll</div> -->
  </div>

  <!--  <el-row class=" auth-layout bg-dark-brown-0" justify="center" align="middle">
    <el-col class="wow-card-col-auth tc-brown-0" :xs="22" :sm="7" :md="6" :lg="5" :xl="4">
      <div class="wow-header-auth ">
        <slot name="header" />
      </div>
      <div class="wow-body-auth">
        <slot />
      </div>
      <div class="wow-footer-auth">
        footer
      </div>
    </el-col>
  </el-row> -->

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toPageSignIn = () => router.push('/auth/signIn');
const toPageRegister = () => {
  router.push('/auth/registerQuestion');
  // const data = getDataTest();
  // console.log(data);
};
const toPageRegisterSt = () => router.push('/auth/registerSt');

const getDataTest = async (url = 'http://185.42.14.187:8080/snt', data = {}) => {
  try {
    const response = await $fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.json();

  } catch (error) {
    console.error('error getDataTest', error);
  }
  //router.push('/auth/registerQuestion');

};


</script>

<style lang="less" scoped>
.auth-layout {
  width: 100%;
  height: 100%;
  overflow: auto;

  @media (max-width: 768px) {
    overflow-y: scroll;
    /* Включите вертикальную прокрутку для мобильных устройств */
  }

  .auth-panel {
    width: 1000px;
    ;
    /* border: 1px solid #fff; */
    padding: 5px;

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
      min-height: 300px;
      border-width: 0 0 0 1px;
      border-style: solid;
      border-image: linear-gradient(to bottom, #303030, #767676, #303030) 1;
      padding: 5px;
    }

    .footer {
      width: 100%;

      .el-button.is-link {
        color: #66999d;
      }

      .el-button.is-link:hover {
        color: #5fafaf;
      }
    }
  }


  /*   .wow-card-col-auth {
    height: 400px;
    border-radius: 15px;

    border: 1px solid;
    border-color: #3d3d3e;

    background: 
    linear-gradient(rgba(29, 32, 33, 0.7), rgba(124, 111, 100, 0.7)),
    url('/public/pick/park_krd_800.jpg');
  background-size: cover;

    background-position: center center;
    
    
    box-shadow: 0px 0px 20px 2px #00000075;

    .wow-header-auth {
      border-radius: 15px 15px 0px 0px;
      margin: 35px 10px 0px 51px;
      font-size: 2rem;
    }

    .wow-body-auth {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }

    .wow-footer-auth {
      padding: 10px;
      border-radius: 0px 0px 15px 15px;
      height: 30px;
    }
  }





  .second {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slot {} */
}
</style>