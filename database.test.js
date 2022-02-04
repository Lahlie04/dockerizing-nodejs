const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create person', async () => {
    /*Expect.assertions(number) verifies that a certain number of assertions are called during a test.
     This is often useful when testing asynchronous code,
      in order to make sure that assertions in a callback actually got called*/
    expect.assertions(1);
    const person = await db.Person.create({
        id: 1,
        firstName: 'Bobbie',
        lastName: 'Draper'
    });
    expect(person.id).toEqual(1);
});

test('get person', async () => {
    expect.assertions(2);
    const person = await db.Person.findByPk(1);
    expect(person.firstName).toEqual('Bobbie');
    expect(person.lastName).toEqual('Draper');
});

test('delete person', async () => {
    expect.assertions(1);
    await db.Person.destroy({
        where: {
            id: 1
        }
    });
    const person = await db.Person.findByPk(1);
    expect(person).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});