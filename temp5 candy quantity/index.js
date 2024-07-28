let api = "https://crudcrud.com/api/25632531f0ad44be9da80107c615f44b"+"/storeCandies"

function handleSubmit(e){
    e.preventDefault()
    let data = {
        name:e.target.name.value,
        description:e.target.description.value,
        price:e.target.price.value,
        quantity:e.target.quantity.value,
    }
    console.log("data ",data)

    showOnScreen(data)
    axios.post(api,data)
    .then((d)=>console.log("data added"))
    .catch((e)=>console.log("error",e))

}

function showOnScreen(detail){
    let listLocation = document.querySelector('ul')

    let item = document.createElement('li')
    item.className = "listItem"

    let spanN = document.createElement('span')
    spanN.textContent = detail.name
    spanN.className = "span-name"
    let spanD = document.createElement('span')
    spanD.textContent = detail.description
    spanD.className = "span-description"
    let spanP = document.createElement('span')
    spanP.textContent = detail.price
    spanP.className = "span-price"
    let spanQ = document.createElement('span')
    spanQ.textContent = detail.quantity
    spanQ.className = "span-quantity"

    if(detail._id)
        item.id = detail._id


    let btn1 = document.createElement('button')
    btn1.textContent = "Buy 1"

    let btn2 = document.createElement('button')
    btn2.textContent = "Buy 2"
    
    let btn3 = document.createElement('button')
    btn3.textContent = "Buy 3"

    item.appendChild(spanN)
    item.appendChild(spanD)
    item.appendChild(spanP)
    item.appendChild(spanQ)
    item.appendChild(btn1)
    item.appendChild(btn2)
    item.appendChild(btn3)

    listLocation.appendChild(item)


    btn1.addEventListener('click',(event)=>{
        let outerTag = event.target.parentElement     
        updateQuantity(outerTag,1)
    })
    btn2.addEventListener('click',(event)=>{
        let outerTag = event.target.parentElement     
        updateQuantity(outerTag,2)
    })
    btn3.addEventListener('click',(event)=>{
        let outerTag = event.target.parentElement     
        updateQuantity(outerTag,3)
    })
}

function updateQuantity(outerTag,remove){
    let quantityTag = outerTag.querySelector('.span-quantity')
    let nameTag = outerTag.querySelector('.span-name')
    let priceTag = outerTag.querySelector('.span-price')
    let desTag = outerTag.querySelector('.span-description')

    
    let num = quantityTag.innerText-remove
    if(num<0){
        num=0
    }
    console.log("new num ",num)
    quantityTag.textContent = num
    
    
    let idToUpdate = outerTag.id
    
    let data = {
        name:nameTag.innerText,
        price:priceTag.innerText,
        description:desTag.innerText,
        quantity:num
    }

    axios.put(api+"/"+idToUpdate,data).then((d)=>{
        console.log("updated")
    }).catch((e)=>{
        console.log("error ",e)
    })
}

document.addEventListener('DOMContentLoaded',()=>{
    axios.get(api).then((d)=>{
        let details = d.data
        console.log("details ",details)
        details.forEach(element => {
            showOnScreen(element)
        });
    })
})