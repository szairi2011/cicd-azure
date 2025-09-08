var request = require("request");

exports.findMeetingTimesApi = async (req, res) => {
  let body = req.body;
  var clientServerOptions = {
    uri: "https://graph.microsoft.com/v1.0/me/findMeetingTimes",
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.body.token}`,
    },
  };
  request(clientServerOptions, function (error, response) {
    return res.status(201).send(response.body);
  });
};

exports.findMeetingTimesget = async (req, res) => {
  let body = {
    attendees: [
      {
        emailAddress: {
          address: "ameni.telmoudi@6lfqx1.onmicrosoft.com",
          name: "Ameni Telmoudi",
        },
        type: "Required",
      },
    ],
    timeConstraint: {
      timeslots: [
        {
          start: {
            dateTime: "2022-05-31T09:15:48.806Z",
            timeZone: "Pacific Standard Time",
          },
          end: {
            dateTime: "2022-06-07T09:15:48.806Z",
            timeZone: "Pacific Standard Time",
          },
        },
      ],
    },
    locationConstraint: {
      isRequired: "false",
      suggestLocation: "true",
      locations: [
        {
          displayName: "Conf Room 32/1368",
          locationEmailAddress: "conf32room1368@imgeek.onmicrosoft.com",
        },
      ],
    },
    meetingDuration: "PT1H",
  };
  var clientServerOptions = {
    uri: "https://graph.microsoft.com/v1.0/me/findMeetingTimes",
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IllJdmEwcGcxUjc5SjNrcERtTkFPajU5RklWbjBTR2tHMHJ6dEhsREllUkkiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84OGY1ODE2OS1lZDQ2LTRhNzMtOGY0Yy03ZWZmZjlmM2U0ZmEvIiwiaWF0IjoxNjU0MjQ1OTkyLCJuYmYiOjE2NTQyNDU5OTIsImV4cCI6MTY1NDI1MDg5MywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQWhyUjE0VVlqN0dHMXhldjZKNksxUXpoekwrWEdTdVdyZkJNdFNHd05iN2ZvVzRoLzNMODNrdVd5Nk5PZnBqVmk0WXBqZEpVMTBsNjFoUm9mMU5tNmsxbnNvOUIxOFg0b1FXdlU5VDNUNy8wPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiZ3JhcGgtYW5ndWxhciIsImFwcGlkIjoiOTJiZmFjYzAtZmE3ZC00YjM2LTkxZTgtZjRmMWE1ZTg0YzgwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJCYWNjb3VjaGUiLCJnaXZlbl9uYW1lIjoiU2thbmRlciIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjIxOS45My4xNTcuOTUiLCJuYW1lIjoiU2thbmRlciBCYWNjb3VjaGUiLCJvaWQiOiJmZDgyMjRmYi0xNjgxLTQ1OWItOWRlNy1iNGI4NjUwMjBmNjUiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDFGNTZDQ0Y0NiIsInJoIjoiMC5BWEVBYVlIMWlFYnRjMHFQVEg3Xy1mUGstZ01BQUFBQUFBQUF3QUFBQUFBQUFBQ0hBRUEuIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBNYWlsYm94U2V0dGluZ3MuUmVhZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJmYXQyd1FQVUxuMzRqLXVOTWE1SmtwNUZSWFpUTTVVMG9MV1ptOXA1LXNrIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiODhmNTgxNjktZWQ0Ni00YTczLThmNGMtN2VmZmY5ZjNlNGZhIiwidW5pcXVlX25hbWUiOiJza2FuZGVyYmFjY291Y2hlQDZsZnF4MS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJza2FuZGVyYmFjY291Y2hlQDZsZnF4MS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiIwVlRoNUZldndFMlp6dVVabnVQckFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6IkxHYl9fSzUwMThuSjJsR2xaZ0hrdG83cTdKa0pPdUpySEp2NFVtRUU0cWsifSwieG1zX3RjZHQiOjE2NTEzNDUwMjR9.qUvudDWxgAvIGTlhEEBpYBVoksPtWXS-wUtg6F8a57UOa93MS5Rt7U6E9zTRUBYj0TEOuqdPbC_Bncp08Q1rFe7arqDPjCIOXA5nOs11Tkb2ojjm8G_zDud0nxoZO709J2GtKby4u37g5CGO69Qw7Zb0F_F8JlsZ384cTntgUsXe52bynPLB9ExGYWpGuCkGE7Hkw68rCC_JM91EK4SzES15fRxb50ID-mQamEYKBlp_EQ2a4ydW9-QI6QHw2oPz45uIkow9qp8zprbxyfntQemb3RGghQ93iC3CSdQzuktSaFqW37GEUaxJKejq0AwhyZlDdD_11I7Ng6vl8E9Syw",
    },
  };
  request(clientServerOptions, function (error, response) {
    console.log(error, response.body);
    return res.status(201).send(response.body);
  });
};

exports.suggest = async (req, res) => {
  let mentors = req.body.mentors;
  let newjoiners = req.body.newjoiners;
  let response = {
    meetingSugg: [],
  };

  for (var index = 0; index < mentors.length; index++) {
    let obj = {
      attendees: [
        {
          type: "required",
          emailAddress: {
            address: mentors[index].email,
          },
        },
        {
          type: "required",
          emailAddress: {
            address: newjoiners[index].email,
          },
        },
      ],
      locationConstraint: {
        isRequired: "false",
        suggestLocation: "false",
      },
      timeConstraint: {
        activityDomain: "work",
        timeSlots: [
          {
            start: {
              dateTime: "2022-06-14T10:34",
              timeZone: "W. Central Africa Standard Time",
            },
            end: {
              dateTime: "2022-06-15T10:34",
              timeZone: "W. Central Africa Standard Time",
            },
          },
        ],
      },
      meetingDuration: "PT1H",
      returnSuggestionReasons: "true",
      minimumAttendeePercentage: "100",
    };

    var clientServerOptions = {
      uri: "https://graph.microsoft.com/v1.0/me/findMeetingTimes",
      body: JSON.stringify(obj),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.body.token}`,
      },
    };
    let result = null;
    result = await findMeetingTimes(req.body.token, obj);
    console.log(result);
    response.meetingSugg.push({
      mentor: mentors[index].name,
      newjoiner: newjoiners[index].name,
      meetings: result,
    });
  }

  return res.status(201).send({ result: response });
};

const findMeetingTimes = async (token, body) => {
  var clientServerOptions = {
    uri: "https://graph.microsoft.com/v1.0/me/findMeetingTimes",
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let result = null;

  try {
    result = await new Promise((resolve, reject) => {
      let result = request(clientServerOptions, function (error, response) {
        if (response && response.body) resolve(response.body);
        else reject(error);
      });
    });
  } catch (err) {
    console.error(err);
  }

  return result;
};
