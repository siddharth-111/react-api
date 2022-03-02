import http from "../http-common";

class DeveloperDataService {
    getAll() {
        return http.get("/developers");
    }

    get(id) {
        return http.get(`/developers/${id}`);
    }

    create(data) {
        return http.post("/developers", data);
    }

    update(id, data) {
        return http.put(`/developers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/developers/${id}`);
    }

    deleteAll() {
        return http.delete(`/developers`);
    }

    findByTitle(title) {
        return http.get(`/developers?name=${title}`);
    }
}

export default new DeveloperDataService();