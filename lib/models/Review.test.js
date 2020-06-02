const Review = require('./Review');

describe('Review model', () => {
  it('has a required rating', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('rejects a rating < 1', () => {
    const review = new Review({ rating: 0 });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
  });

  it('rejects a rating > 5', () => {
    const review = new Review({ rating: 6 });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });

  it('has a required review', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.review.message).toEqual('Path `review` is required.');
  });

  it('rejects a review with a more than 140 characters', () => {
    const review = new Review({ review: 'Seeing Jennifer Hudson\'s snot continue to glisten over her lips, refusing to be wiped away, made me Google, "Can you lose an Oscar?" The film is a triple-decker weirdburger from the twitching ears to the too-long tails that make the ensemble look like lemurs.' });
    const { errors } = review.validateSync();
    expect(errors.review.message).toEqual('Path `review` (`Seeing Jennifer Hudson\'s snot continue to glisten over her lips, refusing to be wiped away, made me Google, "Can you lose an Oscar?" The film is a triple-decker weirdburger from the twitching ears to the too-long tails that make the ensemble look like lemurs.`) is longer than the maximum allowed length (140).');
  });

  it('has a required film', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.film.message).toEqual('Path `film` is required.');
  });
  
  it('has a required reviewer', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
  });
});
