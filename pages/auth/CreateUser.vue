<template>
  <NuxtLayout name="auth">
    <div>
      <div class="padding-5-5 font-text-transform-uppercase">
        Регистрация пользователя
      </div>

      <el-form ref="formRef" style="width: 100%" :model="registerForm" label-width="auto" class="demo-dynamic"
        :rules="rules">

        <!--         <el-form-item label="Садовое товарищество" prop="sntId">
          <el-select-v2 v-model="registerForm.sntId" placeholder="Выбор СТ" :options="options" filterable />
        </el-form-item> -->


        <div v-if="tabRegistration == 0">
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
        </div>

        <div v-else="tabRegistration != 0" class="wow-cadastr-number">
          <!--  -->
          <el-input v-model="cadastralModel.cadastr_nmber" style="width: 100%;"
            placeholder="Введите кадастровый номер" />

          <div v-if="cadastralModel.modelObject.address">
            <div class="wow-adress">
              <span class="tc-bright_red"> Адрес вашего участка:</span> <br />
              {{ cadastralModel.modelObject?.address }}
            </div>
            <div>
              <div v-if="nameST.id">
                <span class="tc-bright_red">Заявка на вступление будет отправлена в СТ:</span><br />
                {{ nameST.title }}
              </div>
              <div v-else="!!nameST.id">
                <el-form-item label="Садовое товарищество" prop="sntId">
                  <el-select-v2 v-model="registerForm.sntId" placeholder="Выбор СТ" :options="options" filterable />
                </el-form-item>
              </div>
            </div>
          </div>

        </div>

        <div class="register-btn wow-w-100 fc fc-justify-center fc-wrap">
          <!-- <el-button @click="resetForm(formRef)">Сбросить форму</el-button> -->
          <el-button v-if="tabRegistration != 0" type="primary" @click="submitBackForm">Назад</el-button>
          <el-button v-else="tabRegistration == 0" type="primary" @click="submitNextForm(formRef)">Далее</el-button>

          <el-button v-if="tabRegistration != 0" type="primary" @click="searchCadastrNumber()">
            Проверить номер
          </el-button><!-- sendRegistration() -->
          <el-button v-if="!!cadastralModel.modelObject.sntId || !!registerForm.sntId" type="primary"
            @click="dialogCaptcha = true">Зарегистрироваться</el-button>
        </div>

        <el-dialog v-model="dialogCaptcha" title="Проверка" width="500" align-center>
          <p>Введите цифры ниже: <b>{{ captcha }}</b></p>
          <el-input v-model="captchaInput" placeholder="Введите цифры"></el-input>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogCaptcha = false"> Отмена </el-button>
              <el-button type="primary" @click="checkCaptcha"> Принять </el-button>
            </div>
          </template>
        </el-dialog>

      </el-form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from "element-plus";



interface RegisterForm {
  sntId: string,
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
  sntId: '',
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
    { required: false, message: 'Выберите СТ', trigger: 'change', },
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

let tabRegistration = ref(0);
const submitBackForm = () => { tabRegistration.value = 0 };
const submitNextForm = async (formEl: FormInstance | undefined) => {



  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const checkEmail = await $fetch<Boolean>(`${useRuntimeConfig().public.baseURL}/person/email-exists/${registerForm.email}`);
      if (checkEmail) {
        ElMessage.error('Такой емейл уже существует');
      } else {
        ElMessage.info('нормас');
        tabRegistration.value = 1;

        /* try {
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
              } */
      }

    } else {
      console.error('error submit!', fields)
    }
  })
};

let btnRegisterView = ref(false);
interface cadastrInterface {
  "cadastralNum": string,
  "square": number,
  "address": string,
  "sntId": number
};
interface sntInterface {
  address: string,
  id: number,
  inn: string,
  ogrn: string,
  oktmoCode: string,
  regDate: string,
  title: string,
}

let cadastralModel = reactive(
  {
    cadastr_nmber: '',
    modelObject: {} as cadastrInterface
  });

let nameST = ref({} as sntInterface);

const searchCadastrNumber = async () => {
  try {
    cadastralModel.modelObject = await $fetch<cadastrInterface>(`${useRuntimeConfig().public.baseURL}/cadastral/${cadastralModel.cadastr_nmber}`, {
      method: 'GET'
    });

    if (cadastralModel.modelObject.sntId) {
      nameST.value = await $fetch<sntInterface>(`${useRuntimeConfig().public.baseURL}/snt/${cadastralModel.modelObject.sntId}`);
    } else {
      registerForm.sntId = '';
      nameST.value = {
        address: '',
        id: 0,
        inn: '',
        ogrn: '',
        oktmoCode: '',
        regDate: '',
        title: ''
      };
      console.log('sss', registerForm.sntId, nameST);
    }

    console.log(cadastralModel, nameST.value);
  } catch (error: any) {

    console.error("Ошибка:", error);
    if (error.response.status > 400 && error.response.status < 500) {
      ElMessage.error('Скорее всего, что Вы ошиблись, попробуйте ввести кадастровый номер еще раз');
      registerForm.sntId = '';
      cadastralModel.modelObject = {
        cadastralNum: '',
        square: 0,
        address: '',
        sntId: 0
      }
    }

    if (error.response.status > 500 && error.response.status < 600) {
      ElMessage.info('Не удалось получить информацию из Росреестра, выберите Садовое товарищество!');
      registerForm.sntId = '';
      nameST.value = {
        address: '',
        id: 0,
        inn: '',
        ogrn: '',
        oktmoCode: '',
        regDate: '',
        title: ''
      };
    }

  }
};

/* Captcha */
const dialogCaptcha = ref(false);

const generateCaptcha = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

let captchaInput = ref('');
const captcha = ref(generateCaptcha());

const checkCaptcha = () => {
  if (captchaInput.value === captcha.value) {
    sendRegistration(); // Вызов функции регистрации
    dialogCaptcha.value = false; 
  } else {
    ElMessage.error('Неверная капча, попробуйте снова.');
    captcha.value = generateCaptcha(); // Генерация новой капчи
  }
};

const sendRegistration = () => {
  console.log(cadastralModel);
}

//TODO ДОБАВИТЬ проверку на поиск по кадастровому номеру, если нет кадастра или снт нет в поиске снт то выдать выпадающий список с СНТ



const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.wow-cadastr-number {
  padding: 10px 0;

  .wow-adress {
    padding: 20px 0;

  }
}

.el-p {
  padding: 10px 0px;
}

.btn-goup {
  padding: 25px 0px;
}

.register-btn {
  padding: 15px 0;
  row-gap: 30px;
}
</style>