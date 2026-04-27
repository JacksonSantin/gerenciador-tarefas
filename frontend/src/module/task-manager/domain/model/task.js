import { toRaw } from "vue";
import dayjs from "dayjs";

class Task {
  constructor({
    id = 0,
    created_at = "",
    title = "",
    description = "",
    completed = false,
  }) {
    this.id = id;
    this.created_at = created_at;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  toSave() {
    const payload = structuredClone(toRaw(this));

    payload.completed = this.completed ? "true" : "false";

    delete payload.id;
    delete payload.created_at;

    return payload;
  }
}

export default Task;
