//Author: Yul Choi
//Calculator App
//index.js

var express = require('express');
var app = express();
var crypto = require('crypto');
const mysql = require('mysql');

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.logsave = function(d) { //
  log_file.write(new Date() + util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};


// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    //password : '1234',
    database : 'home_share_platform'
});

// Connect
db.connect((err) => {
    if (err) {
        console.log(err);
        console.logsave(err);
        throw err;
    } else {
        console.log('MySql Connected');
        console.logsave('MySql Connected');
    }
});

var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
app.set('view engine', 'ejs');
const fileUpload = require('express-fileupload');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : '226_homeshare',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000,
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}));
app.use(fileUpload());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var loggedInUserEmail = '';
var acctTypeGlobal = "no";



//Get Home (list of classes)
app.get('/home', function(req,res) {
    console.log("Inside Home (list of classes");
    //console.log("Getting course list for: ", req.body);
});

var myuserid;
//Route to handle Post Request Call
app.post('/login', function(req,res) {
    console.logsave("Inside Login Post Request");
    console.log("Req Body : ", req.body);
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    let acctType = req.body.acctType

    let sql = ``;
    if (acctType == "admin") {

    } else if (acctType == "host") {
    	sql = `SELECT * FROM host WHERE Email_addr = '${inputUsername}'`
    } else if (acctType == "guest") {
    	sql = `SELECT * FROM guests WHERE Email_addr = '${inputUsername}'`
    } else {
    	console.logsave("Error1");
    }



    //let sql = `SELECT * FROM user WHERE username = '${inputUsername}' and password = '${inputPassword}'`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        console.log(result.length + "," + result);
        if (err) {
            throw err;
        } else if (result.length > 0) {
            console.log(result);
		    let hash1 = crypto.createHash('sha512');
		    let hash2 = crypto.createHash('sha512');
		    hash1.update(inputPassword);
		    hash2.update(hash1.digest('hex'));
		    const encrypted = hash2.digest('hex');
		    if(encrypted === result[0].Password_encrypted){
		        hash1 = undefined;
		        hash2 = undefined;
		        req.session.user = {username: inputUsername, authorization: result[0].authorization};
	            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/', userid: result[0].userid});
	            res.writeHead(200,{
	                'Content-Type' : 'text/plain'
	            })
	            //loggedInUserid = result[0].userid;
	            loggedInUserEmail = result[0].Email_addr;
	            acctTypeGlobal = acctType;
	            //myuserid = result[0].userid;
	            //console.log("Userid set: ", result[0].userid);
	            console.log("accttype: ", acctTypeGlobal);
	            //^ this makes line below unneccesary
	            //res.write(JSON.stringify(result[0].userid));
	            res.send();
		    } else {
		    	console.log('Credentials not found!');
	            res.writeHead(201,{
	                'Content-Type' : 'text/plain'
	            })
		        res.send();
		    }

        } else {
            
        }
    })
});

//Logout User
app.get('/logout', function(req, res) {
    loggedInUserEmail = '';
    acctTypeGlobal = "no";
    console.logsave("Userid reset!");
    res.end();
});

//Signup New User
app.post('/signup', function(req, res) {
    console.logsave("Inside Signup Request");
    console.log("Req Body : ", req.body);
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    let inputAuthorization = req.body.authorization;
    let acctType = req.body.acctType;
    let password = req.body.password;
    let phone = req.body.phone;
    let email = req.body.email;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let gender = req.body.gender;

    let sql = ``;
    if (acctType == "admin") {
    	console.log("test");
    } else if (acctType == "host") {
    	sql = `INSERT INTO host SET ?`;
    } else if (acctType == "guest") {
    	sql = `INSERT INTO guests SET ?`;
    } else {
    	console.logsave("Error");
    	res.send("Acct Type Error");
    }

    let extra = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      extra += possible.charAt(Math.floor(Math.random() * possible.length));

    let hash1 = crypto.createHash("sha512");
    let hash2 = crypto.createHash("sha512");
    hash1.update(req.body.password);
    hash2.update(hash1.digest("hex"));

    //let post = {username: inputUsername, password: inputPassword, authorization: inputAuthorization};
    let post = {Email_addr: email, Password_encrypted: hash2.digest("hex") , Phone_num: phone, F_name: fname, L_name: lname, Gender: gender};

    console.log(post);
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.logsave(result);
            res.send('User inserted!');
        }
    })
});

