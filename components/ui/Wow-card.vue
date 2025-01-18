<template>
  <div class="wow-card-col">
    <div class="inside-block">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="body">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.wow-card-col {
  margin: 0.8rem;

  .inside-block {
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.03);
    border: 1px solid #F1F1F4;
    padding: 1.25rem;
    background-color: #FFF;
    border-radius: 10px;

    .header {}

    .body {
      padding: 1rem 0;
    }
  }
}
</style>