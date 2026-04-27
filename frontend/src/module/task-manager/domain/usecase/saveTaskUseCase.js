const saveTaskUseCase =
  (createTaskRepository, updateTaskRepository) => async (payload) => {
    try {
      const isEdit = !!payload.id;

      if (isEdit) {
        const data = {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          completed: payload.completed ? "true" : "false",
        };

        return await updateTaskRepository(data);
      }

      const data = {
        title: payload.title,
        description: payload.description,
        completed: payload.completed ? "true" : "false",
      };

      return await createTaskRepository(data);
    } catch (error) {
      throw error;
    }
  };

export default saveTaskUseCase;
