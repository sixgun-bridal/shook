
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bet').del()
    .then(function () {
      // Inserts seed entries
      return knex('bet').insert([
        {
          title: 'Swim',
          consequences: " If you win, I will get you a ticket to Brazil",
          terms: 'On the last day of school, you need to swim on the river for a half hour.If you loose you loose.',
          bet_start_date: "2017-05-27",
          bet_end_date: "2017-05-27",
          accepted_date:"2017-05-27",
          proposed_date:"2017-05-27",
          bets_won:3,
          bets_lost:4
        },
        {
          title: 'Go for a date',
          consequences: " If you loose, you will need to call her mom and ask the size of her bra. If you win, I will give you a one hotel night .",
          terms: 'You need too go for a date with my friend Annie and kiss her.',
          bet_start_date: '2017-07-27',
          bet_end_date: '2017-09-27',
          accepted_date:'2017-05-27',
          proposed_date:'2017-05-27',
          bets_won:3,
          bets_lost:0
        },
        {
          title: 'No Pepsi',
          consequences: " If you loose you will need to drink 10 gallons of Pepsi in 1 day. If you win I will get you a ticket to your favorite sport .",
          terms: "You can’t drink Pepsi in one  day.",
          bet_start_date: '2017-07-11',
          bet_end_date: '2017-09-12',
          accepted_date:'2017-05-12',
          proposed_date:'2017-05-16',
          bets_won:7,
          bets_lost:1
        },
        {title: 'Cinammon',
        consequences: " If you loose you need to give 1 hour of a day to charity . If you win you can get one day at a spa.",
        terms: "Eat a table spoon of cinnamon with no liquid.",
        bet_start_date: '2017-05-28',
        bet_end_date: '2017-06-27',
        accepted_date:'2017-05-26',
        proposed_date:'2017-05-28',
        bets_won: 8,
        bets_lost:4
      }

      ]);
    });
};
