const Film = require('./Film');

describe('Film model', () => {

  it('has a title', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('has a studio', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });

  it('has a release date', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.released.message).toEqual('Path `released` is required.');
  });

  it('rejects if released year is less than 1888', () => {
    const film = new Film({ released: 1881 });
    const { errors } = film.validateSync();
    expect(errors.released.message).toEqual('Path `released` (1881) is less than minimum allowed value (1888).');
  });

  it('rejects if released year is greater than 3000', () => {
    const film = new Film({ released: 3020 });
    const { errors } = film.validateSync();
    expect(errors.released.message).toEqual('Path `released` (3020) is more than maximum allowed value (3000).');
  });

  it('requires cast objects to have actor', () => {
    const film = new Film({ cast: [{}] });
    const { errors } = film.validateSync();
    expect(errors['cast.0.actor'].message).toEqual('Path `actor` is required.');
  });

});
