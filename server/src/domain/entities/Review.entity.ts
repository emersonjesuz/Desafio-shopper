import { ReviewCommentEnum, ReviewCommentEnumKey } from "./Review-comment.enum";

export class ReviewEntity {
  rating: number;
  comment: ReviewCommentEnumKey;

  constructor(rating: number, comment: ReviewCommentEnumKey) {
    this.validadeRating(rating);
    this.validadeComment(comment);
    this.rating = rating;
    this.comment = comment;
  }

  private validadeRating(rating: number) {
    if (rating < 0 || rating > 5) {
      throw new Error("Rating is invalid");
    }
  }

  private validadeComment(comment: ReviewCommentEnumKey) {
    if (!ReviewCommentEnum[comment]) {
      throw new Error("Comment is invalid");
    }
  }
  toJson() {
    return {
      rating: this.rating,
      comment: this.comment,
    };
  }
}
