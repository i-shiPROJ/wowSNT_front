<template>
  <NuxtLayout name="auth">
    <div class="createUserST">
      <div class="padding-5-5 font-text-transform-uppercase">
        Регистрация пользователя и ст
      </div>

      <div v-if="stateCreateForm">

        <el-form ref="formRef" style="max-width: 600px" :model="registerForm" label-width="auto" class="formCreateUser"
          :rules="rulesstRegister">

          <el-form-item label="Фамилия" prop="lastName">
            <el-input v-model="registerForm.lastName" />
          </el-form-item>

          <el-form-item label="Имя" prop="firstName">
            <el-input v-model="registerForm.firstName" />
          </el-form-item>

          <el-form-item label="Отчество" prop="patronymic">
            <el-input v-model="registerForm.patronymic" />
          </el-form-item>

          <el-form-item label="Телефон" prop="phoneNums">
            <el-input v-model="registerForm.phoneNums" v-mask="'+7 (###) ### ## ##'" placeholder="+7 (999) 999 99 99" />
          </el-form-item>
          <el-form-item prop="email" label="email">
            <el-input v-model="registerForm.email" />
          </el-form-item>

          <el-form-item label="Логин" prop="username">
            <el-input v-model="registerForm.username" />
          </el-form-item>

          <el-form-item label="Пароль" prop="password">
            <el-input v-model="registerForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Повтор пароля" prop="passwordConfirm">
            <el-input v-model="registerForm.passwordConfirm" type="password" autocomplete="off" />
          </el-form-item>

          <div class="register-btn wow-w-100 fc fc-justify-center">
            <!-- <el-button @click="resetForm(formRef)">Сбросить форму</el-button> -->
            <el-button type="primary" @click="submitCreateUser(formRef)">Далее</el-button>
          </div>
        </el-form>

      </div>

      <div v-else>
        <div class="header-st">Данные СТ</div>
        <el-form ref="stRegisterRef" style="max-width: 600px" :model="stRegisterForm" label-width="auto"
          class="formCreateUser" :rules="rulesSTRegister">

          <el-form-item label="ИНН" prop="inn">
            <el-input v-model="stRegisterForm.inn" maxlength="10" v-mask="'##########'" />
          </el-form-item>

          <el-form-item label="ОГРН" prop="ogrn">
            <el-input v-model="stRegisterForm.ogrn" maxlength="13" v-mask="'#############'" />
          </el-form-item>

          <el-form-item label="Дата регистрации" prop="regDate">
            <el-date-picker v-model="stRegisterForm.regDate" type="date" aria-label="Pick a date"
              placeholder="Выберите дату" />
          </el-form-item>

          <el-form-item label="Название" prop="title">
            <el-input v-model="stRegisterForm.title" />
          </el-form-item>

          <el-form-item label="ОКТМО" prop="oktmoCode">
            <el-input v-model="stRegisterForm.oktmoCode" minlength="8" maxlength="11" v-mask="'###########'" />
          </el-form-item>

          <el-form-item label="Адрес" prop="address">
            <el-input v-model="stRegisterForm.address" />
          </el-form-item>



          <div class="register-btn wow-w-100 fc fc-justify-center">
            <el-button type="primary" @click="submitCreateST(stRegisterRef)">Далее</el-button>
          </div>
        </el-form>
      </div>


    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const radioUser = ref('createUser');

let stateCreateForm = ref(true);

interface RegisterForm {
  lastName: string,
  firstName: string,
  patronymic: string,
  phoneNums: string,
  email: string,
  username: string,
  password: string,
  passwordConfirm: string,
}

interface STRegisterForm {
  inn: number | null,
  ogrn: number | null,
  regDate: string,
  title: string,
  oktmoCode: number | null,
  address: string
}

const formRef = ref<FormInstance>()
const formAuthRef = ref<FormInstance>()
const stRegisterRef = ref<FormInstance>()

const registerForm = reactive<RegisterForm>({
  lastName: '',
  firstName: '',
  patronymic: '',
  phoneNums: '',
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
})

const stRegisterForm = reactive<STRegisterForm>({
  inn: null,
  ogrn: null,
  regDate: '',
  title: '',
  oktmoCode: null,
  address: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Введите пароль'))
  } else {
    if (registerForm.passwordConfirm !== '') {
      if (!formRef.value) return
      formRef.value.validateField('passwordConfirm')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Введите повтор пароля'))
  } else if (value !== registerForm.password) {
    console.log(value, registerForm.password);
    callback(new Error("Пароль и повтор не совпадают!"))
  } else {
    callback()
  }
}

const rulesstRegister = reactive<FormRules<typeof registerForm>>({
  lastName: [
    { required: true, message: 'Введите Фамилию', trigger: 'blur' },
    { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' },
  ],
  firstName: [
    { required: true, message: 'Введите Имя', trigger: 'blur' },
    { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' },
  ],
  patronymic: [
    { required: true, message: 'Введите Отчество', trigger: 'blur' },
    { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' },
  ],
  phoneNums: [
    { required: true, message: 'Введите номер телефона', trigger: 'blur' },
    { pattern: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/, message: 'Неверный номер', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Введите e-mail вдрес', trigger: 'blur', },
    { type: 'email', message: 'email некорректен', trigger: 'blur', },
  ],
  username: [
    { required: true, message: 'Введите Логин', trigger: 'blur' },
    { min: 3, max: 50, message: 'Длина поля от 3 - 50', trigger: 'blur' },
  ],
  password: [{ validator: validatePass, trigger: 'blur' }],
  passwordConfirm: [{ validator: validatePass2, trigger: 'blur' }],
})

const rulesSTRegister = reactive<FormRules<typeof stRegisterForm>>({
  inn: [
    { required: true, message: 'Введите ИНН', trigger: 'blur' },
    { min: 10, max: 10, message: 'Длина 10 цифр', trigger: 'blur' },
  ],
  ogrn: [
    { required: true, message: 'Введите ОГРН', trigger: 'blur' },
    { min: 13, max: 13, message: 'Длина 13 цифр', trigger: 'blur' },
  ],
  regDate: [
    { type: 'date', required: true, message: 'Выберите дату регистрации', trigger: 'change' },
  ],
  title: [
    { required: true, message: 'Введите названиею', trigger: 'blur' },
    { min: 3, max: 50, message: 'Длина поля от 3 - 50', trigger: 'blur' },
  ],
  oktmoCode: [
    { required: true, message: 'Введите ОКТМО', trigger: 'blur' },
    { min: 8, max: 11, message: 'Длина поля от 8 - 11 цифр', trigger: 'blur' },
  ],
  address: [
    { required: true, message: 'Введите адрес', trigger: 'blur' },
    { min: 3, max: 50, message: 'Длина поля от 3 - 50', trigger: 'blur' },
  ],
})


const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

/* btn submit form */
const submitCreateUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit! submitCreateUser')
      stateCreateForm.value = !stateCreateForm.value;
    } else {
      console.log('error submit!', fields)
    }
  })
}

const submitCreateST = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit! submitCreateST')
      console.log('stRegisterForm', stRegisterForm);
      stateCreateForm.value = !stateCreateForm.value;
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="less" scoped>
.createUserST {
  min-width: 310px;
  min-height: 550px;
}

.register-btn {
  padding: 15px 0;
}

.header-st {
  padding: 10px 0px;
  color: #dd6f48;
}
</style>