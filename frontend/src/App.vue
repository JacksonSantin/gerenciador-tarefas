<template>
  <v-app>
    <v-app-bar color="primary" :elevation="1" class="px-2">
      <v-app-bar-title class="text-center"
        >Sistema de Gerenciamento de Tarefas</v-app-bar-title
      >
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.v-overlay__scrim {
  opacity: 0 !important;
}
::-webkit-scrollbar-track:horizontal {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 10px;
}
::-webkit-scrollbar:horizontal {
  width: 4px;
  height: 4px;
  margin-right: -10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb:horizontal {
  border-radius: 10px;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(38, 50, 80, 1)),
    color-stop(0.72, rgb(69, 96, 158, 1))
  );
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 0px;
}
</style>