//Get Auth
app.get('/getauth', function(req,res) {
    console.logsave("Inside Get /Auth Request");
    console.log(acctTypeGlobal);
    res.send(acctTypeGlobal);
    // let sql = `SELECT authorization FROM user WHERE userid = ${loggedInUserid}`;
    // console.log(sql);
    // let query = db.query(sql, (err, result) => {
    //     console.log(result);
    //     if (err) {
    //         throw err;
    //     } else if (result.length > 0) {
    //         console.log(result);
    //         res.send(result);
    //     } else {
    //         console.log('User not Found!');
    //     }
    // })
});

//Get Profile
app.get('/getprofile', function(req,res) {
    console.log("Inside Get Profile Request");
    console.log("userid:", myuserid);
    let sql = `SELECT * FROM profile WHERE userid = ${loggedInUserid}`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        console.log(result);
        if (err) {
            throw err;
        } else if (result.length > 0) {
            console.log(result);
            res.send(result);
        } else {
            console.log('User not Found!');
        }
    })
});

//Update Profile
app.post('/updateprofile', function(req, res) {
    console.log("Inside Profile Update Request");
    console.log("Req Body : ", req.body);
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let aboutme = req.body.aboutme;
    let city = req.body.city;
    let country = req.body.country;
    let company = req.body.company;
    let school = req.body.school;
    let hometown = req.body.hometown;
    let language = req.body.languages;
    let gender = req.body.gender;
    let image = req.body.image;

    let post = {name: name, email: email, phone: phone, aboutme: aboutme, city: city, country: country, company: company, school: school, hometown: hometown, language: language, gender, image: image};
    console.log("Session userid: ", myuserid);
    let sql = `UPDATE profile SET ? WHERE userid = ${myuserid}`;
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.changedRows < 1) {
                sql = 'INSERT INTO profile SET ?'
                post = {userid: myuserid, name: name, email: email, phone: phone, aboutme: aboutme, city: city, country: country, company: company, school: school, hometown: hometown, language: language, gender, image: image};
                query = db.query(sql, post, (err2, result2) => {
                    if (err2) {
                        console.log(err2);
                        throw err2;
                    } else {
                        console.log(result2);
                        res.send('New User Profile Created!');
                    }
                })
            } else {
                console.log(result);
                res.send('User profile updated!');
            }
        }
    })  
});

