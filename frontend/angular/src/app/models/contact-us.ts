export class ContactUs {
    id: number;
    email: string;
    query: string;
    completed: boolean

    constructor(id, email, query, completed = false) {
        this.id = id;
        this.email = email;
        this.query = query;
        this.completed = completed;
    }

}
