'use strict';
module.exports = function(app) {
  var GREWords = require('../controllers/GREWordsController');

  // GREWords Routes
  app.route('/groups')
    .get(GREWords.list_all_groups)
    .post(GREWords.create_a_group);

  app.route('/groups/:id')
    .get(GREWords.get_words_by_group)
    .delete(GREWords.delete_the_group);

  app.route('/groups/:id/words/:word_id')
    .post(GREWords.add_word_to_group)
    .delete(GREWords.delete_word_from_group);

  app.route('/words')
    .get(GREWords.list_all_words)
    .post(GREWords.create_a_word);

  app.route('/words/:id')
    .get(GREWords.get_a_word)
    .put(GREWords.update_a_word)
    .delete(GREWords.delete_a_word);

  app.route('/users')
    .get(GREWords.list_all_users)
    .post(GREWords.create_a_user);

  app.route('/users/:id')
    .get(GREWords.get_a_user)
    .put(GREWords.update_a_user)
    .delete(GREWords.delete_a_user);

  app.route('/users/by_email/:email')
    .get(GREWords.get_user_by_email);

  // Word field is NOT populated
  app.route('/users/:id/overall_progress/:group_id')
    .get(GREWords.get_overall_group_progress);

  app.route('/users/:id/progress/:group_id')
    .get(GREWords.get_group_progress)
    .post(GREWords.create_group_progress)
    .put(GREWords.update_group_progress)
    .delete(GREWords.delete_group_progress);
};
