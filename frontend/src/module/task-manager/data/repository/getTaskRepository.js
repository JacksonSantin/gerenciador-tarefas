import Task from "../../domain/model/task";

const getTaskRepository = (axios) => async () => {
  try {
    const response = await axios.get("tasks");

    if (response.status === 204) {
      return [];
    }

    return response?.data?.map((task) => new Task(task)) ?? [];
  } catch (error) {
    throw error;
  }
};

export default getTaskRepository;
