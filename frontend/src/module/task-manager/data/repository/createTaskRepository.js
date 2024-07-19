const createTaskRepository = (axios) => async (payload) => {
  try {
    const response = await axios.post("tasks", payload);

    return response?.data?.map((task) => new Task(task)) ?? {};
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 500) {
      throw error.response.data.error.message;
    }
    throw error;
  }
};

export default createTaskRepository;
