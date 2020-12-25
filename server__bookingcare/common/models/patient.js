'use strict';

module.exports = function(Patient) {
  Patient.searchName = function(name, cb) {
    // eslint-disable-next-line max-len
    Patient.find({where: {name: {like: '%' + name + '%'}}}, (_err, posts) => {
      var response = posts;
      cb(null, response);
    });
  };
  Patient.remoteMethod(
    'searchName', {
      http: {path: '/searchName', verb: 'get'},
      // eslint-disable-next-line max-len
      accepts: {arg: 'name', type: 'string', required: true, http: {source: 'query'}},
      returns: {type: 'array', root: true},
    }
  );

  Patient.CheckEmail = function(email, cb) {
    // eslint-disable-next-line max-len
    Patient.find({where: {email: email}}, (_err, posts) => {
      var response = posts;
      // console.log(response.length);
      if (response.length !== 0) {
        cb(null, false);
      } else {
        cb(null, true);
      }
    });
  };
  Patient.remoteMethod(
    'CheckEmail', {
      http: {path: '/CheckEmail', verb: 'get'},
      // eslint-disable-next-line max-len
      accepts: {arg: 'email', type: 'string', required: true, http: {source: 'query'}},
      returns: {type: 'array', root: true},
    }
  );

  Patient.Login = function(email, password, cb) {
    Patient.find({where: {email: email, password: password}}, (_err, posts) => {
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
  Patient.remoteMethod(
    'Login', {
      accepts: [
        {arg: 'email', type: 'string', required: true},
        {arg: 'password', type: 'string', required: true},
      ],
      returns: {type: 'array', root: true},
    }
  );


  Patient.test = function(idPatient, cb){
    Patient.find({include: 'bookings',
      // scope: {
      fields: ['scheduleId', 'patientId'],
      // where: {patientId: idPatient},
      // },
    }), (err, data)=>{
      var response = data;
      console.log(response);
      cb(null, response);
    };
  };
  Patient.remoteMethod(
    'test', {
      http: {path: '/test', verb: 'get'},
      accepts: {arg: 'idPatient', type: 'number', required: true, http: {source: 'query'}},
      returns: {type: 'array', root: true},
    }
  );
};
