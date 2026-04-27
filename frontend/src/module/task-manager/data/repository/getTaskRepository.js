import Task from "../../domain/model/task";

const getTaskRepository =
  (axios) =>
  async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (Object.values(filters).length > 0) {
        if (filters.id.ini) {
          params.append("id_start", filters.id.ini);
        }
        if (filters.id.fim) {
          params.append("id_end", filters.id.fim);
        }
        if (filters.created_at.ini) {
          params.append("created_at_start", filters.created_at.ini);
        }
        if (filters.created_at.fim) {
          params.append("created_at_end", filters.created_at.fim);
        }
        if (filters.completed.eq.value !== null) {
          params.append("completed", filters.completed.eq.value);
        }
      }

      const response = await axios.get(`tasks?${params.toString()}`);

      if (response.status === 204) {
        return [];
      }

      return response?.data?.map((task) => new Task(task)) ?? [];
    } catch (error) {
      throw error;
    }
  };

export default getTaskRepository;
