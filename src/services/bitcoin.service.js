import http from "../http-common";

class BitCoinService {
    getAll() {
        return http.get("/blocks/2021-10-21");
    }

    get(id) {
        return http.get(`/rawblock/${id}`);
    }
}

export default new BitCoinService();