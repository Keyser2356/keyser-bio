const birthDate = new Date('2008-07-30T00:00:00Z');

function updateAliveCounter() {
  const now = new Date();
  const diff = now - birthDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365.25);

  const remaining_minutes = minutes % 60;
  const remaining_seconds = seconds % 60;
  const remaining_hours = hours % 24;
  const remaining_days = days % 365;

  const text = `<strong>${days}</strong>d, <strong>${remaining_hours}</strong>h, <strong>${remaining_minutes}</strong>m, <strong>${remaining_seconds}</strong>s (<strong>${years}</strong>y)`;
  
  const el = document.getElementById('alive-count');
  if (el) {
    el.innerHTML = text;
  }
}

updateAliveCounter();
setInterval(updateAliveCounter, 1000);
