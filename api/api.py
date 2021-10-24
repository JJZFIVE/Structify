from datetime import date
import datetime
import flask
import flask_cors
import json

app = flask.Flask(__name__)
cors = flask_cors.CORS(app)
cors.init_app(app)


@app.route("/api", methods=["POST"])
@flask_cors.cross_origin()
def get_times():
    req = flask.request.get_json(force=True)
    dictOfEvents = req.get("hardDict", None)

    optionalEvents = req.get("softDict", None)
    print(optionalEvents)

    year = 2021
    month = 10
    monday = 25

    whereEvents = {}
    prefTime = 180
    startday = 108
    endday = 264
    for key in optionalEvents.keys():
        whereEvents[key] = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}
    cleaned = cleanEvents2(dictOfEvents)

    times = getCalendar(cleaned)

    endd = finalTimes(optionalEvents, times, prefTime,
                      startday, endday, whereEvents)

    end = giveMeEvents(optionalEvents, endd, year, month, monday, whereEvents)
    print(end)
    # Must json.dumps it
    return json.dumps(end), 200

# Helper function


def timeToSeg(x):
    # x is string in format hh:mm
    num = 60 * int(x.split(":")[0]) + int(x.split(":")[1])
    return num//5

# Helper function


def cleanEvents2(dictOfEvents):

    EventsEdited = {}
    for exampleEvent in dictOfEvents.keys():

        today = date.fromisoformat(
            dictOfEvents[exampleEvent]["startDate"].split("T")[0])

        EventsEdited[exampleEvent] = {
            "title": dictOfEvents[exampleEvent]["title"], "days": [today.weekday()],
            "start": timeToSeg(
                dictOfEvents[exampleEvent]["startDate"].split("T")[1][0:5]),
            "stop": timeToSeg(dictOfEvents[exampleEvent]["endDate"].split("T")[1][0:5])}

    return EventsEdited

# Helper function


def getCalendar(dict):
    # return nested dictionary, first key is day,
    # day refers to a list of 288 five minute segments,
    # where each index is when the event is occuring.
    bigsched = {0: [-2]*288, 1: [-2]*288, 2: [-2]*288,
                3: [-2]*288, 4: [-2]*288, 5: [-2]*288, 6: [-2]*288}
    for event in dict.keys():
        starttime = dict[event]["start"]
        endtime = dict[event]["stop"]
        hold = starttime
        for day in dict[event]["days"]:
            starttime = hold
            while starttime < endtime:
                if day == 0:
                    bigsched[0][starttime] = -1
                if day == 1:
                    bigsched[1][starttime] = -1
                if day == 2:
                    bigsched[2][starttime] = -1
                if day == 3:
                    bigsched[3][starttime] = -1
                if day == 4:
                    bigsched[4][starttime] = -1
                if day == 5:
                    bigsched[5][starttime] = -1
                if day == 6:
                    bigsched[6][starttime] = -1
                starttime += 1
    return bigsched

# Helper function


def weightOfWeeks(times):
    lst = [0] * len(times)
    for n in times.keys():
        value = 0
        for x in times[n]:
            if x != -2:
                value += 1
        lst[n] = value/len(times[0])
    return lst

# Helper function


def availableTimes(times, event, startday, endday):
    lst = []
    # lst is in format (day of week, start segment)
    for n in times.keys():
        for x, value in enumerate(times[n]):

            if x >= startday and x < endday:
                #print([z for z in times[n][x:x+event["length"]] if z !=0])
                if len([z for z in times[n][x:int(x+int(event["length"])/5)+1] if z != -2]) == 0:
                    if x+int(event["length"])/5 <= endday:
                        lst.append((n, x))
    return lst

# Helper function


def bestTime(times, prefTime, event, startday, endday):
    available = availableTimes(times, event, startday, endday)
    #x = weightOfWeeks(times)[available[0][0]] + abs((available[0][1]-prefTime)/len(times[0])*2)
    # print(x)
    bestTime = [1000000, (-1, -1)]
    for n in available:
        minimum = weightOfWeeks(times)[n[0]] + \
            abs((n[1]-prefTime)/len(times[0])*2)
        # print(minimum)
        if minimum < bestTime[0]:
            bestTime[0] = minimum
            bestTime[1] = n
    return bestTime

# Helper function


def finalTimes(optionalEvents, times, prefTime, startday, endday, whereEvents):
    for key in optionalEvents.keys():
        # print(optionalEvents[key])
        count = 0
        while count < int(optionalEvents[key]["frequency"]):
            insert = bestTime(
                times, prefTime, optionalEvents[key], startday, endday)[1]
            whereEvents[key][insert[0]].append(insert[1])
            for n in range(int(int(optionalEvents[key]["length"])/5)):
                # if insert[1] == -1:
                #    raise

                times[insert[0]][insert[1]+n] = key
            count += 1
    return times

# Helper function


def giveMeEvents(optionalEvents, times, year, month, monday, whereEvents):
    retEvents = []
    for key in optionalEvents.keys():
        for day in whereEvents[key].keys():
            if len(whereEvents[key][day]) != 0:
                for value in whereEvents[key][day]:
                    retEvents.append({"title": optionalEvents[key]["title"], "startYear": year, "startMonth": month, "startDay": monday + day,
                                      "startHour": (value * 5)//60, "startMinute": int(((value*5) % 60)), "endYear": year, "endMonth": month, "endDay": monday + day, "endHour": ((value+int(optionalEvents[key]["length"])/5)*5)//60, "endMinute": int((((value+int(optionalEvents[key]["length"])/5)*5*5) % 60))})
    return retEvents


if __name__ == "__main__":
    app.run(debug=True)
