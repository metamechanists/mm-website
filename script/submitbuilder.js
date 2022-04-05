
// You're looking at my terible javascript?
// Most of this was written at 3am, and it's basically my first time doing JS
// please don't judge lmao


var variableIDs = [
  'age', 
  'ableToVc', 
  'timezone', 
  'minecraftUsername', 
  'discordUsername', 
  'buildingExperience', 
  'buildingStyle',
  'buildingPictures',
  'tellUsAStory',
  'tellUsAboutYourself'];

var variableNames = [
  'How old are you?', 
  'Are you comfortable with and able to voice chat? (this is not necessary, but encouraged)',
  'Timezone',
  'Minecraft username',
  'Discord username and tag',
  'What experience do you have with building?',
  'Talk about your building style a bit.',
  'Attach some pictures of your past builds.',
  'Tell us a story (yes, this is open-ended, you can write about whatever you want)',
  'Tell us about yourself. Introvert or extrovert? What\'s your opinion on the meaning of life? What\'s your favourite tea brand?']

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function sendWebhookMessages(messages) {
  const webhook = loadFile("webhook.txt");
  const request = new XMLHttpRequest();
  request.open("POST", webhook);
  request.setRequestHeader('Content-type', 'application/json');

  for (var i = 0; i < messages.length; i++) {
    const params = {
      username: "Idra\'s Minion",
      avatar_url: "",
      content: messages[i] + "_ _"
    }
    request.send(JSON.stringify(params));
    sleep(10) // let's not get API blocked shall we
  }
}

function sendBuilderMessage() {
  var applicationComplete = true;

  for (var i = 0; i < variableIDs.length; i++) {
    element = document.getElementsByName(variableIDs[i])[0];
    if (element.value == "") {
      element.style.backgroundColor = "#602A27";
      applicationComplete = false;

    } else {
      element.style.backgroundColor = "#161616";
    }
  }

  const errorContainer = document.getElementById("errorContainer");
  const successContainer = document.getElementById("successContainer");

  if (!applicationComplete) {
    if (errorContainer.children.length == 0) {
      const errorParagraph = document.createElement("p");
      const errorText = document.createTextNode("You didn't answer all the questions. Make sure you answer all of them, then try again!");
      errorParagraph.appendChild(errorText);
      errorContainer.appendChild(errorParagraph);
    }
    document.getElementsByName("submit-button")[0].style.backgroundColor = "#602A27"
    return;
  }
  
  errorContainer.remove();

  const successParagraph = document.createElement("p");
  const successText = document.createTextNode("Application submitted!");
  successParagraph.appendChild(successText);
  successContainer.appendChild(successParagraph);

  document.getElementsByName("submit-button")[0].style.backgroundColor = "#161616"

  var date = new Date();
  var dateFormatted = date.toLocaleString();
  var messages = ["```BUILDER APPLICATION - " + dateFormatted + "```"]

  for (var i = 0; i < variableIDs.length; i++) {
    var message = "**" + variableNames[i] + "**" + "\n";
    let elements = document.getElementsByName(variableIDs[i]);
    if (elements.length == 1) {
      message += elements[0].value + "\n\n";

    } else {
      for (var e = 0; e < elements.length; e++) {
        if (elements[e].checked) {
          message += elements[e].value + "\n\n";
        }
      }
    }
    messages.push(message);
  }

  sendWebhookMessages(messages);
  window.open("application-builder-submitted");
}