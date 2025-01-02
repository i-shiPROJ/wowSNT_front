<template>
  <NuxtLayout name="auth">
    <div class="fc fc-col">
      <div class="padding-5-5 font-text-transform-uppercase">
        Выберите регистрацию
      </div>

      <div class="fc fc-row fc-al fc-justify-space-b">
        <el-tooltip class="box-item" effect="dark" :content="gettextCreateUser" placement="bottom">
          <div class="bigBTN tc-dark_gray_0_sof fc fc-col fc-justify-center fc-align-center" @click="routeCreateUser">
            <div>
              <wow-icon type="mdi" :path="$mdi.mdiAccount" />
            </div>
            <div class="textBtn">
              Создать пользователя и вступить в СТ
            </div>
          </div>
        </el-tooltip>

        <el-tooltip class="box-item" effect="dark" :content="gettextCreateUserST" placement="bottom">
          <div class="bigBTN tc-dark_gray_0_sof fc fc-col fc-justify-center fc-align-center" @click="routeCreateUserST">
            <div>
              <wow-icon type="mdi" :path="$mdi.mdiAccount" />
              <wow-icon type="mdi" :path="$mdi.mdiHome" />
            </div>
            <div class="textBtn">
              Создать пользователя и новое СТ
            </div>
          </div>
        </el-tooltip>

      </div>

    </div>


  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const gettextCreateUser = computed(() => { return 'Подходит для жильцов садового товарищества' });
const gettextCreateUserST = computed(() => { return 'Подходит для председателя садового товарищества' });

const routeCreateUser = () => router.push('/auth/CreateUser');
const routeCreateUserST = () => router.push('/auth/CreateUserST');

</script>

<style lang="less" scoped>
.bigBTN {
  width: 40%;
  height: 190px;
  border: 1px solid #767676;
  border-radius: 15px;
  margin: 5px;
  padding: 5px;
  transition: box-shadow 0.3s ease, color 0.3s ease;

  .textBtn {
    text-align: center;
  }
}

.bigBTN:hover {
  box-shadow: 0 0 5px 0px #767676;
  cursor: pointer;
  color: #F9F9F9;
}
</style>