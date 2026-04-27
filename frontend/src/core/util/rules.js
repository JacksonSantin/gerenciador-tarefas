export const rules = {
  required: (v) => !!v || "Obrigatório",
  validNumber: (v1, v2) => {
    if (v1 != undefined && v2 != undefined && v1 <= v2) return true;
    else return "Valor inicial é maior que o final";
  },
  validDate: (v1, v2) => {
    const erro = "Data inicial é maior que a final";

    if (!v1 && !v2) return true;

    if (!v1 || !v2) return erro;

    // Verifica se o formato das datas é válido (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(v1) || !dateRegex.test(v2)) return erro;

    // Compara as datas
    if (new Date(v1) > new Date(v2)) return erro;

    return true;
  },
};
