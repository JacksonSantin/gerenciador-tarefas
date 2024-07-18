const getTaskUseCase = (repository) => async () => {
  try {
    const items = await repository();
    const count = items.length;

    return { items, count };
  } catch (error) {
    throw error;
  }
};

export default getTaskUseCase;
