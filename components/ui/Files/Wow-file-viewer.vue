<template>
  <div class="wow-file-viewer fc fc-row fc-wrap">
    <div v-for="file in props.files" class="fc fc-row block-file"
      @click="downloadFile(file.originalName || getFileNameString(file.fileName))">

      <el-tooltip :content="`Cкачать - ${file.originalName}`" placement="bottom-end" effect="light">
        <div class="icon-fv fc fc-justify-center">
          <wow-icon type="mdi" :path="getIcoExtension(file.originalName)" :width="50" :height="50" />
        </div>
      </el-tooltip>

      <div class="fc fc-col fc-justify-space-b padding-5-0 blockText">
        <el-tooltip :content="file.originalName" placement="bottom-end" effect="light">
          <div class="label-fv">
            <span>
              {{ file.originalName }}
            </span>

          </div>
        </el-tooltip>
        <div class="file-size tc-dark-gray-3">{{ getfilesize(file.fileSize) }}</div>
      </div>

      <div v-if="props.delete" class="removebtn fc-align-content-center" @click.stop="removeFile(file.id)">
        <el-tooltip :content="`Удалить - ${file.originalName}`" placement="bottom-end" effect="light">
          <div class="icon-remove fc fc-justify-center">
            <wow-icon type="mdi" :path="mdiDeleteForever" :width="25" :height="25" />
          </div>
        </el-tooltip>
      </div>


    </div>
  </div>

</template>

<script setup lang="ts">
import type { Files } from '~/interface/Files';
import { parseFileName } from '~/interface/Files';
import { mdiFilePdfBox, mdiFileWord, mdiFileExcel, mdiFileJpgBox, mdiFilePngBox, mdiFolderZip, mdiFile, mdiDeleteForever } from '@mdi/js';
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
  },
  delete: {
    type: Boolean,
    default: false
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

const emit = defineEmits<{
  'removeFile': [id: number];
}>();

const removeFile = (id: number) => {
   emit('removeFile', id)
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
  width: 250px;
  cursor: pointer;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* Предотвращает выход контента за границы */

  .blockText {
    flex: 1;
    min-width: 0;
    /* Важно для правильной работы text-overflow */
    max-width: calc(100% - 80px);
    /* Ограничиваем максимальную ширину */
  }

  .icon-fv {
    flex-shrink: 0;
    width: 50px;
  }


  .label-fv {
    width: 100%;
    max-width: 100%;
    /* Дополнительное ограничение */
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .removebtn {
    background-color: #F56C6C;
    width: 30px;
    border-radius: 5px;
  }

  .icon-remove {
    flex-shrink: 0;
    width: 30px;
    color: #fff;
  }

  .file-size {
    font-size: 0.8rem;
  }
}

/* Адаптивность для мобильных устройств */
@media (max-width: 500px) {
  .block-file {
    width: 100%;
  }
}
</style>