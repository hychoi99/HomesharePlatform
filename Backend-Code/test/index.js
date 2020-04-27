//testing env
const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../index.js'); // Our app

//testing env
describe('Task API Routes', function() {  

    before(function() {

    });
  
    after(function() {
  
    });


    // In this test it's expected a task list of two tasks
    it('POST /login Login User', function() {
        return chai.request('http://localhost:3001')
          .post('/login')
          .send({
              username: 'student1',
              password: '1234'
          })
          expect(res).to.have.status(200);
      });
      it('POST /submitpermissioncode Permission Code', function() {
        return chai.request('http://localhost:3001')
          .get('/login')
          .send({
              username: 'student1',
              password: '1234'
          })
      });
      it('GET /waitliststudentlist List of waitlist sduents', function() {
        return chai.request('http://localhost:3001')
          .get('/login')
          .send({
              username: 'student1',
              password: '1234'
          })
      });
      it('POST /dropcourse Drop Course', function() {
        return chai.request('http://localhost:3001')
          .get('/login')
          .send({
              username: 'student1',
              password: '1234'
          })
      });
      it('GET /getclasslist Classes List', function() {
        return chai.request('http://localhost:3001')
          .get('/login')
          .send({
              username: 'student1',
              password: '1234'
          })
      });

    // // Testing the save task expecting status 201 of success
    // describe('GET Classes List', function() {
    //     it('Gets user list of classes', function(done) {
    //         request.post('/tasks')
    //             .send({
    //                 title: 'run',
    //                 done: false
    //             })
    //             .expect(201)
    //             .end(function(err, res) {
    //                 done(err);
    //             });
    //     });
    // });

    // // Here it'll be tested two behaviors when try to find a task by id
    // describe('POST Drop Course', function() {
    //     // Testing how to find a task by id
    //     it('Drop course for user', function(done) {
    //         var task = app.db('tasks').first();
    //         request.get('/tasks/' + task.id)
    //             .expect(200)
    //             .end(function(err, res) {
    //                 expect(res.body).to.eql(task);
    //                 done(err);
    //             });
    //     });
    // });

    // // Testing how to update a task expecting status 201 of success
    // describe('POST Permission Code', function() {
    //     it('Send permission code to student', function(done) {
    //         var task = app.db('tasks').first();
    //         request.put('/tasks/' + task.id)
    //             .send({
    //                 title: 'travel',
    //                 done: false
    //             })
    //             .expect(201)
    //             .end(function(err, res) {
    //                 done(err);
    //             });
    //     });
    // });

    // // Testing how to delete a task expecting status 201 of success
    // describe('POST Create assignment', function() {
    //     it('Create assignment and save to DB', function(done) {
    //         var task = app.db('tasks').first();
    //         request.put('/tasks/' + task.id)
    //             .expect(201)
    //             .end(function(err, res) {
    //                 done(err);
    //             });
    //     });
    // });
});