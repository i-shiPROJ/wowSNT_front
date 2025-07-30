<template>
  <div class="fc fc-row">
    <div v-for="file in props.files" class="fc fc-row block-file"
      @click="downloadFile(file.originalName || getFileNameString(file.fileName))">

      <el-tooltip :content="`Cкачать - ${file.originalName}`" placement="bottom-end" effect="light">
        <div class="icon-fv fc fc-justify-center">
          <wow-icon type="mdi" :path="getIcoExtension(file.originalName)" :width="50" :height="50" />
        </div>
      </el-tooltip>

      <div class="fc fc-col blockText">
        <el-tooltip :content="file.originalName" placement="bottom-end" effect="light">
          <div class="label-fv">
            {{ file.originalName }}
          </div>
        </el-tooltip>
        <div class="file-size tc-dark-gray-3">{{ getfilesize(file.fileSize) }}</div>
      </div>


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
  },
  typeUrl: {
    type: String,
    default: ''
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

const getFileNameString = (fileName: { name: string | null; extension: string | null }): string => {
  if (!fileName.name || !fileName.extension) return '';
  return `${fileName.name}.${fileName.extension}`;
}

const getfilesize = (size: number) => {
  if (size === 0) return '0 Б';

  const units = ['Б', 'КБ', 'МБ', 'ГБ'];
  const k = 1024;
  const i = Math.floor(Math.log(size) / Math.log(k));

  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + units[i];
}

// TODO добавить отображение размера файла
const downloadFile = async (filename: string) => {
  try {

    const response = await $fetch<Blob>(getUrlDownload(props.typeUrl, filename), {
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

const getUrlDownload = (type: string, filename: string) => {
  let url = '';
  switch (type) {
    case 'register-request':
      return `${useRuntimeConfig().public.baseURL}/register-request/file/${props.folder}?filename=${filename}`
      break;
    case 'meeting':
      return `${useRuntimeConfig().public.baseURL}/meeting/file/${props.folder}?filename=${filename}`
      break;

    default:
      return ''
      break;
  }
}


</script>

<style lang="less" scoped>
.block-file {
  width: 200px;
  cursor: pointer;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .blockText{
    width: 100%;
  }

  .icon-fv {
    width: 50px;
  }

  .label-fv {
    // width: calc(100% - 50px);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-size {
    font-size: 0.8rem;
  }
}
</style>