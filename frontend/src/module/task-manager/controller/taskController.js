import { useDisplay, useTheme } from "vuetify/lib/framework.mjs";
import { computed, nextTick, onMounted, ref } from "vue";
import { headers } from "../const/headers";
import { actions } from "../const/actions";
import Task from "../domain/model/task";
import Toastify from "toastify-js";
import Swal from "sweetalert2";

const taskController =
  (getTaskUseCase, deleteTaskUseCase, saveTaskUseCase) => () => {
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
        modelTask.value = new Task({});
        dialogForm.value = true;
        resetFormValidation();
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
        resetFormValidation();
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
        const validForm = await formValidation();
        if (!validForm || read.value) return;

        loading.value = true;

        const result = await saveTaskUseCase(modelTask.value);
        Toastify({
          text: result.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "green",
            borderRadius: "50px",
          },
        }).showToast();

        await getRegister();

        closeDialogForm();
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
      try {
        const result = await Swal.fire({
          title: "Deseja realmente excluir o registro?",
          text: "Esta ação é irreversível!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
          reverseButtons: true,
          didOpen: () => {
            const popup = Swal.getPopup();
            const confirmButton = popup.querySelector(".swal2-confirm");
            confirmButton.style.backgroundColor = "#1867c0";
            confirmButton.style.color = "#ffffff";

            const cancelButton = popup.querySelector(".swal2-cancel");
            cancelButton.style.backgroundColor = "#dc3545";
            cancelButton.style.color = "#ffffff";
          },
        });

        if (result.isConfirmed) {
          loading.value = true;

          await deleteTaskUseCase(item.id);
          await getRegister();

          Toastify({
            text: "Registro excluído com sucesso!",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
              background: "green",
              borderRadius: "50px",
            },
          }).showToast();
        }
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
