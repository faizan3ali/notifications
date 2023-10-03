const Notifications = require("../models/notifications");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.createNotification = async (notificationData) => {
  try {
    const notifications = new Notifications({
      _id: new mongoose.Types.ObjectId(),
      ...notificationData,
      read: false,
      createdAt: new Date()
    });

    const result = await notifications.save();
    console.log("result", notificationData.user_id);
    process.emit('notification', { user: notificationData.user_id, notification: result });
    console.log(result);
  } catch (error) {
    console.error(`Error creating notification: ${error}`, "error");
  }
};

exports.addTaskNotifications = (data) => {

  const notificationData = {
    title: data.Task.title,
    description: "New " + data.category + " Assign to you",
    icon: 'heroicons_outline:check-circle',
    user_id: data.Task.assignedTo[0],
    link: data.category + 's/' + data.Task.id,
    category: data.Task.category,
    categoryid: data.Task.id,
    createdby: data.Task.createdBy
  };

  createNotification(notificationData);
};



exports.addTimesheetSubmittedkNotifications = (data) => {
  console.log("req", data);
  const notificationData = {
    title: "Timesheet",
    description: data.Task.message,
    icon: 'heroicons_solid:mail',
    user_id: data.Task.assignto,
    link: data.category + '/view/' + data.Task.timesheet._id,
    category: data.category,
    categoryid: data.Task.timesheet._id
  };
  createNotification(notificationData);
};

//create a notification for all master users
exports.addNewSignUpUserNotification=(data)=>{
  console.log("req", data);
let UserAssign=data.UserAssignIds;
UserAssign.forEach(element => {
  const notificationData = {
    title: "New User SignUp",
    description: data.User.firstName +' '+data.User.lastName+' created new Account .',
    icon: 'heroicons_solid:user',
    user_id: element,
    link:   '/settings' +'?id='+data.User._id ,
    category: 'NewUser',
    categoryid: data.User._id
  };
  createNotification(notificationData);
});




}
