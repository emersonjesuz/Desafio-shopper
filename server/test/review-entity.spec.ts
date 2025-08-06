import { describe, expect, it } from "vitest";
import { ReviewEntity } from "../src/entities/Review.entity";
import { ReviewCommentEnum } from "../src/enums/Review-comment.enum";

describe("Review entity", () => {
  it("Deve criar uma review", () => {
    const review = {
      rating: 0,
      comment: "Gostei!" as keyof typeof ReviewCommentEnum,
    };
    const input = new ReviewEntity(review.rating, review.comment);
    const output = review;
    expect(input.toJson()).toEqual(output);
  });

  it("Deve nao ser possivel criar uma review se rating for for que zero e maior que cinco", () => {
    const review = {
      rating: -1,
      comment: "Bom",
    };
    expect(() => new ReviewEntity(review.rating, review.comment as any)).toThrowError("Rating is invalid");
    review.rating = 6;
    expect(() => new ReviewEntity(review.rating, review.comment as any)).toThrowError("Rating is invalid");
  });
  it("Deve nao ser possivel criar uma review com comentario invalido", () => {
    const review = {
      rating: 1,
      comment: "não gostei",
    };

    expect(() => new ReviewEntity(review.rating, review.comment as any)).toThrowError("Comment is invalid");
  });
});
