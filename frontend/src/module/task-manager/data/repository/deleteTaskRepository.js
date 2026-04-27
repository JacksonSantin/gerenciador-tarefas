const deleteTaskRepository = (axios) => async (payload) => {
  try {
    return await axios.delete("tasks", {
      data: { id: payload },
    });
  } catch (error) {
    throw error.response.data.error.message;
  }
};

export default deleteTaskRepository;
