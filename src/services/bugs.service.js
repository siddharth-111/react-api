import http from "../http-common";

class BugsDataService {
    getAll() {
        return http.get("/bugs");
    }

    get(id) {
        return http.get(`/bugs/${id}`);
    }

    create(data) {
        return http.post("/bugs", data);
    }

    update(id, data) {
        return http.put(`/bugs/${id}`, data);
    }

    delete(id) {
        return http.delete(`/bugs/${id}`);
    }

    deleteAll() {
        return http.delete(`/bugs`);
    }

    findByTitle(title) {
        return http.get(`/bugs?title=${title}`);
    }
}

export default new BugsDataService();