const Job = require("../models/Job");
const schedule = require("node-schedule");

exports.scheduled = async (req, res, next) => {
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
}

exports.delete = async (req, res, next) => {
    var uuid = req.params.taskId;
    console.log(uuid);
    let current_job = schedule.scheduledJobs[uuid];
    current_job.cancel();
    Job.deleteOne({ uuid });
    res.status(200).json({
        jobId: uuid,
        status: "Deleted",
    });
}