const mainDiv = document.querySelector('#main')

async function fetchProduts(){
  try{
    const response = await fetch('https://dummyjson.com/products?limit=6')
    const data = await response.json()
    getProduct(data)
  }
  catch(e){
    console.log('ошибка')
  }
  finally{

  }
}

fetchProduts()

function getProduct(data){
  data.products.forEach(prod => {
    console.log(prod)
    createCart(prod)
  })
}

function createCart(prod){
  const mainContent = document.createElement('div')
  const divNewImege = document.createElement('div')
  const newImege = document.createElement('img')
  const divReyting = document.createElement('div')
  const numberRe = document.createElement('span')
  const description = document.createElement('h6')
  const discontDiv = document.createElement('div')
  const priceDiscont = document.createElement('span')
  const discont = document.createElement('span')
  const price =  document.createElement('p')
  const buttonBasket =  document.createElement('button')
  
  mainContent.className = 'content'
  divNewImege.className = 'content__divForImg'
  newImege.className = 'content__divForImg_img'
  divReyting.className = 'content__divReyting'
  numberRe.className = 'content__divReyting_numberRe'
  description.className = 'content__description'
  discontDiv.className = 'content__discontDiv'
  priceDiscont.className = 'content__discontDiv_priceDiscont'
  discont.className = 'content__discontDiv_discont'
  price.className = 'content__price'
  buttonBasket.className = 'content__btn'

  mainDiv.appendChild(mainContent)
    mainContent.appendChild(divNewImege)
      divNewImege.appendChild(newImege)
        newImege.src=prod.thumbnail
    mainContent.appendChild(divReyting)
      divReyting.append(createStarReiting(prod))
      divReyting.append(numberRe)
        numberRe.append(prod.stock)
    mainContent.appendChild(description)
      description.append(prod.description)
    mainContent.appendChild(discontDiv)
      discontDiv.append(priceDiscont)
        priceDiscont.innerText = calcTotalPrice(prod)
      discontDiv.append(discont)
        discont.innerText = `-${Math.floor(prod.discountPercentage)}%`
    mainContent.appendChild(price)
      price.innerText = `${prod.price} ₽`
    mainContent.appendChild(buttonBasket)
      buttonBasket.innerText = 'в корзину'
      buttonBasket.addEventListener( 'click', () => payProd(buttonBasket))
}

//цена без скидки
function calcTotalPrice(prod){
  const totalPrice = Math.floor( prod.price + prod.price / (100 - prod.discountPercentage) * prod.discountPercentage)
  return totalPrice
}

//звёзды рейтинга
function createStarReiting(prod){
  const rating = Math.ceil(prod.rating)

  const imgReyting = document.createElement('div')
  const imgS = document.createElement('img')
  const imgAll = document.createElement('img')
  // mainContent.className = 'content__divReyting'

  imgS.src = './src/img/star.svg'
  imgAll.src = './src/img/stars.svg'

  if(rating === 1){
    imgReyting.append(imgS)
    return imgReyting
  }
  else if( rating === 2){
    const img2 = imgS.cloneNode(true)
    imgReyting.append(imgS)
    imgReyting.append(img2)
    return imgReyting
  }
  else if( rating === 3){
    const img2 = imgS.cloneNode(true)
    const img3 = imgS.cloneNode(true)
    imgReyting.append(imgS)
    imgReyting.append(img2)
    imgReyting.append(img3)
    return imgReyting
  }
  else if( rating === 4){
    const img2 = imgS.cloneNode(true)
    const img3 = imgS.cloneNode(true)
    const img4 = imgS.cloneNode(true)
    imgReyting.append(imgS)
    imgReyting.append(img2)
    imgReyting.append(img3)
    imgReyting.append(img4)
    return imgReyting
  }
  else{
    imgReyting.append(imgAll)
    return imgReyting
  }
}

const basketPrice = document.querySelector('.basket__btn_price')
let basketStartPrice = 0
let countBasket = document.querySelector('.basket__btn_prod')
let countStartBasket = 0

function payProd(btn){

  const priceText =  btn.previousSibling.innerText
  const price = Number(priceText.substring(0, priceText.length - 2))

  basketStartPrice = basketStartPrice + price
  basketPrice.innerText = basketStartPrice

  countStartBasket += 1
  countBasket.innerText = countStartBasket
}


// function calcTotalPrice(){
//   const basketStartPrice = 0

//   // basketPrice
// }