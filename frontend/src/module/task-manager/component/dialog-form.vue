<template>
  <v-dialog
    width="650"
    scrollable
    persistent
    v-model="controller.dialogForm.value"
  >
    <v-form
      :ref="controller.formRef"
      :readonly="controller.read.value"
      :disabled="controller.loading.value"
    >
      <v-card>
        <v-card-title class="pa-0 ma-0">
          <v-toolbar
            flat
            color="primary"
            density="compact"
            title="Manutenção da Tarefa"
          >
          </v-toolbar>
        </v-card-title>

        <v-card-text class="pa-5 mt-5">
          <v-container fluid class="pa-0">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  label="Título"
                  variant="underlined"
                  :rules="[controller.rules.required]"
                  v-model="controller.modelTask.value.title"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-textarea
                  label="Descrição"
                  variant="underlined"
                  maxlength="60"
                  rows="2"
                  counter
                  no-resize
                  v-model="controller.modelTask.value.description"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-switch
                  density="compact"
                  color="green"
                  inset
                  :label="
                    controller.modelTask.value.completed
                      ? 'Tarefa completada'
                      : 'Tarefa não completada'
                  "
                  v-model="controller.modelTask.value.completed"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider />

        <v-card-actions class="d-flex align-center justify-space-between">
          <v-tooltip location="bottom" text="Cancelar">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                size="small"
                variant="outlined"
                color="red"
                prepend-icon="mdi-close"
                :disabled="controller.loading.value"
                :loading="controller.loading.value"
                @click="controller.closeDialogForm"
              >
                Cancelar
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip location="bottom" text="Salvar">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                size="small"
                variant="elevated"
                color="primary"
                prepend-icon="mdi-content-save"
                :disabled="controller.loading.value || controller.read.value"
                :loading="controller.loading.value"
                @click="controller.save"
              >
                Salvar
              </v-btn>
            </template>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
const { controller } = defineProps({
  controller: { type: Object, required: true },
});
</script>
