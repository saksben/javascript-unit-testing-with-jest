class BasketItem {

    constructor(event, ticketCount) {
        this.event = event;
        this.ticketCount = ticketCount;
    }

    getPrice() {
        return this.event.ticketPrice * this.ticketCount;
    }

}

exports.BasketItem = BasketItem;