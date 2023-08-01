// ALERT NOTIFICATION FUNCTIONALITY

export function alertNotification(message, alert) {
    $(`#alert`)
      .fadeIn(1000)
      .text(message)
      .removeClass()
      .addClass(`${alert} text-center`);
    setTimeout(function () {
      $(`#alert`).fadeOut(1000);
    }, 2000);
  }