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

          <el-form-item prop="startDate" label="Дата начала владения">
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

            <!-- files -->
            <div>
              <div class="wow-adress" @click="viewSelectedFile">
                <span class="medium_brown_2 f-w-900"> Вы можете прикрепить копии документов, к примеру, выписка из
                  ЕГРН:</span>
              </div>
              <el-upload v-model:file-list="fileList" :limit="10" :auto-upload="false" :file-size="500000"
                accept=".jpg,.jpeg,.pdf"><!-- multiple -->
                <template #trigger>
                  <el-button type="primary">Выбрать файл</el-button>
                </template>
                <!--                 <el-button class="ml-3" type="success" @click="submitUpload">
                  upload to server
                </el-button> -->
                <template #tip>
                  <div class="wow-adress">
                    Максимум 10 файлов. Разрешены только JPG и PDF. Размер одного файла не может превышать 500кб.
                  </div>
                </template>
              </el-upload>
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
import { useRegistrationUser } from '~/composables/registrations/useRegistrationUser';
import { reactive, ref, onMounted } from 'vue';
import { ElMessage } from "element-plus";
import type { cadastrInterface } from '~/interface/Cadastr.interface';
import type { SntInterface } from '~/interface/Snt.interface';
import moment from 'moment';
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const { options, formRef, registerForm, rules, tabRegistration, submitBackForm, submitNextForm } = useRegistrationUser();


const registerComplate = ref(false);

interface SNTResponse {
  id: string;
  title: string;
}

onMounted(async () => {
  // console.log(moment().format('YYYY-MM-DD'));
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


let cadastralModel = reactive(
  {
    cadastr_nmber: '',
    modelObject: {} as cadastrInterface
  });

let nameST = ref({} as SntInterface);

const searchCadastrNumber = async () => {
  try {
    cadastralModel.modelObject = await $fetch<cadastrInterface>(`/cadastral/${cadastralModel.cadastr_nmber}`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    });

    if (cadastralModel.modelObject.sntId) {
      nameST.value = await $fetch<SntInterface>(`/snt/${cadastralModel.modelObject.sntId}`, {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'GET'
      });
      registerForm.sntId = nameST.value.id;
    } else {
      registerForm.sntId = 0;
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

  } catch (error: any) {

    console.error("Ошибка:", error);
    if (error.response.status > 400 && error.response.status < 500) {
      ElMessage.error('Скорее всего, что Вы ошиблись, попробуйте ввести кадастровый номер еще раз');
      registerForm.sntId = 0;
      cadastralModel.modelObject = {
        cadastralNum: '',
        square: 0,
        address: '',
        sntId: '',
      }
    }

    if (error.response.status > 500 && error.response.status < 600) {
      ElMessage.info('Не удалось получить информацию из Росреестра, выберите Садовое товарищество!');
      registerForm.sntId = 0;
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


// file
import type { UploadUserFile } from 'element-plus';
const fileList = ref<UploadUserFile[]>([]);

const viewSelectedFile = () => {
  if (fileList.value) {
    console.log('Выбранные файлы:', fileList);
  } else {
    console.log('Загрузчик файлов не инициализирован');
  }

}


const sendRegistration = async () => {
  try {
    registerForm.cadastralNum = cadastralModel.modelObject.cadastralNum;

    // Создаем объект FormData
    const formData = new FormData();

    // Добавляем данные формы
    formData.append('dto', JSON.stringify(registerForm));

    // Добавляем файлы
    fileList.value.forEach((file, index) => {
      if (file.raw) {
        //TODO работает один файл, несколько не поддерживает
        formData.append(`file`, file.raw);
      }
    });

    // Отправляем запрос
    const data = await $fetch(`register-request`, {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "POST",
      body: formData,
    });

    ElMessage.success("Вы успешно Зарегистрировались");
    ElMessage.success("Заявка на вступление в СТ отправлена");
    ElMessage.success("Пароль будет выслан Вам на электронную почту после вступления в СТ");
    registerComplate.value = true;
  } catch (error: any) {
    console.error("Error in signIn:", error);
    ElMessage.error(error.message);
  }
}


//TODO ДОБАВИТЬ проверку на поиск по кадастровому номеру, если нет кадастра или снт нет в поиске снт то выдать выпадающий список с СНТ



// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.resetFields()
// }
</script>

<style lang="less" scoped>
.wow-cadastr-number {
  padding: 10px 0;

  .wow-adress {
    padding: 20px 0;

  }
}

.label-metr {
  padding-left: 15px;
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