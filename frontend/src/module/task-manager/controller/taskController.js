import { useDisplay, useTheme } from "vuetify/lib/framework.mjs";
import { computed, nextTick, onMounted, ref } from "vue";
import { headers } from "../const/headers";
import { actions } from "../const/actions";
import Task from "../domain/model/task";
import Toastify from "toastify-js";

const taskController = (getTaskUseCase) => () => {
  const theme = useTheme();
  const display = useDisplay();
  const modelTask = ref(new Task({}));
  const formRef = ref(null);
  const tableItems = ref([]);
  const tableCount = ref(0);
  const tableHeaders = ref(headers);
  const tableActions = ref(actions);
  const search = ref("");
  const dialogForm = ref(false);
  const loading = ref(false);
  const read = ref(false);
  const isMobile = computed(() => {
    return display.smAndDown.value;
  });
  const events = {
    "view-record": async (item) => {
      await updateItem(item, true);
    },
    "change-record": async (item) => {
      await updateItem(item);
    },
    "delete-record": async (item) => {
      await deleteItem(item);
    },
  };
  const rules = {
    required: (value) => !!value || "O título é obrigatório",
  };

  onMounted(async () => {
    await getRegister();
  });

  const getRegister = async () => {
    try {
      loading.value = true;

      const { items, count } = await getTaskUseCase();

      tableItems.value = items;
      tableCount.value = count;
    } catch (error) {
      Toastify({
        text: error,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "red",
          borderRadius: "50px",
        },
      }).showToast();
    } finally {
      loading.value = false;
    }
  };

  const createTask = async () => {
    try {
      loading.value = true;
      console.log("INCLUIR");
      dialogForm.value = true;
    } catch (error) {
      Toastify({
        text: error,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "red",
          borderRadius: "50px",
        },
      }).showToast();
    } finally {
      loading.value = false;
    }
  };

  const updateItem = async (item, readonly) => {
    try {
      loading.value = true;
      read.value = readonly;
      modelTask.value = { ...item };
      dialogForm.value = true;
    } catch (error) {
      Toastify({
        text: error,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "red",
          borderRadius: "50px",
        },
      }).showToast();
    } finally {
      loading.value = false;
    }
  };

  const save = async () => {
    try {
      loading.value = true;
      console.log("SALVAR");
      // dialogForm.value = true
    } catch (error) {
      Toastify({
        text: error,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "red",
          borderRadius: "50px",
        },
      }).showToast();
    } finally {
      loading.value = false;
    }
  };

  const deleteItem = async (item) => {
    console.log(item);
  };

  const resetFormValidation = async () => {
    await nextTick();
    formRef.value.resetValidation();
  };

  const formValidation = async () => {
    const validate = await formRef.value.validate();
    return validate.valid;
  };

  const closeDialogForm = () => {
    dialogForm.value = false;
    read.value = false;
    modelTask.value = new Task({});
    resetFormValidation();
  };

  return {
    modelTask,
    formRef,
    tableItems,
    tableCount,
    tableHeaders,
    tableActions,
    search,
    dialogForm,
    loading,
    read,
    isMobile,
    events,
    rules,
    createTask,
    save,
    resetFormValidation,
    formValidation,
    closeDialogForm,
  };
};

export { taskController };
