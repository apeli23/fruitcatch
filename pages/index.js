import { useRef, useEffect } from 'react';


export default function Home() {
  const gameRef = useRef(undefined);
  const basketRef = useRef(undefined);
  const fruitsRef = useRef(undefined);



  var game, basket, fruits, basketLeft, basketBottom;

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
      fruitBottom -= 10;
      fruit.style.bottom = fruitBottom + "px";
      fruit.style.left = fruitLeft + "px";
    }
    setInterval(fallDownFruit, 20);
    // setTimeout(generateFruits, 2000);
  }

  return (
    <>
      <button onClick={generateFruits}>click</button>
      <div ref={gameRef} className="game">
        <div ref={fruitsRef} className="fruits" id="fruits" ></div>
        <div className="dangerline"></div>
        <div ref={basketRef} className="basket"></div>
      </div>
    </>
  )
}
