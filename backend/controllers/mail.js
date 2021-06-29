const Mail = require("../models/Mail");
const User = require("../models/User");
const Job = require("../models/Job");
const History = require("../models/History");
const { v4: uuid } = require("uuid");
const nodemailer = require("nodemailer");

const schedule = require("node-schedule");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      clientId:process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
});
  
exports.history = async (req, res, next) => {
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
}

exports.mailbody = async (req, res, next) => {
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
}

exports.compose = async (req, res, next) => {
    try{
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
            "Mail will be sent at intervals of: " + time + "s";
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
    }
    catch(e){
        console.log(e)
    }
}