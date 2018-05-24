
const doc = document;
const button = doc.getElementById('button');
const tableBody = doc.getElementById('tableBody');
const form = doc.forms.sessionResults;

let sessionData;
let numberOfRounds;
let puzzleNames;
let usersResultsArray;
let tableOfUsers;

form.addEventListener('submit', foo);

function foo() {

  event.preventDefault();

  //refresh table
  tableBody.innerHTML = '';

  fetch('assets/database/users.json')

    .then(function(response) {
      return response.json();
    })

//getting data from user.json and picking just needed fields
    .then(function(user) {
      usersResultsArray = user.users.map(function(item) {
        return _.pick(item, ['uid', 'displayName'])
      });
      return fetch('assets/database/sessions.json');
    })

    .then(function(response) {
      return response.json();
    })

    .then(function(session) {
      if (form.demo.checked) {
        sessionData = session.session2;
      } else {
        sessionData = session.session1;
      };
      createCommonArray();
      fillCommonTable();
    })

    .catch(function(reason) {
      console.log(reason);
    });
};

function createCommonArray() {
  puzzleNames = sessionData.puzzles;
  numberOfRounds = puzzleNames.length;
  insertDataFromDatabaseIntoArray();
  checkTimeResults();
  calculateTotalTime();

}

function insertDataFromDatabaseIntoArray() {

  //create for Each User empty array with roundsResults data
  usersResultsArray.forEach(function(item) {
    item.rounds = new Array(numberOfRounds).fill({});
  });

//and fill this empty array with data from databases
  usersResultsArray.forEach(function(user) {
    sessionData.rounds.forEach(function(item, index, array) {
      if (item.solutions[user.uid]) {
        user.rounds[index] = item.solutions[user.uid];
      }
    });
  });

};

function checkTimeResults() {

  usersResultsArray.forEach(function(item) {
    item.rounds.forEach(function(round) {
      if (round.time && round.correct === "Correct") {
        return round.time = round.time['$numberLong'];
      } else {
        return round.time = 150;
      }
    })
  });
};

function calculateTotalTime() {
      usersResultsArray.forEach(function(item) {
        let totalTime = _.reduce(item.rounds, (total, num) => +total + (+num.time), 0);
        item.rounds.push({'time': totalTime});
      });
};

function fillCommonTable() {
  fillTableHead();
  fillUsersResults();
};

function fillTableHead() {
  tableHead = _.template('<tr><th>User Name</th> <% _.forEach(puzzleNames, function (puzzle) {%> <th> <%-puzzle.name %>  </th> <%});  %> <th>Total Time</th></tr>');
  let tableHeadTemplate = tableHead(puzzleNames);
  tableBody.insertAdjacentHTML('afterBegin', tableHeadTemplate);
};

function fillUsersResults() {
  tableOfUsers = _.template('<% _.forEach(usersResultsArray, function(item) {%><tr><td><%- item.displayName %></td> <%;   _.forEach(item.rounds, function(round) {%> <td><a title=<%- round.code || "-" %>><%- round.time %></a></td><%});  %>  </tr><% }); %>');
  let usersResultsTemplate = tableOfUsers(usersResultsArray);
  tableBody.insertAdjacentHTML('beforeEnd', usersResultsTemplate);
};
