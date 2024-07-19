import Task from "../../domain/model/task";

const updateTaskRepository = (axios) => async (payload) => {
  try {
    const response = await axios.put("tasks", payload);

    return response?.data?.map((task) => new Task(task)) ?? {};
  } catch (error) {
    throw error.response.data.error.message;
  }
};

export default updateTaskRepository;
