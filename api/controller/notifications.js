const Notifications = require("../models/notifications");
const mongoose = require("mongoose");

exports.addTaskNotifications=(data)=>{
  console.log("req",data)
    try{
    const notifications = new Notifications({
        _id: new mongoose.Types.ObjectId(),
        title : data.Task.title,
        description:"New "+data.category+" Assign to you ",
        icon : 'heroicons_outline:check-circle',
        read:false,
        user_id:data.Task.assignedTo[0],
        link:data.category+'s/'+data.Task._id,
        category:data.Task.category,
        categoryid:data.Task.id,
        createdAt:new Date(),
        createdby:data.Task.createdBy
      });
      notifications
        .save()
        .then((result) => {
          process.emit('notification', {user:data.Task.assignedTo[0],notification:result});
          console.log(result);
        })
        .catch((error) => {
          console.log(error,"error")
        })
    }
    catch(error){
        console.log(error);

    }
}

exports.addTimesheetSubmittedkNotifications=(data)=>{
  console.log("req",data)
    try{
    const notifications = new Notifications({
        _id: new mongoose.Types.ObjectId(),
        title : "Timesheet",
        description:data.Task.message,
        icon : 'heroicons_solid:mail',
        read:false,
        user_id:data.Task.assignto,
        link:data.category+'/view/'+data.Task.timesheet._id,
        category:data.category,
        categoryid:data.Task.timesheet._id,
        createdAt:new Date(),
      });
      notifications
        .save()
        .then((result) => {
          process.emit('notification', {user:data.Task.assignto,notification:result});
          console.log(result);
        })
        .catch((error) => {
          console.log(error,"error")
        })
    }
    catch(error){
        console.log(error);

    }
}
