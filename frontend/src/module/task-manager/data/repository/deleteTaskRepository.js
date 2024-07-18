const deleteTaskRepository = (axios) => async (payload) => {
  try {
    const response = await axios.delete("tasks", { payload });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export default deleteTaskRepository;
