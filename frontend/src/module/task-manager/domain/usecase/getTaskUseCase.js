const getTaskUseCase =
  (repository) =>
  async (filters = {}) => {
    try {
      const items = await repository(filters);
      const count = items.length;

      return { items, count };
    } catch (error) {
      throw error;
    }
  };

export default getTaskUseCase;
