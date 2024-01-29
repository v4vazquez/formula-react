import http from "../http-common";

class FormulaDataService {
  getAll() {
    return http.get("/formulas");
  }

  get(id) {
    return http.get(`/formulas/${id}`);
  }

  create(data) {
    return http.post("/formulas", data);
  }

  update(id, data) {
    return http.put(`/formulas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/formulas/${id}`);
  }

  deleteAll() {
    return http.delete(`/formulas`);
  }

  findByName(name) {
    return http.get(`/formulas?name=${name}`);
  }
}

export default new FormulaDataService();
