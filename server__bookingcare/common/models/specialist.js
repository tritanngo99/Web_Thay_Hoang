'use strict';

module.exports = function(Specialist) {
  Specialist.searchName = function(name, cb) {
    // eslint-disable-next-line max-len
    Specialist.find({where: {name: {like: '%' + name + '%'}}}, (_err, posts) => {
      var response = posts;
      cb(null, response);
    });
  };
  Specialist.remoteMethod(
    'searchName', {
      http: {path: '/searchName', verb: 'get'},
      // eslint-disable-next-line max-len
      accepts: {arg: 'name', type: 'string', required: true, http: {source: 'query'}},
      returns: {type: 'array', root: true},
    }
  );
};
