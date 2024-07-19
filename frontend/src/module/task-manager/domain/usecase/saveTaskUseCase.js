const saveTaskUseCase =
  (createTaskRepository, updateTaskRepository) => async (payload) => {
    try {
      const isEdit = !!payload.id;

      if (isEdit) {
        const items = await updateTaskRepository(payload.toSave());
        const count = items.length;

        return { items, count };
      }

      const items = await createTaskRepository(payload.toSave());
      const count = items.length;

      return { items, count };
    } catch (error) {
      throw error;
    }
  };

export default saveTaskUseCase;
