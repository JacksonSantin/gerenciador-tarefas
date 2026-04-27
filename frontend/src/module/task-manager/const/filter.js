export const filter = {
  id: {
    ini: 0,
    fim: 0,
  },
  created_at: {
    ini: "",
    fim: "",
  },
  completed: {
    eq: {
      value: null,
      items: [
        { title: "Todos", value: null },
        { title: "Concluída", value: true },
        { title: "Não concluída", value: false },
      ],
    },
  },
};
