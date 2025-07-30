<template>
  <div class="fc fc-row">
<<<<<<< HEAD
    <div v-for="file in props.files" class="fc fc-row block-file" @click="downloadFile(file.originalName)">
=======
    <div v-for="file in props.files" class="fc fc-col block-file" @click="downloadFile(file.originalName)">
>>>>>>> 1c7bf29a06243b3a0a78fcc771cdceb8adc0c202

      <el-tooltip :content="`Cкачать - ${file.originalName}`" placement="bottom-end" effect="light">
        <div class="icon-fv fc fc-justify-center">
          <wow-icon type="mdi" :path="getIcoExtension(file.originalName)" :width="50" :height="50" />
        </div>
      </el-tooltip>

<<<<<<< HEAD
      <div class="fc fc-col">
        <el-tooltip :content="file.originalName" placement="bottom-end" effect="light">
          <div class="label-fv">
            {{ file.originalName }}
          </div>
        </el-tooltip>
        <div>{{ file.fileSize }}</div>
      </div>
=======
      <el-tooltip :content="file.originalName" placement="bottom-end" effect="light">
        <div class="label-fv">
          {{ file.originalName }}
        </div>
      </el-tooltip>
>>>>>>> 1c7bf29a06243b3a0a78fcc771cdceb8adc0c202


    </div>
  </div>

</template>

<script setup lang="ts">
import type { Files } from '~/interface/Files';
import { parseFileName } from '~/interface/Files';
import { mdiFilePdfBox, mdiFileWord, mdiFileExcel, mdiFileJpgBox, mdiFilePngBox, mdiFolderZip, mdiFile } from '@mdi/js';
import type { PropType } from 'vue';

const props = defineProps({
  files: {
    type: Array as PropType<Files[]>
  },
  folder: {
    type: String
<<<<<<< HEAD
  },
  typeUrl: {
    type: String,
    default: ''
=======
>>>>>>> 1c7bf29a06243b3a0a78fcc771cdceb8adc0c202
  }
})

const getIcoExtension = (originalName: string = '') => {
  const fileExtension = parseFileName(originalName);

  switch (fileExtension.extension) {
    case 'pdf':
      return mdiFilePdfBox;
    case 'doc':
    case 'docx':
      return mdiFileWord;
    case 'xls':
    case 'xlsx':
      return mdiFileExcel;
    case 'jpg':
    case 'jpeg':
      return mdiFileJpgBox;
    case 'png':
      return mdiFilePngBox;
    case 'zip':
      return mdiFolderZip;
    default:
      return mdiFile;
  }
}
// TODO добавить отображение размера файла
const downloadFile = async (filename: string) => {
  try {
<<<<<<< HEAD

    const response = await $fetch<Blob>(getUrlDownload(props.typeUrl, filename), {
=======
    const response = await $fetch<Blob>(`${useRuntimeConfig().public.baseURL}/register-request/file/${props.folder}?filename=${filename}`, {
>>>>>>> 1c7bf29a06243b3a0a78fcc771cdceb8adc0c202
      method: 'GET',
      responseType: 'blob' // Указываем, что ожидаем бинарные данные
    });

    const url = window.URL.createObjectURL(response); // Убираем обертку в новый Blob
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // Устанавливаем имя файла для скачивания
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link); // Используем оператор опциональной цепочки
  } catch (error) {
    console.error('Ошибка при скачивании файла:', error);
  }
}

<<<<<<< HEAD
const getUrlDownload = (type: string, filename: string) => {
  let url = '';
  switch (type) {
    case 'register-request':
      return `${useRuntimeConfig().public.baseURL}/register-request/file/${props.folder}?filename=${filename}`
      break;
    case 'meeting':
      return `${useRuntimeConfig().public.baseURL}//meeting/file/{${filename}}`
      break;

    default:
      return ''
      break;
  }
}

=======
>>>>>>> 1c7bf29a06243b3a0a78fcc771cdceb8adc0c202

</script>

<style lang="less" scoped>
.block-file {
<<<<<<< HEAD
  width: 200px;
=======
  width: 70px;
>>>>>>> 1c7bf29a06243b3a0a78fcc771cdceb8adc0c202
  cursor: pointer;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon {
  // font-size: 1rem;

}

.label-fv {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>