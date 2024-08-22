async function initBoard() {
  await loadTasks();
  countStatus();
}

function countStatus() {
  const statusDone = "done";
  const statustodo = "todo";
  const statuspriority = "urgent";
  const statusawaitFeedback = "awaitFeedback";
  const statusinProgress = "inProgress";

  const done = tasks.filter((t) => t.status === statusDone);
  const todo = tasks.filter((t) => t.status === statustodo);
  const priority = tasks.filter((t) => t.priority === statuspriority);
  const awaitFeedback = tasks.filter((t) => t.status === statusawaitFeedback);
  const inProgress = tasks.filter((t) => t.status === statusinProgress);

  document.getElementById("count-done").innerHTML = done.length;
  document.getElementById("count-todo").innerHTML = todo.length;
  document.getElementById("count-priority").innerHTML = priority.length;
  document.getElementById("count-awaitFeedback").innerHTML =
    awaitFeedback.length;
  document.getElementById("count-inProgress").innerHTML = inProgress.length;

  const totalTasks = tasks.length;
  document.getElementById("count-board").innerHTML = totalTasks;

  const upcomingDeadline = getUpcomingDeadline(tasks);
  document.getElementById("upcoming-deadline").innerHTML = upcomingDeadline;

  console.log(
    "done: " +
      done.length +
      ", todo: " +
      todo.length +
      ", priority: " +
      priority.length +
      ", awaitFeedback: " +
      awaitFeedback.length +
      ", inProgress: " +
      inProgress.length +
      ", total: " +
      totalTasks +
      ", upcoming deadline: " +
      upcomingDeadline
  );
}

function getUpcomingDeadline(tasks) {
  let nextDeadline = null;

  for (const task of tasks) {
    if (task.date) {
      const taskDeadline = new Date(task.date);

      if (!nextDeadline || taskDeadline < nextDeadline) {
        nextDeadline = taskDeadline;
      }
    }
  }

  return nextDeadline
    ? nextDeadline.toLocaleDateString()
    : "No upcoming deadlines";
}

document.addEventListener("DOMContentLoaded", () => {
  const hoverImgs = {
    ".todo": "assets/icons/Frame 59 (2).png",
    ".done": "assets/img/Group.png",
  };

  const originalImgs = {
    ".todo": "assets/icons/Frame 59 (1).png",
    ".done": "assets/icons/Frame 59 (3).png",
  };

  const changeImg = (selector, src) => {
    document.querySelector(`${selector} img`).src = src;
  };

  Object.keys(hoverImgs).forEach((selector) => {
    const originalSrc = originalImgs[selector];
    const hoverSrc = hoverImgs[selector];
    const element = document.querySelector(selector);
    element.addEventListener("mouseover", () => changeImg(selector, hoverSrc));
    element.addEventListener("mouseout", () =>
      changeImg(selector, originalSrc)
    );
  });
});
