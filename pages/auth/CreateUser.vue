<template>
  <NuxtLayout name="auth">
    <div>
      <div class="padding-5-5 font-text-transform-uppercase">
        Регистрация пользователя
      </div>

      <el-form ref="formRef" style="max-width: 600px" :model="registerForm" label-width="auto" class="demo-dynamic"
        :rules="rules">

        <el-form-item label="Садовое товарищество" prop="sntId">
          <el-select-v2 v-model="registerForm.sntId" placeholder="Выбор СТ" :options="options" filterable />
        </el-form-item>

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
          <el-input v-model="registerForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Повтор пароля" prop="passwordConfirm_">
          <el-input v-model="registerForm.passwordConfirm" type="password" autocomplete="off" />
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
import { reactive, ref, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

interface RegisterForm {
  sntId: string[],
  lastName: string,
  firstName: string,
  patronymic: string,
  phoneNums: string,
  email: string,
  username: string,
  password: string,
  passwordConfirm: string,
}

const formRef = ref<FormInstance>()
const registerForm = reactive<RegisterForm>({
  sntId: [],
  lastName: '',
  firstName: '',
  patronymic: '',
  phoneNums: '',
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
})

const options = ref<Array<{ value: string, label: string }>>([]);

interface SNTResponse {
  id: string;
  title: string;
}

onMounted(async () => {
  const response = await $fetch<SNTResponse[]>(`${useRuntimeConfig().public.baseURL}/snt`);
  options.value = response.map(item => ({
    value: item.id,
    label: item.title
  }));
});

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
    callback(new Error("Пароль и повтор не совпадают!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof registerForm>>({
  sntId: [
    { required: true, message: 'Выберите СТ', trigger: 'change', },
  ],
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
  password: [{ validator: validatePass, trigger: 'blur' }],
  passwordConfirm: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {

      console.log('submit!', registerForm)
      try {
        const response = await fetch(`${useRuntimeConfig().public.baseURL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerForm),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        // Сохраните токен в sessionStorage
        sessionStorage.setItem("authToken", data.token);
        //const token = sessionStorage.getItem("authToken");
        ElMessage.success("Вы успешно Зарегистрировались");
        ElMessage.success("Заявка на вступление в СТ отправлена");
      } catch (error: any) {
        console.error("Error in signIn:", error);
        ElMessage.error(error.message);
      }
    } else {
      console.error('error submit!', fields)
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

.register-btn {
  padding: 15px 0;
}
</style>