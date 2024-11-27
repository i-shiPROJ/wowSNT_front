<template>

  <el-row class=" auth-layout bg-dark-brown-0" justify="center" align="middle">
    <el-col class="wow-card-auth tc-brown-0" :xs="22" :sm="7" :md="6" :lg="5" :xl="4">
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
  </el-row>

</template>

<script setup>

</script>

<style lang="less" scoped>
.auth-layout {
  width: 100%;
  height: 100%;
  box-shadow: inset 0px 0px 20px 0px #00000075;

  .wow-card-auth {
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
      /* height: 60px; */
    }

    .wow-body-auth {
      display: flex;
      justify-content: center;
      align-items: center;
      /* height: calc(400px - 140px); */
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

  .slot {}
}
</style>