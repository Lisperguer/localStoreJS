//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//Event Listeners
eventListeners();
function eventListeners(){
  formulario.addEventListener("submit", agregarTweet);

  //Cuando el documento esté listo

  document.addEventListener('DOMContentLoaded',() => {
    //Si marca null (porque se eliminaron los tweets del local storage), asigna un array vacío
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    crearHTML();
  })
}

//Funciones
function agregarTweet(e){
  e.preventDefault();
  const tweet = document.querySelector('#tweet').value;
  console.log(tweet);

  if (tweet === ''){
    mostrarError('Un mensaje no puede ir vacio')
    return; //evita que se ejecute lo que viene fuera del if. Este return funciona dentro del if solamente xq está dentro de una función
  }

  //Creamos un objeto de tweet para que tenga un identificador unico

  const tweetObj = {
    id: Date.now(),
    tweet: tweet
  }
  //Agregando tweet si no está vació al arreglo de tweet

  tweets = [...tweets, tweetObj ];

  crearHTML();

  // Reiniciar el formulario
  formulario.reset(); 
}

function mostrarError(error){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  //Lo insertamos en el contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);

  //Que el mensaje dure solo 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}


function crearHTML(){
  limpiarHTML();

  if(tweets.length > 0){
    //Agregar el boton eliminar

    tweets.forEach( tweet => {
      const btnEliminar  = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerText = "X";
      btnEliminar.onclick= () => {
        //Se hace de esta forma porque a borrarTweet hay que entregarle parametros/indicarle qué tweet es
        borrarTweet(tweet.id);
      }
      // Crea el HTML
      const li = document.createElement('li');

      //Añadir texto
      li.innerText = tweet.tweet;

      //Asignarlo al boton

      li.appendChild(btnEliminar);

      // Asignar el boton de eliminar
      listaTweets.appendChild(li);
    })
  } 
  sincronizarStorage();
}

function limpiarHTML(){
  while( listaTweets.firstChild ){
    listaTweets.removeChild(listaTweets.firstChild);
  };
}


//Agregar los Tweets actualizar a Local Storage
function sincronizarStorage(){
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id){
  tweets = tweets.filter(tweet => tweet.id !== id);
  console.log(tweets)
  crearHTML();
}