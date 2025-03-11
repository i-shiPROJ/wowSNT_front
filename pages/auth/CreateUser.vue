<template>
  <NuxtLayout name="auth">
    <div>
      <div class="padding-20-5 font-text-transform-uppercase">
        Регистрация пользователя
      </div>

      <el-form v-if="!registerComplate" ref="formRef" style="width: 100%" :model="registerForm" label-width="auto"
        class="demo-dynamic" :rules="rules">

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

          <el-form-item label="Телефон" prop="phoneNum">
            <el-input v-model="registerForm.phoneNum" v-mask="'+7 (###) ### ## ##'" placeholder="+7 (999) 999 99 99" />
          </el-form-item>
          <el-form-item prop="email" label="email">
            <el-input v-model="registerForm.email" />
          </el-form-item>

          <el-form-item prop="areaOwnershipDescr.startDate" label="Дата начала владения">
            <el-date-picker v-model="registerForm.startDate" type="date" aria-label="Pick a date"
              placeholder="Выберите дату" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
          </el-form-item>
          <el-form-item prop="square" label="Площадь участка">
            <el-input-number v-model="registerForm.square" :min="0" :step="0.5" :max="9999" />
          </el-form-item>
          <el-form-item prop="residentsNum" label="Количество проживающих">
            <el-input-number v-model="registerForm.residentsNum" :min="0" :step="1" :max="999" />
          </el-form-item>
          <el-form-item prop="part" label="Доля">
            <el-input-number v-model="registerForm.part" :min="0.1" :step="0.01" :max="1" />
          </el-form-item>

          <!-- <el-form-item label="Логин" prop="username">
            <el-input v-model="registerForm.username" />
          </el-form-item> -->

          <!-- <el-form-item label="Пароль" prop="password">
            <el-input v-model="registerForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Повтор пароля" prop="passwordConfirm">
            <el-input v-model="registerForm.passwordConfirm" type="password" autocomplete="off" />
          </el-form-item> -->
        </div>

        <div v-else="tabRegistration != 0" class="wow-cadastr-number">
          <!--  -->
          <el-input v-model="cadastralModel.cadastr_nmber" style="width: 100%;"
            placeholder="Введите кадастровый номер" />

          <div v-if="cadastralModel.modelObject.address">
            <div class="wow-adress">
              <span class="tc-bright_red f-w-900"> Адрес вашего участка:</span> <br />
              <span class="medium_brown_2"> {{ cadastralModel.modelObject?.address }} </span>
            </div>
            <div>
              <div v-if="nameST.id">
                <span class="tc-bright_red f-w-900">Заявка на вступление будет отправлена в СТ:</span><br />
                <span class="medium_brown_2">{{ nameST.title }}</span>

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
          </el-button>
          <el-button v-if="(!!cadastralModel.modelObject.sntId || !!registerForm.sntId) && tabRegistration != 0"
            type="primary" @click="sendRegistration">Зарегистрироваться</el-button>
        </div>

      </el-form>
      <div v-else="registerComplate">
        <div>
          - Заявка на вступление в СТ отправлена<br />
          - Пароль будет выслан Вам на электронную почту после вступления в СТ<br />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from "element-plus";
import type { cadastrInterface } from '~/interface/Cadastr.interface';
import moment from 'moment';


const registerComplate = ref(false);
// TODO добавить startDate
interface RegisterForm {
  cadastralNum: string,
  sntId: string,
  lastName: string,
  firstName: string,
  patronymic: string,
  phoneNum: string,
  email: string,
  square: number | 0,
  residentsNum: number | 0,
  part: number | 0,
  startDate: string
  // username: string,
  // password: string,
  // passwordConfirm: string,
}

const formRef = ref<FormInstance>()
const registerForm = reactive<RegisterForm>({
  cadastralNum: '',
  sntId: '',
  lastName: '',
  firstName: '',
  patronymic: '',
  phoneNum: '',
  email: '',
  square: 0,
  residentsNum: 0,
  part: 1,
  startDate: moment().format('YYYY-MM-DD')
  // username: '',
  // password: '',
  // passwordConfirm: '',
})

const options = ref<Array<{ value: string, label: string }>>([]);

interface SNTResponse {
  id: string;
  title: string;
}

onMounted(async () => {
  console.log(moment().format('YYYY-MM-DD'));
  const response = await $fetch<SNTResponse[]>(`/snt`, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
  });
  options.value = response.map(item => ({
    value: item.id,
    label: item.title
  }));
});

