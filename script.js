

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Collect selected answers
    var answers = {};
    var questions = document.querySelectorAll('.quiz-container');
    questions.forEach(function(question, index) {
        var questionNumber = index + 1;
        var selectedOption = question.querySelector('input[name="question' + questionNumber + '"]:checked');
        if (selectedOption) {
            answers['question' + questionNumber] = selectedOption.value;
        } else {
            answers['question' + questionNumber] = ''; // Default value if no option is selected
        }
    });

    // Calculate result based on answers
    var result = calculateResult(answers);

    // Construct query string with result
    var queryString = 'character=' + encodeURIComponent(result.character) + '&description=' + encodeURIComponent(result.description);
    
    // Redirect to results.html with query string
    window.location.href = 'results.html?' + queryString;
});

// Function to calculate result based on answers
function calculateResult(answers) {
    // Count occurrences of each answer
    var count = { 'a': 0, 'b': 0, 'c': 0, 'd': 0 };
    for (var key in answers) {
        count[answers[key]]++;
    }

    // Determine the most frequent answer
    var maxCount = Math.max(...Object.values(count));
    var result = '';
    switch(maxCount) {
        case count['a']:
            result = { character: "James Sunderland", description: "Congratulations! Your Silent Hill crush is the enigmatic and brooding James Sunderland from Silent Hill 2. Prepare for a journey into the depths of his tortured soul." };
            break;
        case count['b']:
            result = { character: "Heather Mason", description: "You're drawn to the courageous and resilient Heather Mason from Silent Hill 3. Get ready to face your fears together and emerge stronger than ever." };
            break;
        case count['c']:
            result = { character: "Harry Mason", description: "Your crush is the compassionate and empathetic Harry Mason from the original Silent Hill. Together, you'll navigate the horrors of the town while holding onto hope and love." };
            break;
        case count['d']:
            result = { character: "Pyramid Head", description: "You're smitten with the dark and twisted humor of the Pyramid Head from Silent Hill 2. Brace yourself for a relationship filled with danger, intrigue, and a touch of madness." };
            break;
        default:
            result = { character: "Unknown", description: "It seems like your answers didn't match any character. Please try again!" };
            break;
    }
    return result;
    // Function to get URL parameters
// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get character name and description from URL parameters
var characterName = getUrlParameter('character');
var characterDescription = getUrlParameter('description');

// Populate HTML with character name and description
document.getElementById('character-name').innerText = characterName;
document.getElementById('character-description').innerText = characterDescription;

}
