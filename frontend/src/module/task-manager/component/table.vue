<template>
  <v-card>
    <v-data-table
      no-data-text="Sem dados"
      loading-text="Carregando"
      items-per-page-text="Itens por página"
      density="compact"
      items-per-page="30"
      height="calc(100vh - 207px)"
      :mobile="controller.isMobile.value"
      :headers="controller.tableHeaders.value"
      :items="controller.tableItems.value"
      :items-length="controller.tableCount.value"
      :loading="controller.loading.value"
      :search="controller.search.value"
      :items-per-page-options="[
        { value: 30, title: '30' },
        { value: 60, title: '60' },
        { value: 100, title: '100' },
        { value: -1, title: 'Todos' },
      ]"
    >
      <template v-slot:top>
        <v-toolbar density="compact" color="transparent" flat>
          <v-toolbar-title>
            <div class="d-flex flex-column">
              <div>Tarefas</div>
            </div>
          </v-toolbar-title>
          <v-text-field
            placeholder="Pesquisar..."
            prepend-inner-icon="mdi-magnify"
            density="compact"
            variant="outlined"
            class="pa-2"
            style="max-width: 300px"
            flat
            hide-details
            v-model="controller.search.value"
          ></v-text-field>

          <div class="ml-3 mr-3">
            <v-tooltip location="bottom" text="Incluir registro">
              <template v-slot:activator="{ props }">
                <v-btn
                  size="small"
                  variant="text"
                  v-bind="props"
                  :disabled="controller.loading.value"
                  :loading="controller.loading.value"
                  @click="controller.createTask"
                >
                  <v-icon color="primary" start>mdi-plus</v-icon>
                  Incluir
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu eager>
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              variant="text"
              size="small"
              v-bind="props"
            ></v-btn>
          </template>
          <v-card>
            <v-card-text class="px-0">
              <div class="font-weight-bold mb-5 px-4">
                Ações principais do registro
              </div>

              <div class="d-flex justify-space-between align-center px-4">
                <div
                  v-for="action in controller.tableActions.value"
                  :key="action.icon"
                >
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="x-small"
                        variant="text"
                        v-bind="props"
                        :icon="action.icon"
                        :color="action.color"
                        @click="controller.events[action.event](item)"
                      ></v-btn>
                    </template>
                    <span>{{ action.description }}</span>
                  </v-tooltip>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss") }}
      </template>
      <template v-slot:[`item.completed`]="{ item }">
        <v-checkbox
          density="compact"
          color="primary"
          class="mt-0"
          hide-details
          readonly
          v-model="item.completed"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import dayjs from "dayjs";

const { controller } = defineProps({
  controller: {
    type: Object,
    required: true,
  },
});
</script>
