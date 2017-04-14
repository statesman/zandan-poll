var Baby = require('babyparse'),
    fs = require('fs'),
    _ = require('underscore');


var csv = fs.readFileSync(__dirname + '/ZandanPoll2017_StatesmanData_v1.csv', {
    encoding: 'utf8'
  });
var parsed = Baby.parse(csv, {
  header: true,
  dynamicTyping: true
});

var noBlanks = _.filter(parsed.data, function(row) {
  return row['Q#'] !== '';
});

var groupedByQuestion = _.groupBy(noBlanks, function(row) {
  return row.Question.trim();
});

var filteredByQuestionType = _.filter(groupedByQuestion, function(question, id) {
  return id.substring(0, 1) !== 'S';
});

var formattedRows = _.map(filteredByQuestionType, function(question) {
  // Get question text
  var questionText = question[0]['Question'],
      questionId = question[0]['Q#'];

  // Format answers
  var answers = _.map(question, function(answer) {
    return {
      text: answer['Answer Choice'].toString().trim(),
      total: answer['Total 2017'],
      yrs05: answer['0-5 Years in Austin'],
      yrs620: answer['6-20 Years in Austin'],
      yrs21: answer['21+ Years in Austin'],
      livCou: answer['Not CoA Resident'],
      livAus: answer['CoA Resident'],
      livCen: answer['Central - Yes'],
      age18: answer['Age 18-34'],
      age35: answer['Age 35+']
    };
  });

  return {
    id: questionId,
    question: questionText,
    answers: answers
  };
});

// Write the JSON file
fs.writeFileSync(
  __dirname + '/../../public/data/questions.json',
  JSON.stringify(formattedRows),
  { encoding: 'utf8' }
);

console.log('Done.');
