function hangmanController(mainSvc){
    var vm = this;

    mainSvc.getPosts().then(function(response){

        vm.posts = response.data;
    })
}

app.component('hangman',{

    templateUrl: './hangman.component.html',
    styleUrls: ['./hangman.component.css']


})

var movies = [
    "BASHA", "CHANDRAMUKHI", "SIMHA", "GENTLEMAN", "YAMADONGA", "ARJUNREDDY", "NANNAKUPREMATHO", "SAHASAM", "ARUNDHATHI", "OKKADUUNNADU",
    "VEEDOKKADE", "TOLIPREMA", "VEDAM", "JAGADEKAVEERUDUATHILOKASUNDARI", "EVADESUBRAMANYAM", "EVARU", "RANGASTHALAM", "THADAKHA"
  ]
  
  var team = ["Sravan",
    "Anusha", "Akhila", "Hussain", "Venky", "Anitha", "Yaswanth", "Himaja", "Chinna", "Swathi"]
  
  var hints = [
    "Agnatha vasam lo unna hero,Hero Bombay lo pedda don,Shiva movie lo villain ei cinema lo villain",
    "Anni Bashallo remake aina cinema Telugu lo tamil nundi dub chesaru,Cinema lo oka heroine tamil hero wife,Hero Vineeth thala narikestharu",
    "Pedda hero ki chala years taruvatha padina hit,Hero double action,Hero doctor ayyi undi tappu chesina vallani narukkuntu velthadu",
    "Vidya meedha teesina cinema,Hero brahmin character,Shankar tho ei hero rendu movies chesadu rendu hit",
    "Telugu lo chala kalam taruvatha pauranika hit, Hero chanipoyi malli brathukuthadu, Hero ki cinema antha vadilinchukundam anukunna oka locket dorukuthune untundi",
    "Dookudu svabhavam unna doctor,Kukka pillalni heroine names tho pilusukuntadu hero,Telugu lo shiva lanti path breaking cinema",
    "Pedda hero chala rojula taruvatha kothaga try chesina getup,Villain and hero ball game aaduthadu,Music director ei cinema time lo tana nanna garini kolpthadu",
    "Hero heroine tho paatu nadiche actor ali character,Hero security guard ga pani chesthadu,Hero nidhi kosam vethukuthadu",
    "Heroine Oriented movie,Villain ni champataniki heroine prana tyagam chesthundi,Shiyaji shinde pakeer la natinchina cinema",
    "ChandraShekar yeleti Director,Bombay lo katha nadusthundi,Gopichand hero",
    "Smuggling meedha movie,Tamil nundi Telugu dub aina movie,Natudu prabhu chanipothadu",
    "Karunakaran movie,Tajmahal set vesina cinema,Chichubuddi velugu lo ammayi",
    "Multi starrer movie,Iddaru heroes chanipotharu,Pramuka heroine Vesya ga natincharu",
    "Andhra lo varadala time lo release ayyi hit aindi,Baby Shamili Shalini natinchina cinema,Athitha shakthulu unna deva kanya heroine",
    "Arjun Reddy hero ei cinema lo natinchadu,Oka hero interval block lo chanipothadu,Himalayas lo jarige cinema",
    "English and hindi remake,Movie oka murder mystery,Varusaga moodu thrillers teesi hit kottina hero",
    "DSP Musical hit,Out and out village background,Anasuya manchi role vesina movie",
    "Oka hero character police,Thaman is the music director,Andrea and tammana heroines"
  ]
  
  const movieHints = new Map();
  movieHints.set(movies[0], hints[0]);
  movieHints.set(movies[1], hints[1]);
  movieHints.set(movies[2], hints[2]);
  movieHints.set(movies[3], hints[3]);
  movieHints.set(movies[4], hints[4]);
  movieHints.set(movies[5], hints[5]);
  movieHints.set(movies[6], hints[6]);
  movieHints.set(movies[7], hints[7]);
  movieHints.set(movies[8], hints[8]);
  movieHints.set(movies[9], hints[9]);
  movieHints.set(movies[10], hints[10]);
  movieHints.set(movies[11], hints[11]);
  movieHints.set(movies[12], hints[12]);
  movieHints.set(movies[13], hints[13]);
  movieHints.set(movies[14], hints[14]);
  movieHints.set(movies[15], hints[15]);
  movieHints.set(movies[16], hints[16]);
  movieHints.set(movies[17], hints[17]);
  movieHints.set(movies[18], hints[18]);
  
  
  
  
  
  let answer = '';
  let maxWrong = 6;
  let mistakes = 0;
  let guessed = [];
  let wordStatus = null;
  
  
  function shuffle(shuff) {
  
    var currentIndex = shuff.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [shuff[currentIndex], shuff[randomIndex]] = [
        shuff[randomIndex], shuff[currentIndex]];
    }
    return shuff;
  }
  
  shuffle(movies);
  let j = 0;
  function randomWord() {
    //answer = movies[Math.floor(Math.random() * movies.length)];
  
  
    answer = movies[j];
    j++;
    if (j > movies.length) {
      const el = document.getElementById("nextmovie");
      el.addEventListener("click", congrats());
  
  
    }
  
  }
  
  
  
  
  function congrats() {
  
    if (score1 === score2) {
      let congratsmessage = '<div class="row">' +
        ' <button type="button" class="btn btn-outline-light" data-toggle="modal" data-target="#myModal0">End of Movies. Thank you!</button> </div>' +
        ' </div>'
      document.getElementById("nextmovie").innerHTML = congratsmessage;
    }
  
  
    if (score1 > score2) {
      let congratsmessage = '<div class="row">' +
        ' <button type="button" class="btn btn-outline-light" data-toggle="modal" data-target="#myModal1">End of Movies. Thank you!</button> </div>' +
        ' </div>'
      document.getElementById("nextmovie").innerHTML = congratsmessage;
    }
    if (score2 > score1) {
  
      let congratsmessage = '<div class="row">' +
        ' <button type="button" class="btn btn-outline-light" data-toggle="modal" data-target="#myModal2">End of Movies. Thank you!</button> </div>' +
        ' </div>'
      document.getElementById("nextmovie").innerHTML = congratsmessage;
    }
  }
  
  function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
      `
          <button
            class="btn btn-dark"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
          >
          ` + letter + `
          </button>
        `).join('');
  
  
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
  
  }
  function hintcard() {
    let hintcards =
      '<div class="card shadow mb-4">' +
      '<div class="card-header py-3">' +
      '<h6 class="m-0 font-weight-bold text-primary">Hint Section</h6>' +
      '</div> <div class="card-body">'
    document.getElementById("hints").innerHTML = hintcards + '<h6 id="clue"></h6>';
  }
  
  var hintCount = 0;
  function hint() {
  
  
    if (hintCount === 0) {
      for (let i = 0; i < movies.length; i++) {
        if (answer === movies[i]) {
          hintcard();
          var hint1 = movieHints.get(movies[i]);
          const temp = hint1.split(",")
          var hint1 = (temp[hintCount]);
          document.getElementById("clue").innerHTML = 'Hint 1: ' + hint1;
          //(document.getElementById('clue').innerHTML = ');
        }
      }
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
  
    }
    if (hintCount === 1) {
      for (let i = 0; i < movies.length; i++) {
        if (answer === movies[i]) {
          hintcard();
          var hint1 = movieHints.get(movies[i]);
          const temp = hint1.split(",")
          hint1 = (temp[hintCount - 1])
          var hint2 = (temp[hintCount]);
          document.getElementById("clue").innerHTML = 'Hint 1: ' + hint1 + '<br><br>' + 'Hint 2: ' + hint2;
          // +(document.getElementById('clue2').innerHTML=);
        }
      }
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  
  
    if (hintCount === 2) {
      for (let i = 0; i < movies.length; i++) {
        if (answer === movies[i]) {
          hintcard();
          var hint1 = movieHints.get(movies[i]);
          const temp = hint1.split(",")
          hint1 = (temp[hintCount - 2])
          hint2 = (temp[hintCount - 1])
          var hint3 = (temp[hintCount]);
          document.getElementById("clue").innerHTML = 'Hint 1: ' + hint1 + '<br><br>' + 'Hint 2: ' + hint2 + '<br><br>' + 'Hint 3: ' + hint3
        }
      }
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
    hintCount++;
  
  
  }
  
  function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  
  
  }
  
  function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
  }
  
  var score1 = 0;
  var score2 = 0;
  function checkIfGameWon() {
    if (wordStatus === answer) {
  
      document.getElementById('keyboard').innerHTML = "That's Correct!!!";
      if (j % 2 == 0) {
        score2++;
        document.getElementById('score2').innerHTML = score2;
      }
      if (j % 2 != 0) {
        score1++;
        document.getElementById('score1').innerHTML = score1;
      }
  
    }
  }
  
  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
      document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
  }
  
  function guessedWord() {
    //wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  
    let word = answer.split(''); // This will split the answer string and crate an array with all the characters in answer.
  
    const callbackFunction = (letter) => {
      return guessed.indexOf(letter) >= 0 ? letter : ' _ ';
    }
    let newArray = word.map(callbackFunction);
    wordStatus = newArray.join('');
  
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
  }
  
  function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
  }
  
  
  
  
  
  function teamlist() {
  
    const half = Math.ceil(team.length / 2);
    let teamone = team.slice(0, half);
    let teamtwo = team.slice(-half);
    let icon = '<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>'
    document.getElementById("team1").innerHTML = icon+ teamone[0] + '<div class="dropdown-divider"></div>'+icon + teamone[1] + '<div class="dropdown-divider"></div>'+icon + teamone[2] + '<div class="dropdown-divider"></div>' +icon+ teamone[3] + '<div class="dropdown-divider"></div>'+icon + teamone[4];
    document.getElementById("team2").innerHTML = icon+ teamtwo[0] + '<div class="dropdown-divider"></div>'+icon + teamtwo[1] + '<div class="dropdown-divider"></div>'+icon + teamtwo[2] + '<div class="dropdown-divider"></div>'+icon + teamtwo[3] + '<div class="dropdown-divider"></div>'+icon + teamtwo[4];
    
  }
  
  function shuffleteams() {
    shuffle(team);
    teamlist();
  }
  
  function timer() {
    var count = 10;
    var interval = setInterval(function () {
      document.getElementById('count').innerHTML = count;
      count--;
      if (count === -1) {
        clearInterval(interval);
        document.getElementById('count').innerHTML = 0;
        // or...
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'Time is up!!!';
      }
    }, 1000);
  }
  
  
  
  function reset() {
  
  
  
    mistakes = 0;
    hintCount = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';
  
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
    var hint = 0;
    if (hint === 0) {
      document.getElementById('clue').innerHTML = "";
      
    }
  }
  
  document.getElementById('maxWrong').innerHTML = maxWrong;
  
  randomWord();
  generateButtons();
  guessedWord();
  
  function datacard() {
    let flip = '<div class="flip-card-back" > <!--Card image--> <div class="view overlay"><img src="images\titanic.jpg" class="img-fluid" alt="">' +
      '<a href="#"><div class="mask rgba-white-slight"></div></a></div><!--Card content-->'
  
      + '<div  class="card-body"data-target="flipped card" style="border:0;" >'
      + '<!--Title--><h4 class="card-title">Card title 2</h4> <!--Text--><p class="card-text">This is the back</p>' +
      '<button class="btn btn-primary" id="btnflip2" >Back</button> </div></div>'
  
    document.getElementById("btnflip1").innerHTML = flip;
    const targetDiv = document.getElementById("third");
    const btn = document.getElementById("toggle");
    btn.onclick = function () {
      if (targetDiv.style.display !== "none") {
        targetDiv.style.display = "none";
      } else {
        targetDiv.style.display = "block";
      }
    };
  
  }
  
  
  
  
  
  