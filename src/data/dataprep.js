var Baby = require('babyparse'),
    fs = require('fs'),
    _ = require('underscore');


var csv = fs.readFileSync(__dirname + '/ZandanPoll2015_StatesmanData_v1.csv', {
    encoding: 'utf8'
  });
var parsed = Baby.parse(csv, {
  header: true,
  dynamicTyping: true
});

var noBlanks = _.filter(parsed.data, function(row) {
  return row.QuestionText !== '';
});

var groupedByQuestion = _.groupBy(noBlanks, function(row) {
  return row.QuestionText.split('. ')[0].trim();
});

var filteredByQuestionType = _.filter(groupedByQuestion, function(question, id) {
  return id.substring(0, 1) !== 'S';
});

var formattedRows = _.map(filteredByQuestionType, function(question) {
  // Get question text
  var questionParts = question[0].QuestionText.split('. '),
      questionId = questionParts[0].trim();

  // Shift to drop the question number
  questionParts.shift();

  // Rejoin the text
  var questionText = questionParts.join('. ').trim().split(' (')[0];

  // Format answers
  var answers = _.map(question, function(answer) {
    delete answer.questionText;

    return {
      text: answer['Values Text'].toString().trim(),
      total: answer.Total,
      yrs05: answer['NOY - 0-5'],
      yrs620: answer['NOY - 6-20'],
      yrs21: answer['NOY - 21+'],
      livAus: answer['Res - Yes'],
      livCou: answer['Res - No'],
      livCen: answer['Central - Yes']
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
  __dirname + '../../../public/data/questions.json',
  JSON.stringify(formattedRows),
  { encoding: 'utf8' }
);

console.log('Done.');
