import http from "../http-common";

class StoriesDataService {
    getAll() {
        return http.get("/stories");
    }

    get(id) {
        return http.get(`/stories/${id}`);
    }

    create(data) {
        return http.post("/stories", data);
    }

    update(id, data) {
        return http.put(`/stories/${id}`, data);
    }

    delete(id) {
        return http.delete(`/stories/${id}`);
    }

    deleteAll() {
        return http.delete(`/stories`);
    }

    findByTitle(title) {
        return http.get(`/stories?title=${title}`);
    }
}

export default new StoriesDataService();