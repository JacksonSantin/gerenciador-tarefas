import { toRaw } from "vue";

class Task {
    constructor({
        id = 0,
        created_at = "",
        title = "",
        description = "",
        completed = false
    }) {
        this.id = id;
        this.created_at = created_at;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    toSave() {
        const payload = structuredClone(toRaw(this))

        if(payload.completed) {
            this.completed = "true"
        } else {
            this.completed = "false"
        }

        return payload
    }
}

export default Task