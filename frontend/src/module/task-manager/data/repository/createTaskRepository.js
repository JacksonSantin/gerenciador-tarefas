const createTaskRepository = (axios) => async (payload) => {
  try {
    const response = await axios.post("tasks", payload);

    return response?.data ?? {};
  } catch (error) {
    throw error.response.data.error.message;
  }
};

export default createTaskRepository;
