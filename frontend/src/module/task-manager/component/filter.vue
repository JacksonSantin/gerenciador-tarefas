<template>
  <v-form :ref="controller.formFilter" :disabled="controller.loading.value">
    <v-card class="mx-auto" max-width="600" min-width="600" title="Filtro">
      <v-card-text>
        <v-container fluid class="pa-0">
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="ID inicial"
                type="number"
                min="0"
                variant="underlined"
                density="compact"
                v-model.number="controller.filterTable.value.id.ini"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="ID Final"
                type="number"
                min="0"
                variant="underlined"
                density="compact"
                v-model.number="controller.filterTable.value.id.fim"
                :rules="[
                  controller.formRules.value.validNumber(
                    controller.filterTable.value.id.ini,
                    controller.filterTable.value.id.fim
                  ),
                ]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Data inicial"
                type="date"
                variant="underlined"
                density="compact"
                v-model="controller.filterTable.value.created_at.ini"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Data Final"
                type="date"
                variant="underlined"
                density="compact"
                v-model="controller.filterTable.value.created_at.fim"
                :rules="[
                  controller.formRules.value.validDate(
                    controller.filterTable.value.created_at.ini,
                    controller.filterTable.value.created_at.fim
                  ),
                ]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-select
                label="Status"
                variant="underlined"
                density="compact"
                dense
                v-model="controller.filterTable.value.completed.eq.value"
                :items="controller.filterTable.value.completed.eq.items"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
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
              @click="controller.close"
            >
              Cancelar
            </v-btn>
          </template>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-tooltip location="bottom" text="Limpar">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              size="small"
              variant="outlined"
              color="primary"
              prepend-icon="mdi-broom"
              :disabled="controller.loading.value"
              :loading="controller.loading.value"
              @click="controller.clear"
            >
              Limpar
            </v-btn>
          </template>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-tooltip location="bottom" text="Salvar">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              size="small"
              variant="elevated"
              color="primary"
              prepend-icon="mdi-content-save"
              :disabled="controller.loading.value"
              :loading="controller.loading.value"
              @click="controller.filterRecords(controller.filterTable.value)"
            >
              Salvar
            </v-btn>
          </template>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
const { controller } = defineProps({
  controller: {
    type: Object,
    required: true,
  },
});
</script>
