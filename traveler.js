exports.findWay = findWay;
exports.addTransportType =  addTransportType;


var cardArray;


function findWay(cadArray) {
    var routeCardsList = [];
    var first;

    cardArray = cadArray.slice();

    first = _getStartPoint();

    cardArray = _makeRoutes(first);


    for (var i = 0; i < cardArray.length; i++) {
        if (cardArray[i])
            routeCardsList.push(_renderNote(cardArray[i]));
    }
    return routeCardsList;
}

function addTransportType(transportType, options) {
    transportTypes[transportType] = options;
}


function _renderNote(routeNode) {
    var s;
    var workObj;
    var template;

    workObj = transportTypes[routeNode.transport.type];
    if (!workObj) return 'transport is undefined';

    template = workObj.template;

    for (var key in routeNode.transport) {
        if (key === 'type') continue;

        s = "\{\{" + key + "\}\}";
        template = template.replace(s, routeNode.transport[key]);

        if (workObj.addition) {
            var additionalTemplate = workObj.addition.replace(s, routeNode.transport[key]);
            if (additionalTemplate !== workObj.addition)
                template += additionalTemplate;
        }
    }
    template = template.replace("\{\{from\}\}", routeNode.from);
    template = template.replace("\{\{to\}\}", routeNode.to);

    return template;

}

function _getStartPoint() {
    var destinations = cardArray.map(function (point) {
        return point.to;
    });

    for (var i = 0; i < cardArray.length; i++)
        if (destinations.indexOf(cardArray[i].from) === -1)
            return cardArray[i];
}

function _makeRoutes(first) {
    var tmp = [];

    cardArray.forEach(function (point, i) {
        tmp[point.from] = i;
    });

    var result = [first];
    for (var i = 0; i < result.length; i++) {
        if (result[i])
            var destination = result[i].to;
        else break;
        result.push(cardArray[tmp[destination]]);
    }

    return result;
}


var transportTypes = {
    'train': {
        template: "Take train {{number}} from {{from}} to {{to}}. Seat {{seat}}"
    },
    'airport bus': {
        template: 'Take the airport bus from {{from}} to {{to}}. No seat assignment'
    },
    'plane': {
        template: 'From {{from}}, take the flight {{to}} {{number}}. Gate {{gate}}. Seat {{seat}}.',
        addition: 'Baggage drop at ticket counter {{baggage_ticket}}'
    },
    'bus': {
        template: 'Take bus {{number}} from {{from}} to {{to}}. Seat {{seat}}'
    }
};
