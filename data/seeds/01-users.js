
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'admin', password: 'password', department: 'sales' },
        { username: 'JIMMAY', password: 'timmy', department: 'accountings' },
        { username: 'Steve', password: 'stave', department: 'management' }
      ]);
    });
};
