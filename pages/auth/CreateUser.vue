<template>
  <NuxtLayout name="auth">
    <div>
      <div class="padding-5-5 font-text-transform-uppercase">
        Регистрация пользователя
      </div>

      <el-form ref="formRef" style="max-width: 600px" :model="registerForm" label-width="auto" class="demo-dynamic"
        :rules="rules">

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

        <el-form-item label="Пароль" prop="password_">
          <el-input v-model="registerForm.password_" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Повтор пароля" prop="passwordConfirm_">
          <el-input v-model="registerForm.passwordConfirm_" type="password" autocomplete="off" />
        </el-form-item>

        <div class="register-btn wow-w-100 fc fc-justify-center">
          <!-- <el-button @click="resetForm(formRef)">Сбросить форму</el-button> -->
          <el-button type="primary" @click="submitForm(formRef)">Зарегистрироваться</el-button>
        </div>
<!--         <el-form-item class="fc fc-justify-space-b">

        </el-form-item> -->
      </el-form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';


interface RegisterForm {
  lastName: string,
  firstName: string,
  patronymic: string,
  phoneNums: string,
  email: string,
  username: string,
  password_: string,
  passwordConfirm_: string,
}

const formRef = ref<FormInstance>()
const registerForm = reactive<RegisterForm>({
  lastName: '',
  firstName: '',
  patronymic: '',
  phoneNums: '',
  email: '',
  username: '',
  password_: '',
  passwordConfirm_: '',
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Введите пароль'))
  } else {
    if (registerForm.passwordConfirm_ !== '') {
      if (!formRef.value) return
      formRef.value.validateField('passwordConfirm')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Введите повтор пароля'))
  } else if (value !== registerForm.password_) {
    console.log(value, registerForm.password_);
    callback(new Error("Пароль и повтор не совпадают!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof registerForm>>({
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
    { type: 'email', message: 'Please input correct email address', trigger: 'blur', },
  ],
  username: [
    { required: true, message: 'Введите Логин', trigger: 'blur' },
    { min: 3, max: 50, message: 'Длина поля от 3 - 50', trigger: 'blur' },
  ],
  password_: [{ validator: validatePass, trigger: 'blur' }],
  passwordConfirm_: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.el-p {
  padding: 10px 0px;
}

.btn-goup {
  padding: 25px 0px;
}

.register-btn{
  padding: 15px 0;
}
</style>