import { Document, Query } from "mongoose";

export class APIService<T extends Object, U> {
  queryString: T;
  query: Query<U[], U>;

  constructor(queryString: T, query: Query<U[], U>) {
    this.queryString = queryString;
    this.query = query;
  }
  filter(regex: RegExp) {
    let searchStr = JSON.stringify(this.queryString).replace(
      regex,
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(searchStr));
    return this;
  }
  select(fields?: string) {
    if (fields) {
      const chosenFields = fields.split(",").join(" ");
      this.query.select(chosenFields);
    } else {
      this.query.select("-__v");
    }
    return this;
  }
  sort(sortBy?: string) {
    if (sortBy) {
    } else {
      this.query.sort({ createdAt: "descending" });
    }

    return this;
  }
  async limit(page?: number, limit?: number) {
    const numberOfPages = page || 0;
    const limitItems = limit || 10;
    const numberOfSkippedItems = numberOfPages * limitItems;
    const queryClone = this.query.clone();
    const totalLength = (await queryClone).length;
    if (numberOfSkippedItems >= totalLength) {
      throw new Error("No more pages!");
    }
    this.query.skip(numberOfSkippedItems).limit(limitItems);

    return this;
  }
}
