<template>
  <div>
    <table-task :controller="controller" />
    <dialog-form :controller="controller" />
  </div>
</template>

<script setup>
import { taskControllerImpl } from "../di/di";
import TableTask from "../component/table.vue";
import DialogForm from "../component/dialog-form.vue";
const controller = taskControllerImpl();
</script>