// const validatePass = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('Введите пароль'))
//   } else {
//     if (registerForm.passwordConfirm !== '') {
//       if (!formRef.value) return
//       formRef.value.validateField('passwordConfirm')
//     }
//     callback()
//   }
// }

// const validatePass2 = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('Введите повтор пароля'))
//   } else if (value !== registerForm.password) {
//     callback(new Error("Пароль и повтор не совпадают!"))
//   } else {
//     callback()
//   }
// }

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
  phoneNum: [
    { required: true, message: 'Введите номер телефона', trigger: 'blur' },
    { pattern: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/, message: 'Неверный номер', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Введите e-mail вдрес', trigger: 'blur', },
    { type: 'email', message: 'Please input correct email address', trigger: 'blur', },
  ],
  square: [
    { required: true, message: 'Введите площадь участка', trigger: 'blur' },
    { type: 'number', min: 0, max: 999, message: 'Длина поля от 0 - 999', trigger: 'blur' },
  ],
  residentsNum: [
    { required: true, message: 'Введите кол-во проживающих', trigger: 'blur' },
    { type: 'number', min: 0, max: 99, message: 'Длина поля от 0 - 99', trigger: 'blur' },
  ],
  part: [
    { required: true, message: 'Введите долю', trigger: 'blur' },
    { type: 'number', min: 0.01, max: 50, message: 'Длина поля от 0.01 - 1', trigger: 'blur' },
  ],
  startDate: [
    { required: true, type: 'date', message: 'Введите дату начала владения', trigger: 'change' },
  ],
  // username: [
  //   { required: true, message: 'Введите Логин', trigger: 'blur' },
  //   { min: 3, max: 50, message: 'Длина поля от 3 - 50', trigger: 'blur' },
  // ],
  // password: [{ validator: validatePass, trigger: 'blur' }],
  // passwordConfirm: [{ validator: validatePass2, trigger: 'blur' }],
})

let tabRegistration = ref(0);
const submitBackForm = () => { tabRegistration.value = 0 };
const submitNextForm = async (formEl: FormInstance | undefined) => {



  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const checkEmail = await $fetch<Boolean>(`/person/email-exists/${registerForm.email}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'GET'
      });
      if (checkEmail) {
        ElMessage.error('Такой емейл уже существует');
      } else {
        ElMessage.info('нормас');
        tabRegistration.value = 1;

      }

    } else {
      console.error('error submit!', fields)
    }
  })
};

let btnRegisterView = ref(false);
interface sntInterface {
  address: string,
  id: string,
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
    cadastralModel.modelObject = await $fetch<cadastrInterface>(`/cadastral/${cadastralModel.cadastr_nmber}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });

    if (cadastralModel.modelObject.sntId) {
      nameST.value = await $fetch<sntInterface>(`/snt/${cadastralModel.modelObject.sntId}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'GET'
      });
      registerForm.sntId = nameST.value.id;
    } else {
      registerForm.sntId = '';
      nameST.value = {
        address: '',
        id: '',
        inn: '',
        ogrn: '',
        oktmoCode: '',
        regDate: '',
        title: ''
      };
    }

  } catch (error: any) {

    console.error("Ошибка:", error);
    if (error.response.status > 400 && error.response.status < 500) {
      ElMessage.error('Скорее всего, что Вы ошиблись, попробуйте ввести кадастровый номер еще раз');
      registerForm.sntId = '';
      cadastralModel.modelObject = {
        cadastralNum: '',
        square: 0,
        address: '',
        sntId: '',
      }
    }

    if (error.response.status > 500 && error.response.status < 600) {
      ElMessage.info('Не удалось получить информацию из Росреестра, выберите Садовое товарищество!');
      registerForm.sntId = '';
      nameST.value = {
        address: '',
        id: '',
        inn: '',
        ogrn: '',
        oktmoCode: '',
        regDate: '',
        title: ''
      };
    }

  }
};


const sendRegistration = async () => {

  try {

    registerForm.cadastralNum = cadastralModel.modelObject.cadastralNum;
    console.log(registerForm);

    const response = await fetch(`${useRuntimeConfig().public.baseURL}/register-request`, {
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
    ElMessage.success("Пароль будет выслан Вам на элеткронную почту после вступления в СТ");
    registerComplate.value = true;
  } catch (error: any) {
    console.error("Error in signIn:", error);
    ElMessage.error(error.message);
  }
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