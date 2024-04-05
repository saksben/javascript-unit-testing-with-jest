function getEvents(events, searchPredicate) {
    return events.filter(searchPredicate);
}

module.exports = {
    getEvents
}