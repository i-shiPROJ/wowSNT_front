<template>
  <div>
    <el-popover title="Ваш профиль" :width="350" trigger="hover">

      <div>

        <div class="infoUser fc fc-row">
          <div>
            <wow-icon type="mdi" :path="$mdi.mdiHomeAccount" style="width: 60px; height: 60px;" />
          </div>
          <div>
            <span class="role">Председатель</span>
            <div class="">
              <b>Григорьев Владислав Алексанедрович</b>
            </div>
            <div class="">+79615069069</div>
          </div>

        </div>

        <div class="controls">
          <div>
            <el-button class="btnMavi" text>В режим садовода</el-button>
          </div>
          <div>
            <el-button class="btnMavi" text>Настройки аккаунта</el-button>
          </div>

          <div class="out">
            <el-button class="btnMavi" type="danger" text>Выход</el-button>
          </div>
        </div>

      </div>

      <template #reference>
        <div class="userSymbols bg-red-1 f-w-900">ГВ</div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">



</script>

<style scoped>
.infoUser {
  border-bottom: 1px solid rgb(218, 218, 218);
  /* //text-align: end; */
  margin-bottom: 10px;

  .role {
    background-color: #F56C6C;
    border-radius: 5px;
    padding: 2px 8px;
    color: white;
  }
}

.infoUser>div {
  margin-bottom: 5px;
}

.btnMavi {
  width: 100%;
}

.controls {
  .out {
    margin-top: 30px;
  }

}

.controls>div {
  margin-bottom: 10px;
}

.userSymbols {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  cursor: default;
}
</style>