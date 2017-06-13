;var travelerAPI = (function () {

    var inArr;

    /**
     * предопределенные шаблоны строк
     */
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

    /**
     * Внешняя функция, определяющая использование внутренних.
     * Сдужит для значительного упрощения работы с API
     *
     * @param cadArray  -  массив JSON объектов имеющих следующий вид
     * {
     *  to: точка отправления
     *  from: точка прибытия
     *  transport: описание транспорта
     * }
     * @returns {Array} - строковый массив, с описанием движения
     */
    function findWay(cadArray) {
        var routeCardsList = [];

        inArr = cadArray.slice();

        var first = _getStartPoint();

        inArr = _makeRoutes(first);


        for (var i = 0; i < inArr.length; i++) {
            console.log(inArr[i]);
            if (inArr[i])
                routeCardsList.push(_renderNote(inArr[i]));
        }
        return routeCardsList;
    }


    /**
     * Функция добавления нового вида транспорта
     *
     * @param transportType - строка с названием транспорта
     * @param options - Объект задающий описание движения на тм или ином транспорте, имеет вид
     * {
     *   template: '' - строка с описанием. Для корректной работы должна включать в себя фигурные скобки {{}}, в которых должно быть заключено
     *      название объекта (будут подставлены значения)
     *   addition: необязательные данные, котрые буду приседенены только при наличии указанного в {{}} ключа
     * }
     */
    function addTransportType(transportType, options) {
        transportTypes[transportType] = options;
    }

    /**
     * Генерирует словесное описание отдельно взятого узла
     *
     * @param routeNode
     * @returns {*}
     * @private
     */
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
            console.log(s);
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

    /**
     * находит стартовую току
     *
     * @returns {*}
     * @private
     */
    function _getStartPoint() {
        var destinations = inArr.map(function (point) {
            return point.to;
        });

        for (var i = 0; i < inArr.length; i++)
            if (destinations.indexOf(inArr[i].from) === -1)
                return inArr[i];
    }

    function _makeRoutes(first) {
        var tmp = [];

        inArr.forEach(function (point, i) {
            tmp[point.from] = i;
        });

        var result = [first];
        for (var i = 0; i < result.length; i++) {
            if (result[i])
                var destination = result[i].to;
            else break;
            result.push(inArr[tmp[destination]]);
        }

        return result;
    }


    return {
        findWay: findWay,
        addTransportType: addTransportType
    };


})();