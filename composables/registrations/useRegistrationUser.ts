import type { FormInstance, FormRules } from 'element-plus';
import moment from 'moment';

export const useRegistrationUser = () => {
  const options = ref<Array<{ value: string, label: string }>>([]);
  const formRef = ref<FormInstance>()
  interface RegisterForm {
    cadastralNum: string,
    sntId: number,
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
  const registerForm = reactive<RegisterForm>({
    cadastralNum: '',
    sntId: 0,
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

  const rules = reactive<FormRules<typeof registerForm>>({
    sntId: [
      { required: false, message: 'Выберите СТ', trigger: 'change' }
    ],
    lastName: [
      { required: true, message: 'Введите Фамилию', trigger: 'blur' },
      { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' }
    ],
    firstName: [
      { required: true, message: 'Введите Имя', trigger: 'blur' },
      { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' }
    ],
    patronymic: [
      { required: true, message: 'Введите Отчество', trigger: 'blur' },
      { min: 2, max: 50, message: 'Длина поля от 2 - 50', trigger: 'blur' }
    ],
    phoneNum: [
      { required: true, message: 'Введите номер телефона', trigger: 'blur' },
      { pattern: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/, message: 'Неверный номер', trigger: 'blur' }
    ],
    email: [
      { required: true, message: 'Введите e-mail адрес', trigger: 'blur' },
      { type: 'email', message: 'Введите корректный email', trigger: 'blur' }
    ],
    square: [
      { required: true, message: 'Введите площадь участка', trigger: 'blur' },
      { type: 'number', min: 0, max: 999, message: 'Длина поля от 0 - 999', trigger: 'blur' }
    ],
    residentsNum: [
      { required: true, message: 'Введите кол-во проживающих', trigger: 'blur' },
      { type: 'number', min: 0, max: 99, message: 'Длина поля от 0 - 99', trigger: 'blur' }
    ],
    part: [
      { required: true, message: 'Введите долю', trigger: 'blur' },
      { type: 'number', min: 0.01, max: 50, message: 'Длина поля от 0.01 - 1', trigger: 'blur' }
    ],
    startDate: [
      { required: true, type: 'date', message: 'Введите дату начала владения', trigger: 'change' }
    ]
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

  return {
    options,
    formRef,
    registerForm,
    rules,
    tabRegistration,
    submitBackForm,
    submitNextForm
  };
};