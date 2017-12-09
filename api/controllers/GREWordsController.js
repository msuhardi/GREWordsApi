'use strict';

var mongoose = require('mongoose'),
  Group = mongoose.model('Group'),
  Word = mongoose.model('Word'),
  WordGroup = mongoose.model('WordGroup'),
  User = mongoose.model('User'),
  UserWordGroup = mongoose.model('UserWordGroup');

// Groups
exports.list_all_groups = function(req, res) {
  Group.find({}, function(err, groups) {
    if (err)
      res.send(err);
    res.json(groups);
  });
};

exports.create_a_group = function(req, res) {
  var new_group = new Group(req.body);
  new_group.save(function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};

exports.get_words_by_group = function(req, res) {
  WordGroup.find({group: req.params.id}).populate('word')
    .lean()
    .exec(function(err, words) {
      if (err)
        res.send(err);

      var words_in_group = [];
      words.forEach(function(word_group) {
        if (word_group.word) {
          var word = word_group.word;
          word["added_date"] = word_group.addedDate || word_group.added_date;
          words_in_group.push(word);
        }
      });
      res.json(words_in_group);
    });
};

exports.delete_the_group = function(req, res) {
  WordGroup.remove({
    'group':req.params.id
  }, function(err, words) {
    if (err)
      res.send(err);

    Group.remove({
      _id: req.params.id
    }, function(err, group) {
      if (err)
        res.send(err);
      res.json({ message: 'Group successfully deleted' });
    });
  });
};

exports.add_word_to_group = function(req, res) {
  var new_word_group = new WordGroup();
  new_word_group.word = req.params.word_id;
  new_word_group.group = req.params.id;
  new_word_group.added_date = Date.now();
  new_word_group.save(function(err, word_group) {
    if (err)
      res.send(err);

    res.json(word_group);
  });
};

exports.delete_word_from_group = function(req, res) {
  WordGroup.remove({
    word: req.params.word_id,
    group: req.params.id,
  }, function(err, group) {
   if (err)
     res.send(err);
   res.json({ message: 'Word Group successfully deleted' });
  });
};


// Words
exports.list_all_words = function(req, res) {
  Word.find({}, function(err, words) {
    if (err)
      res.send(err);
    res.json(words);
  });
};

exports.create_a_word = function(req, res) {
  var new_word = new Word(req.body);
  new_word.save(function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });
};

exports.get_a_word = function(req, res) {
  Word.find({_id: req.params.id}, function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  })
};

exports.update_a_word = function(req, res) {
  Word.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, word) {
    if (err)
      res.send(err);
    res.json(word);
  });
};

exports.delete_a_word = function(req, res) {
  Word.remove({
    _id: req.params.id
  }, function(err, word) {
    if (err)
      res.send(err);
    res.json({ message: 'Word successfully deleted' });
  })
};



// users
exports.list_all_users = function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
}

exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.get_a_user = function(req, res) {
  User.find({_id: req.params.id}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.get_user_by_email = function(req, res) {
  User.find({email: req.params.email}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: false}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_a_user = function(req, res) {
  User.remove({
    _id: req.params.id
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  })
};

exports.get_overall_group_progress = function(req, res) {
  UserWordGroup.find({user: req.params.id, group: req.params.group_id},
    function(err, progress) {
      if (err)
        res.send(err);

      res.json(progress);
    });
};

exports.get_group_progress = function(req, res) {
  UserWordGroup.find({user: req.params.id, group: req.params.group_id})
    .populate('words')
    .exec(function(err, group_progress) {
      if (err)
        res.send(err);

      res.json(group_progress);
    });
};

exports.create_group_progress = function(req, res) {
  var new_user_word_group = new UserWordGroup();
  new_user_word_group.user = req.params.id;
  new_user_word_group.group = req.params.group_id;
  new_user_word_group.words = [];
  new_user_word_group.save(function(err, user_word_group) {
    if (err)
      res.send(err);
    res.json(user_word_group);
  });
};

exports.delete_group_progress = function(req, res) {
  UserWordGroup.remove({
    user: req.params.id,
    group: req.params.group_id
  }, function(err, user) {
    if (err)
      res.send(err);

    res.json({ message: 'Group Progress Successfully deleted' });
  })
}

exports.update_group_progress = function(req, res) {
  UserWordGroup.findOneAndUpdate({user: req.params.id, group: req.params.group_id},
    {$set: {words: req.body.words, last_studied_date: Date.now()}},
    {new: true},
    function(err, group_progress) {
      if (err)
        res.send(err);
      res.json(group_progress);
    });
}
