let express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const { v4: uuid } = require("uuid");

const User = require("./models/User");
const Mail = require("./models/Mail");
const Job = require("./models/Job");
const History = require("./models/History");

let app = express();
app.use(cors());
app.use(express.json());

var port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Welcome to Express 1.0"));

app.listen(port, function () {
  console.log("Running FirstRest on Port " + port);
});

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@msgscheduler.r00cg.mongodb.net/FLIPRMSGSCHEDULER?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    clientId:
      "694843719794-bb6te2lcpm1gcbj6pgki6tmd4de4j2fb.apps.googleusercontent.com",
    clientSecret: "V2WxstHlYNrnASVYR5Efv7g_",
  },
});

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
// 	console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch((err) => console.log(err));

//register user
const jwtSecret = "jwtSecret";

app.post("/signup", (req, res) => {
  //res.send('register');
  const { email, password } = req.body;
  console.log(req);
  User.findOne({ email }).then((user) => {
    if (user) {
        return res.status(400).json({
          msg:"User Already Exists!"
        })
    } else {
      const newUser = new User({
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user.id },
              jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token,
                  user: {
                    gId: user.gId,
                    id: user.id,
                    email: user.email,
                  },
                });
              }
            );
          });
        });
      });
    }
  })
  .catch((err) =>{
      console.log(err);
  });
});

