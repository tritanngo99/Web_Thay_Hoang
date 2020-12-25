'use strict';

module.exports = function(Booking) {
  Booking.searchNamePatient = function(name, cb) {
    // eslint-disable-next-line max-len
    Booking.find({where: {name: {like: '%' + name + '%'}}}, (_err, posts) => {
      var response = posts;
      cb(null, response);
    });
  };
  Booking.remoteMethod(
    'searchNamePatient', {
      http: {path: '/searchNamePatient', verb: 'get'},
      // eslint-disable-next-line max-len
      accepts: {arg: 'name', type: 'string', required: true, http: {source: 'query'}},
      returns: {type: 'array', root: true},
    }
  );
};
