import { useRef, useEffect } from 'react';


export default function Home() {
  const gameRef = useRef(undefined);
  const basketRef = useRef(undefined);
  const fruitsRef = useRef(undefined);



  var game, basket, fruits, basketLeft, basketBottom;

  let score = 0;

  useEffect(() => {
    game = gameRef.current;
    basket = basketRef.current;
    fruits = fruitsRef.current;
    basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
    basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"));

    generateFruits();
    console.log('first')
    document.addEventListener("keydown", control)
  });

  const moveBasketLeft = () => {
    if (basketLeft > 0) {
      basketLeft -= 15;
      basket.style.left = basketLeft + "px";
    }
  }

  const moveBasketRight = () => {
    if (basketLeft < 620) {
      basketLeft += 15;
      basket.style.left = basketLeft + "px";
    }
  }

  const control = (e) => {
    if (e.key == "ArrowLeft") {
      moveBasketLeft();
    }
    if (e.key == "ArrowRight") {
      moveBasketRight();
    }
  }

  const generateFruits = () => {
    var fruitBottom = 470;
    var fruitLeft = Math.floor(Math.random() * 620);
    var fruit = document.createElement('div');
    fruit.setAttribute("class", "fruit");
    fruits.appendChild(fruit);
    console.log(fruit)
    function fallDownFruit() {
      if (
        fruitBottom < basketBottom + 50 &&
        fruitBottom > basketBottom &&
        fruitLeft > basketLeft - 30 &&
        fruitLeft < basketLeft + 80
      ) {
        fruits.removeChild(fruit);
        clearInterval(fallInterval);
        score++;
      }
      if (fruitBottom < basketBottom) {
        alert("Game over! Your Score is " + score);
        clearInterval(fallInterval);
        clearTimeout(fruitTimeout);
        location.reload();
      }
      fruitBottom -= 5;
      fruit.style.bottom = fruitBottom + "px";
      fruit.style.left = fruitLeft + "px";
    }


    var fallInterval = setInterval(fallDownFruit, 20);
    var fruitTimeout = setTimeout(generateFruits, 2000);
  }

  return (
    <>
      <nav>
        <h1>Javascript FruitCatch Game</h1>
      </nav>
      <div className="container">
        <div className="blurBg"></div>
        <div className='=row'>
          <div className='column'>
            <div ref={gameRef} className="game">
              <div className="background">
                <div className="blur"></div>
                <div ref={fruitsRef} className="fruits" id="fruits" ></div>
                <div className="dangerline"></div>
                <div ref={basketRef} className="basket"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
