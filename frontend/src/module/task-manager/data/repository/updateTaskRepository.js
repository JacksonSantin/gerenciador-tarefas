const updateTaskRepository = (axios) => async (payload) => {
  try {
    const response = await axios.put("tasks", { payload });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export default updateTaskRepository;