// ** FACULTY START **
//Get Course List
app.get('/getcourselistfaculty', function(req, res) {
    console.log("Inside Get Faculty User's Course List");
    let sql = `SELECT * FROM course WHERE facultyid = ${loggedInUserid}`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.get('/getroomshost', function(req, res) {
    console.log("Inside getroomshost");
    let sql = `SELECT * FROM rooms WHERE H_email_addr = '${loggedInUserEmail}'`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.get('/getpaymentshost', function(req, res) {
    console.log("Inside getpaymentshost");
    let sql = `SELECT * FROM payment WHERE H_email_addr = '${loggedInUserEmail}'`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.get('/getreviewshost', function(req, res) {
    console.log("Inside getreviewshost");
    let sql = `SELECT * FROM reviews WHERE H_email_addr = '${loggedInUserEmail}'`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.get('/getreservationshost', function(req, res) {
    console.log("Inside getreservationshost");
    let sql = `SELECT * FROM RESERVED_BY JOIN rooms ON reserved_by.R_ID = rooms.R_ID AND reserved_by.H_email_addr = rooms.H_email_addr WHERE rooms.H_email_addr = '${loggedInUserEmail}'`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.get('/getlocations', function(req, res) {
    console.log("Inside getreviewsguest");
    let sql = `SELECT DISTINCT R_City FROM location`;
    let sql1 = `SELECT DISTINCT R_State FROM location`;
    let sql2 = `SELECT DISTINCT R_Country FROM location`;
    console.log(sql);
    let returnarr = [];
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            let query1 = db.query(sql1, (err1, result1) => {
		        if (err1) {
		            throw err1;
		        } else {
		            console.log(result1);
		            let query2 = db.query(sql2, (err2, result2) => {
				        if (err2) {
				            throw err2;
				        } else {
				            console.log(result2);
				            returnarr[0] = result;
				            returnarr[1] = result1;
				            returnarr[2] = result2;
				            res.send(returnarr);
				        }
				    })
		        }
		    })
        }
    })
})
app.get('/getamenities', function(req, res) {
    console.log("Inside getamenities");
    let sql = `SELECT * FROM amenities`;
    console.log(sql);
    let returnarr = [];
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.post('/addroom', function(req, res) {
    console.log("Inside addroom");
    console.log("Req Body : ", req.body);
    let price = req.body.price;
    let type = req.body.type;
    let maxguest = req.body.maxguest;
    let addr = req.body.addr;
    let status = req.body.status;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let amenities = req.body.amenities;

    sql = 'INSERT INTO rooms SET ?';
    sql2 = 'INSERT INTO LOCATE_ON SET?';
    let rid = Math.random()*10000;
    post = {R_ID: rid, H_email_addr: loggedInUserEmail, R_Price: price, R_Type: type, R_MaxGuest: maxguest, R_Addr: addr, R_Status: status};
    post2 = {R_ID: rid, H_email_addr: loggedInUserEmail, R_City: city, R_State: state, R_Country: country};
    query = db.query(sql, post, (err2, result2) => {
        if (err2) {
            console.log(err2);
            throw err2;
        } else {
            console.log(result2);
            query2 = db.query(sql2, post2, (err3, result3) => {
		        if (err3) {
		            console.log(err3);
		            throw err3;
		        } else {
		            console.log(result3);
		        }
		    })
        }
    })
    amenities.forEach(function(entry) {
    	sql = 'INSERT INTO offers SET ?';
    	post = {R_ID: rid, H_email_addr: loggedInUserEmail, A_Name: entry};
    	query = db.query(sql, post, (err, result) => {
    		if (err) {
    			console.log(err);
    			throw err;
    		} else {
    			console.log(result);
    		}
    	})
	});
	res.send('New room created');
});
app.post('/addreservation', function(req, res) {
    console.log("Inside addreservation");
    console.log("Req Body : ", req.body);
    let fromdate = req.body.fromdate;
    let todate = req.body.todate;
    let hostemail = req.body.hostemail;
    let rid = req.body.rid;
    let cost = req.body.cost;

    sql = 'INSERT INTO reserved_by SET ?';
    sql2 = 'INSERT INTO payment SET?';
    sql3 = `UPDATE rooms SET rooms.R_Status = 'unavailable' WHERE rooms.R_ID = ${rid}`;
    let pnum = Math.random()*10000;
    post = {From_date: fromdate, To_date: todate, G_email_addr: loggedInUserEmail, R_ID: rid, H_email_addr: hostemail};
    post2 = {P_Num: pnum, P_Time: new Date(), P_Amount: cost, G_email_addr: loggedInUserEmail, H_email_addr: hostemail};
    query = db.query(sql, post, (err2, result2) => {
        if (err2) {
            console.log(err2);
            throw err2;
        } else {
            console.log(result2);
            query2 = db.query(sql2, post2, (err3, result3) => {
		        if (err3) {
		            console.log(err3);
		            throw err3;
		        } else {
		            console.log(result3);
		            query3 = db.query(sql3, post3, (err4, result4) => {
				        if (err4) {
				            console.log(err4);
				            throw err4;
				        } else {
				            console.log(result4);
				            res.send('New reservation created');
				        }
				    })
		            res.send('New reservation created');
		        }
		    })
        }
    })
});
app.post('/addreview', function(req, res) {
    console.log("Inside addreview");
    console.log("Req Body : ", req.body);
    let reviewtext = req.body.reviewtext;
    let hostemail = req.body.hostemail;

    sql = 'INSERT INTO reviews SET ?'
    let renum = Math.random()*10000;
    post = {Re_Num: renum, Re_Text: reviewtext, Re_Time: new Date(), G_email_addr: loggedInUserEmail, H_email_addr: hostemail};
    query = db.query(sql, post, (err2, result2) => {
        if (err2) {
            console.log(err2);
            throw err2;
        } else {
            console.log(result2);
		    res.send('New review created');
        }
    })
});
app.get('/getreservationsguest', function(req, res) {
    console.log("Inside getreservationsguest");
    let sql = `SELECT * FROM RESERVED_BY JOIN rooms ON reserved_by.R_ID = rooms.R_ID AND reserved_by.H_email_addr = rooms.H_email_addr WHERE G_email_addr = '${loggedInUserEmail}'`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.get('/getpaymentsguest', function(req, res) {
    console.log("Inside getpaymentsguest");
    let sql = `SELECT * FROM payment WHERE G_email_addr = '${loggedInUserEmail}'`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.get('/getreviewsguest', function(req, res) {
    console.log("Inside getreviewsguest");
    let sql = `SELECT * FROM reviews WHERE G_email_addr = '${loggedInUserEmail}'`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
app.get('/getroomsguest', function(req, res) {
    console.log("Inside get rooms guest");
    console.log("hello",req.query.state);
    let condition = '';
    if (req.query.city !== undefined && req.query.city != '') {
    	condition += " AND locate_on.R_City = '" + req.query.city + "' ";
    }
    if (req.query.state !== undefined && req.query.state != '') {
    	condition += " AND locate_on.R_State = '" + req.query.state + "' ";
    }
    if (req.query.country !== undefined && req.query.country != '') {
    	condition += " AND locate_on.R_Country = '" + req.query.country + "' ";
    }
    let sql = `SELECT * FROM rooms JOIN locate_on WHERE rooms.R_ID = locate_on.R_ID AND rooms.H_email_addr = locate_on.H_email_addr ` + condition;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log("Result",result);
            res.send(result);
        }
    })
})
app.get('/getroomamenities', function(req, res) {
    console.log("Inside getroomamenities");
    console.log(req.query);
    let sql = `SELECT * FROM offered_amenities WHERE offered_amenities.R_ID=${req.query.roomid} AND offered_amenities.H_email_addr=`+ "'" + req.query.hostemail + "'";
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log("Result",result);
            res.send(result);
        }
    })
})
app.get('/getroominfo', function(req, res) {
    console.log("Inside getroominfo");

    let sql = `SELECT * FROM roomsWithLocation  WHERE ` + 'roomsWithLocation.R_ID = ' + req.query.roomid + ' AND roomsWithLocation.H_email_addr = \''+req.query.hostemail+'\'';
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
})
// db.beginTransaction(function(err, req) {
//     let fromdate = req.fromdate;
//     let todate = req.todate;
//     let hostemail = req.hostemail;
//     let rid = req.rid;
//     let cost = req.cost;
//     let pnum = req.P_Num;
//   let post2 = {P_Num: pnum, P_Time: new Date(), P_Amount: cost, G_email_addr: loggedInUserEmail, H_email_addr: hostemail};
//   if (err) { throw err; }
//   db.query('INSERT INTO payment SET ?', post2, function(err, result) {
//     if (err) { 
//       db.rollback(function() {
//         throw err;
//       });
//     }

//     var log = 'Post ' + result.insertId + ' added';

//     // db.query('INSERT INTO log SET data=?', log, function(err, result) {
//     //   if (err) { 
//     //     db.rollback(function() {
//     //       throw err;
//     //     });
//     //   }  
//     //   db.commit(function(err) {
//     //     if (err) { 
//     //       db.rollback(function() {
//     //         throw err;
//     //       });
//     //     }
//     //     console.log('success!');
//     //   });
//     // });
//   });
// });

//Create Course
app.post('/createcourse', function(req, res) {
    console.log("Inside Create Course");
    let post = { title: req.body.title, department: req.body.department, description: req.body.description, room: req.body.room, capacity: req.body.capacity, waitlistcapacity: req.body.waitlistcapacity, term: req.body.term, facultyid: loggedInUserid }
    let sql = `INSERT INTO course SET ?`;
    console.log(post);
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    })
});

//Get Enrolled Students
app.get('/getenrolledstudents', function(req, res) {
    console.log("Inside Get Enrolled Students");
    let courseid = req.query.courseid;
    let sql = `SELECT profile.userid, courseid, name FROM coursestudent, profile WHERE coursestudent.userid = profile.userid AND coursestudent.courseid = ${courseid}`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//Get Waitlist Students
app.get('/getwaitliststudents', function(req, res) {
    console.log("Inside Get Waitlist Students");
    let courseid = req.query.courseid;
    let sql = `SELECT profile.userid, courseid, name FROM coursestudentwaitlist, profile WHERE coursestudentwaitlist.userid = profile.userid AND coursestudentwaitlist.courseid = ${courseid}`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//Drop Student
app.post('/dropstudent', function(req, res) {
    console.log("Inside Drop Student");
    let sql = `DELETE FROM coursestudent WHERE courseid = ${req.body.courseid} AND userid = ${req.body.userid}`;
    console.log(sql);
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//Submit Permission Code
app.post('/submitpermissioncode', function(req, res) {
    console.log("Inside Submit Permission Code");
    let post = { courseid: req.body.courseid, userid: req.body.userid, code: makeid() }
    let sql = `INSERT INTO permissioncode SET ?`;
    console.log(post);
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            console.log("Code Sent; Delete From Waitlist");
            let sql = `DELETE FROM coursestudentwaitlist WHERE courseid = ${req.body.courseid} AND userid = ${req.body.userid}`;
            console.log(sql);
            let query = db.query(sql, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    console.log(result);
                    res.send(result);
                }
            });
        }
    })
});
function makeid() {
    var length = 7;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");