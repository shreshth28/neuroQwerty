var list=['q','u','e','n','o','s','f','i','a','b'];
var time=[];
var counter=0;
var intercept=-0.992804564722825;
var coef=[13.63019427,-0.1699619,-0.62357077,2.63394068,3.24283615,2.9585586,-8.05233592,-0.95619403,-0.38968105,3.51018856];
var t1;
var t0;
var prob=0;
var questions = [
  {question:"Press Q"},
  {question:"Press U"},
  {question:"Press E"},
  {question:"Press N"},
  {question:"Press O"},
  {question:"Press S"},
  {question:"Press F"},
  {question:"Press I"},
  {question:"Press A"},
  {question:"Press B"}
]

/**********

  !!!!!
  New Version: https://codepen.io/arcs/pen/rYXrNQ
  !!!!!
  
  Credits for the design go to XavierCoulombeM
  https://dribbble.com/shots/2510592-Simple-register-form
  
  This Pen uses no libraries except fonts and should 
  work on all modern browsers
  
  The answers are stored in the `questions` array
  with the key `value`. 

 **********/

;(function(){

  var tTime = 100  // transition transform time from #register in ms
  var wTime = 200  // transition width time from #register in ms
  var eTime = 1000 // transition width time from inputLabel in ms

  // init
  // --------------
  var position = 0

  putQuestion()

  function startTime(){
    t0 = performance.now();
  }
  function endTime(){
    t1 = performance.now();
  }
  progressButton.addEventListener('click', validate)

  inputField.addEventListener('keydown',startTime);

  inputField.addEventListener('keyup', function(e){
    transform(0, 0) // ie hack to redraw
    if(counter==0&&e.keyCode==81) 
    {
      validate()
      
    }
    else if(counter==1&&e.keyCode==85)
    {
      validate()
    }
    else if(counter==2&&e.keyCode==69)
    {
      validate()
    }
    else if(counter==3&&e.keyCode==78)
    {
      validate()
    }
    else if(counter==4&&e.keyCode==79)
    {
      validate()
    }
    else if(counter==5&&e.keyCode==83)
    {
      validate()
    }
    else if(counter==6&&e.keyCode==70)
    {
      validate()
    }
    else if(counter==7&&e.keyCode==73)
    {
      validate()
    }
    else if(counter==8&&e.keyCode==65)
    {
      validate()
    }
    else if(counter==9&&e.keyCode==66)
    {
      validate()
    }
    else{
    }
  })

  // functions
  // --------------

  // load the next question
  function putQuestion() {
    inputLabel.innerHTML = questions[position].question
    inputField.value = ''
    inputField.type = questions[position].type || 'text'  
    inputField.focus()
    showCurrent()
  }
  


  // when all the questions have been answered
  function done() {
    for(var mer=0;mer<10;mer++){
      prob+=time[mer]*coef[mer]/1000;
    }  
    prob+=intercept;
    // remove the box if there is no next question
    register.className = 'close'
    
    // add the h1 at the end with the welcome text
    var h1 = document.createElement('h1')
    if(prob>0){

    h1.appendChild(document.createTextNode('Your Parkinson neuroQWERTY index is ' + prob + ' ! '))
    if(prob>0.8){
      h1.appendChild(document.createTextNode('You might be suffering from Parkinsons Disease'))
    }
    else{
      h1.appendChild(document.createTextNode('You are perfectly alright :D'))
    }
    
    
    }
    else{
      h1.appendChild(document.createTextNode('Your Parkinson neuroQWERTY index is ' + 0.132 + ' ! '))
        h1.appendChild(document.createTextNode('You are perfectly alright :D'))
    }
    setTimeout(function() {
      register.parentElement.appendChild(h1)     
      setTimeout(function() {h1.style.opacity = 1}, 50)
    }, eTime)
    
  }

  // when submitting the current question
  function validate() {

    endTime();
    time.push(t1-t0);
    console.log(time);
    counter+=1;
    // set the value of the field into the array
    questions[position].value = inputField.value

    // check if the pattern matches
  
  ok(function() {
      
      // set the progress of the background
      progress.style.width = ++position * 100 / questions.length + 'vw'

      // if there is a new question, hide current and load next
      if (questions[position]) hideCurrent(putQuestion)
      else hideCurrent(done)
             
    })

  }

  // helper
  // --------------

  function hideCurrent(callback) {
    inputContainer.style.opacity = 0
    inputProgress.style.transition = 'none'
    inputProgress.style.width = 0
    setTimeout(callback, wTime)
  }

  function showCurrent(callback) {
    inputContainer.style.opacity = 1
    inputProgress.style.transition = ''
    inputProgress.style.width = '100%'
    setTimeout(callback, wTime)
  }

  function transform(x, y) {
    register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
  }

  function ok(callback) {
    register.className = ''
    setTimeout(transform, tTime * 0, 0, 10)
    setTimeout(transform, tTime * 1, 0, 0)
    setTimeout(callback,  tTime * 2)
  }

  function wrong(callback) {
    register.className = 'wrong'
    for(var i = 0; i < 6; i++) // shaking motion
      setTimeout(transform, tTime * i, (i%2*2-1)*20, 0)
    setTimeout(transform, tTime * 6, 0, 0)
    setTimeout(callback,  tTime * 7)
  }

}())