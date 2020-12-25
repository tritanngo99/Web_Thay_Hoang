'use strict';

module.exports = function(Doctor) {
  Doctor.searchName = function(name, cb) {
    // eslint-disable-next-line max-len
    Doctor.find({where: {name: {like: '%' + name + '%'}}}, (_err, posts) => {
      var response = posts;
      cb(null, response);
    });
  };
  Doctor.remoteMethod(
    'searchName', {
      http: {path: '/searchName', verb: 'get'},
      // eslint-disable-next-line max-len
      accepts: {arg: 'name', type: 'string', required: true, http: {source: 'query'}},
      returns: {type: 'array', root: true},
    }
  );

  Doctor.searchNameBySpecialistId = function(name, specialistId, cb) {
    // eslint-disable-next-line max-len
    Doctor.find({where: {name: {like: '%' + name + '%'}, specialistId: specialistId}}, (_err, posts) => {
      var response = posts;
      cb(null, response);
    });
  };
  Doctor.remoteMethod(
    'searchNameBySpecialistId', {
      http: {path: '/searchNameBySpecialistId', verb: 'get'},
      // eslint-disable-next-line max-len
      accepts: [
        {arg: 'name', type: 'string', required: true, http: {source: 'query'}},
        // eslint-disable-next-line max-len
        {arg: 'specialistId', type: 'number', required: true, http: {source: 'query'}},
      ],
      returns: {type: 'array', root: true},
    }
  );

  Doctor.CheckEmail = function(email, cb) {
    // eslint-disable-next-line max-len
    Doctor.find({where: {email: email}}, (_err, posts) => {
      var response = posts;
      // console.log(response.length);
      if (response.length !== 0) {
        cb(null, false);
      } else {
        cb(null, true);
      }
    });
  };
  Doctor.remoteMethod(
    'CheckEmail', {
      http: {path: '/CheckEmail', verb: 'get'},
      // eslint-disable-next-line max-len
      accepts: {arg: 'email', type: 'string', required: true, http: {source: 'query'}},
      returns: {type: 'array', root: true},
    }
  );

  Doctor.Login = function(email, password, cb) {
    // eslint-disable-next-line max-len
    Doctor.find({where: {email: email, password: password}}, (_err, posts) => {
      var response = {
        'id': '',
        'state': false,
      };
      if (response.length !== 0) {
        response.id = posts[0].id;
        response.state = true;
        cb(null, response);
      } else {
        response.state = false;
        cb(null, response);
      }
    });
  };
  Doctor.remoteMethod(
    'Login', {
      accepts: [
        {arg: 'email', type: 'string', required: true},
        {arg: 'password', type: 'string', required: true},
      ],
      returns: {type: 'array', root: true},
    }
  );
};