//login
app.post("/login", (req, res) => {
  //res.send('login');
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(203).json({ msg: "User does not exists" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(209).json({ msg: "Invalid Credentials" });
      jwt.sign(
        { id: user.id },
        jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              gId: user.gId,
              id: user.id,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

//google-login ~ gmail sync:
/* 

access-code:
email:


*/

app.post("/gmailsync", (req, res) => {
  console.log("post req created");
  //res.send('login');
  const gId = req.body.profileObj.googleId;
  const email = req.body.profileObj.email;
  const name = req.body.profileObj.name;
  const imageUrl = req.body.profileObj.imageUrl;
  const accessToken = req.body.accessToken;

  User.findOne({ email }).then((user) => {
    if (!user) {
      // New user creation, no email field
      const newUser = new User({
        gId,
        name,
        imageUrl,
        email,
        accessToken,
      });
      newUser.gId = gId;
      newUser.email = email;
      newUser.name = name;
      newUser.imageUrl = imageUrl;
      newUser.accessToken = accessToken;
      newUser.save();
      console.log("Created New User");
      res.status(200).json({
        gId: gId,
        id: newUser.id,
        email: newUser.email,
      });
    } else {
      // use the same doc
      user.gId = gId;
      user.email = email;
      user.name = name;
      user.imageUrl = imageUrl;
      user.accessToken = accessToken;
      user.save();
      console.log("updated existing User");
      res.status(200).json({
        gId: gId,
        id: user.id,
        email: user.email,
      });
    }
  });
});

// NOTE: Access token Expiry error needs to be resolved.

//compose message && scheduling

app.post("/api/compose", (req, res) => {
  const { to, from, cc, bcc, subject, text } = req.body.mail;
  const { type, time, day, date, month, max } = req.body.schedule;
  const newMail = new Mail({
    from,
    to,
    cc,
    bcc,
    subject,
    text,
    uuid,
  });
  newMail.from = from;
  newMail.to = to;
  // newMail.cc = cc
  // newMail.bcc = bcc
  newMail.subject = subject;
  newMail.text = text;
  newMail.uuid = uuid();
  const email = from;
  User.findOne({ email }).then((user) => {
    console.log(from);
    console.log(user);
    if (!user.gId || user.gId == null) {
      res.json({
        msg: "Gmail not synced!",
      });
    } else {
      newMail.save();
      const newJob = new Job({
        uuid,
        type,
      });
      newJob.uuid = newMail.uuid;
      if (type == "Recurring")
        newJob.description =
          "Mail will be sent at intervals of: " + time + "30s";
      else {
        newJob.description =
          "Mail will be sent at " +
          +(time ? " Time: " + time : "") +
          (day ? " Day: " + day : "") +
          (date ? "Date: " + date : "") +
          (month ? "Month: " + month : "");
      }

      newJob.type = type;
      newJob.total = max;
      newJob.max = max;
      newJob.author = user.email;
      newJob.save();

      const taskId = newJob.uuid;
      if (type === null) {
        // Instant Send
        // send mail 1 time
        transporter.sendMail({
          from: newMail.from,
          to: newMail.to,
          cc: newMail.cc,
          bcc: newMail.bcc,
          subject: newMail.subject,
          text: newMail.text,
          auth: {
            user: user.email,
            accessToken: user.accessToken,
          },
        });

        res.json({
          msg: "The Mail is sent successfully",
        });
      } else if (type === "Recurring") {
        // Starting Now
        // str should resemble: '*/30 * * * * *'

        var str = "*/" + time + " * * * * *";
        console.log(str);
        const task = schedule.scheduleJob(taskId, str, function () {
          const uuid = taskId;
          Job.findOne({ uuid }).then((job) => {
            if (Number(job.total) <= 0) {
              let current_job = schedule.scheduledJobs[uuid];
              current_job.cancel();
              Job.deleteOne({ uuid });
            } else {
              console.log("running campaign: " + taskId);
              transporter.sendMail({
                from: newMail.from,
                to: newMail.to,
                cc: newMail.cc,
                bcc: newMail.bcc,
                subject: newMail.subject,
                text: newMail.text,
                auth: {
                  user: user.email,
                  accessToken: user.accessToken,
                },
              });
              job.total = Number(job.total) - 1;
              console.log(job);
              job.save();
              // History:
              History.findOne({ uuid }).then((history) => {
                if (!history) {
                  const newHistory = new History({
                    uuid,
                    type,
                  });
                  newHistory.uuid = job.uuid;
                  newHistory.type = job.type;
                  newHistory.description = job.description;
                  newHistory.lastSent = Date.now();
                  newHistory.author = user.email;
                  newHistory.save();
                } else {
                  history.lastSent = Date.now();
                  history.save();
                }
              });
            }
          });
        });
        res.status(200).json({
          msg: "The mail will be sent at intervals of " + time + " seconds",
        });
      } else if (type === "Weekly") {
        const hrs = time.split(":")[0];
        const min = time.split(":")[1];
        str = min + " " + hrs + " " + "*" + " " + "*" + " " + day;
        console.log(str);
        const task = schedule.scheduleJob(taskId, str, function () {
          const uuid = taskId;
          Job.findOne({ uuid }).then((job) => {
            if (Number(job.total) <= 0) {
              let current_job = schedule.scheduledJobs[uuid];
              current_job.cancel();
              Job.deleteOne({ uuid });
            } else {
              console.log("running campaign: " + taskId);
              transporter.sendMail({
                from: newMail.from,
                to: newMail.to,
                cc: newMail.cc,
                bcc: newMail.bcc,
                subject: newMail.subject,
                text: newMail.text,
                auth: {
                  user: user.email,
                  accessToken: user.accessToken,
                },
              });
              job.total = Number(job.total) - 1;
              console.log(job);
              job.save();
              // history:
            }
          });
        });
        res.status(200).json({
          msg: "The mail will be sent at Weekly intervals at" + hrs + min + day,
        });
      } else if (type === "Monthly") {
        const hrs = time.split(":")[0];
        const min = time.split(":")[1];
        str = min + " " + hrs + " " + date + " " + "*" + " " + "*";
        console.log(str);
        const task = schedule.scheduleJob(taskId, str, function () {
          const uuid = taskId;
          Job.findOne({ uuid }).then((job) => {
            if (Number(job.total) <= 0) {
              let current_job = schedule.scheduledJobs[uuid];
              current_job.cancel();
              Job.deleteOne({ uuid });
            } else {
              console.log("running campaign: " + taskId);
              transporter.sendMail({
                from: newMail.from,
                to: newMail.to,
                cc: newMail.cc,
                bcc: newMail.bcc,
                subject: newMail.subject,
                text: newMail.text,
                auth: {
                  user: user.email,
                  accessToken: user.accessToken,
                },
              });
              job.total = Number(job.total) - 1;
              console.log(job);
              job.save();
            }
          });
        });
        res.status(200).json({
          msg:
            "The mail will be sent at monthly intervals at " +
            hrs +
            min +
            " on " +
            date,
        });
      } else if (type === "Yearly") {
        const hrs = time.split(":")[0];
        const min = time.split(":")[1];
        str = min + " " + hrs + " " + date + " " + month + " " + "*";
        console.log(str);
        const task = schedule.scheduleJob(taskId, str, function () {
          const uuid = taskId;
          Job.findOne({ uuid }).then((job) => {
            if (Number(job.total) <= 0) {
              let current_job = schedule.scheduledJobs[uuid];
              current_job.cancel();
              Job.deleteOne({ uuid });
            } else {
              console.log("running campaign: " + taskId);
              transporter.sendMail({
                from: newMail.from,
                to: newMail.to,
                cc: newMail.cc,
                bcc: newMail.bcc,
                subject: newMail.subject,
                text: newMail.text,
                auth: {
                  user: user.email,
                  accessToken: user.accessToken,
                },
              });
              job.total = Number(job.total) - 1;
              console.log(job);
              job.save();
            }
          });
        });
        res.status(200).json({
          msg:
            "The mail will be sent at Yearly intervals at " +
            months +
            date +
            hrs +
            min +
            " on " +
            date,
        });
      } else {
        res.status(404).json({
          msg: "configurations not found",
        });
      }
    }
  });

  //-> save to db(1), save to schedules, start cron job -> store cron-job,[, ]
  // next time of sending the mail db(1),
  // Store in history whenever a cron job is being done ~>
  // [History]db(2) (last time of sending, number of times sent till now, type of mail)
  // Schedule(future): when the job is introduced for the first time
  // It is inserted into the schedule db with (next time of sending, type of sending, number of mails remaining)
});

app.post("/api/delete/:taskId", (req, res) => {
  var uuid = req.params.taskId;
  console.log(uuid);
  // uuid = "abcd"
  let current_job = schedule.scheduledJobs[uuid];
  current_job.cancel();
  Job.deleteOne({ uuid });
  res.status(200).json({
    jobId: uuid,
    status: "Deleted",
  });
});

//get history

app.get("/api/history/:author", (req, res) => {
  var author = req.params.author;
  History.find({ author }).then((history) => {
    if (!author) {
      res.status(404).json({
        msg: "No mails sent",
      });
    } else {
      res.status(200).json({
        sent: history,
      });
    }
  });
});

// get body of a mail by uuid

app.get("/api/mailbody/:uuid", (req, res) => {
  var uuid = req.params.uuid;
  Mail.findOne({ uuid }).then((mails) => {
    // mails
    if (!mails) {
      res.status(204).json({
        msg: "Mail not found!",
      });
    } else {
      res.status(200).json({
        mails: mails,
      });
    }
  });
});

//get schedules

app.get("/api/schedule/:author", (req, res) => {
  var author = req.params.author;
  Job.find({ author }).then((jobs) => {
    if (!jobs) {
      res.status(204).json({
        msg: "Schedules not found!",
      });
    } else {
      res.status(200).json({
        schedule: jobs,
      });
    }
  });
});

//user-data

app.get("/api/user/:email", (req, res) => {
  var email = req.params.email;
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(204).json({
        msg: "No user found",
      });
    } else {
      res.status(200).json({
        user: user,
      });
    }
  });
});
