function today(event) {
    const today = new Date();
    return today.toDateString() === event.date.toDateString();
}

function next7Days(event) {
    const today = new Date();
    today.setHours(0, 0, 0);

    const future = new Date();
    future.setDate(future.getDate() + 7);
    future.setHours(23, 59, 0);    

    const eventDate = event.date;

    return eventDate >= today && eventDate <= future;
}

function next30Days(event) {
    const today = new Date();
    today.setHours(0, 0, 0);

    const future = new Date();
    future.setHours(23, 59, 0);
    future.setDate(future.getDate() + 30);

    const eventDate = event.date;

    return eventDate >= today && eventDate <= future;
}

module.exports = {
    today, next7Days, next30Days,
}