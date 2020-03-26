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

});
