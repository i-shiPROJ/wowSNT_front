<template>
  <div class="info-page fc fc-col">
    <div class="name-page"><b>{{ props.namePage }} </b></div>
    <div class="breadcrumb fc fc-row fc-align-content-center">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in tree">
          <span class="link" @click="toUrl(item, index)">{{ getNamebreadcrumb(item) }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!--       <el-tooltip content="На уровень вверх" placement="bottom-end" effect="light">
        <div class="cursor-up" @click="toUp">
          <wow-icon :size="21" type="mdi" :path="$mdi.mdiArrowUp" />
        </div>
      </el-tooltip> -->

    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter();

const props = defineProps({
  namePage: {
    type: String,
    default: ''
  }
})

onMounted(() => {

})

const tree = computed(() => {
  let parts = router.currentRoute.value.fullPath.split('/').filter(item => item !== '');

  parts.splice(1, 1);
  return parts;
});

// const toUp = () => {
//   navigateTo({ path: router.currentRoute.value.path.split('/').slice(0, -1).join('/') })
// }

const mapRoutes = new Map([
  ['admin', 'Рабочий стол'],
  ['meetingvoting', 'Собрания и голосования'],
  ['solution', 'Заявки на вступление'],
  ['messages', 'Обращения содоводов'],
  ['settings', 'Настройки ст'],
  ['allLands', 'Участки'],
  ['participant', 'Участники'],
  ['districts', 'Районы'],
  ['staffunit', 'Перечень должностей'],
  ['edit', 'Редактирование'],
])

const getNamebreadcrumb = (key: string) => {
  return mapRoutes.get(key) ? mapRoutes.get(key) : key;
}

const toUrl = (key: string, index: number) => {
  index++;

  let arrayUrl = router.currentRoute.value.fullPath.split('/').filter(item => item !== '');

  function joinUntilKey(arr: string[], key: string) {
    // const idx = arr.lastIndexOf(key);
    const idx = index;
    if (idx > 0) {
      return arr.slice(0, idx + 1).join('/');
    }
    return '';
  }

  router.push(`/${joinUntilKey(arrayUrl, key)}`);

}
</script>

<style lang="less" scoped>
.info-page {
  margin: 15px;
  cursor: default;

  .name-page {
    font-size: 1.2rem;
    padding-bottom: 15px;
  }

  .breadcrumb {
    .link {
      cursor: pointer;
    }

    .cursor-up {
      margin-left: 5px;
      position: relative;
      top: -4px;
      cursor: pointer;
    }

  }
}
</style>