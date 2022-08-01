function pushCustomer(customer)
{
    const elem = document.createElement('div')
    elem.classList.add('customer')
    const img = document.createElement('img')
    const picture = customer.picture
    img.src = picture.large || picture.medium || picture.thumbnail;   // prefer largest image
    elem.appendChild(img)
    document.querySelector('#customers').appendChild(elem)
}

customers.forEach(pushCustomer)
