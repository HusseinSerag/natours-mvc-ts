import Tour from "../models/tour.model";
import { FindAllToursType } from "../schemas/tour.schema";
import { APIService } from "../utils/apiService";

export async function getAllTours(requestQuery: FindAllToursType["query"]) {
  const { fields, limit, page, sort, ...filters } = requestQuery;
  const api = new APIService(filters, Tour.find());

  try {
    return await api
      .filter(/\b(lt|lte|gt|gte)\b/g)
      .select(fields)
      .sort(sort)
      .limit(page, limit)
      .then((query) => query.query.exec());
  } catch (e) {
    throw e;
  }
}
