<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="Shipping address" :width="getWidthDialog">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMobileStore } from '~/stores/mobileInfo';
import type { SolutionInterface } from '~/components/widgets/admin/solution/interface/SolutionInterface';

const mobileStore = useMobileStore();
let currentSolutionObject = reactive(<SolutionInterface>{});
const getWidthDialog = computed(() => { return mobileStore.isMobile ? '95%' : 500 });


const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const showDialog = (currentSolution: SolutionInterface) => {
  currentSolutionObject = currentSolution;
  console.log(currentSolutionObject);
  dialogFormVisible.value = true;
};
//экспорт функции для использования через ref
defineExpose({ showDialog });

</script>

<style scoped></style>