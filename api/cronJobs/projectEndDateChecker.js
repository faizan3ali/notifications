const cron = require('node-cron');
const Project = require("../models/project");
const User = require("../models/user");
const notifications = require("../controller/notifications")

const checkProjectEndDate = async () => {
try {
  cron.schedule('0 0 * * *', async () => {
    let currentDate = new Date();
    console.log('Checking project end dates')
    currentDate.setHours(0, 0, 0, 0);

    const sevenDaysLater = new Date(currentDate);
    sevenDaysLater.setDate(currentDate.getDate() + 7);
    let projects

   projects = await Project.find({
    status:"Active",
    endDate: {
      $gte: currentDate,
      $lte: sevenDaysLater,
    },
  }).populate("accountsManager");

    for (let project of projects) {
      const daysToEnd = (project.endDate - currentDate) / (1000 * 60 * 60 * 24);

  let notification ={
      title: "Project "+project.title +" Needs Action",
      description: '',
      icon: 'heroicons_outline:briefcase',
      user_id: project.accountsManager._id,
      link:  'projects/view/' + project._id,
      category: 'projects',
      categoryid: project._id
  }

      if (daysToEnd === 0) {
        notification.description = `Project `+project.title+` is ending today.`;
        notifications.createNotification(notification)
        console.log("notification",notification)
        //sendNotification(project.mana ger.email, message);
      } else if (daysToEnd == 7) {
        notification.description = `Project `+project.title+` is ending in ${daysToEnd} days.`;
        notifications.createNotification(notification)
        console.log("notification",notification)
      }
    }
  });
} catch (error) {
  console.log(error);
}


}
module.exports = checkProjectEndDate


