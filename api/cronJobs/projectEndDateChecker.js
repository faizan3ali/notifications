const cron = require('node-cron');
const User = require("../models/user");
const notifications = require("../controller/notifications")

const checkProjectEndDate = async () => {
try {
  const Project = mongoose.model("Project");
  cron.schedule('0 0 * * *', async () => {
    let currentDate = new Date();
    console.log('Checking project end dates')
    currentDate.setHours(0, 0, 0, 0); // set the time to 00:00:00.000

    const sevenDaysLater = new Date(currentDate);
    sevenDaysLater.setDate(currentDate.getDate() + 7);
    let projects
    // Find projects that are ending either today or in the next seven days


   // console.log(project.assignto.accountsManager)
   projects = await Project.find({
    status:"Active",
    endDate: {
      $gte: currentDate,
      $lte: sevenDaysLater,
    },
  }).populate("accountsManager");
  console.log("Aaa",projects)

    for (let project of projects) {

      const daysToEnd = (project.endDate - currentDate) / (1000 * 60 * 60 * 24);
      console.log("Aaaa",daysToEnd)

  let notification ={
      title: "Project "+project.title +" Needs Action",
      description: '',
      icon: 'heroicons_outline:briefcase',
      user_id: project.accountsManager._id,
      link:  'projects/view/' + project._id,
      category: 'projects',
      categoryid: project._id
  }
  console.log("notification",notification)
  console.log(daysToEnd)
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
// Schedule a cron job to run every day at 00:00

}
module.exports = checkProjectEndDate

// // Export the function
//module.exports = checkProjectEndDate;
