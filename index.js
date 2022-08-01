const displayTitles = false

function capitalize(text)
{
    // vvv NO! (strings are indexed as UTF-16, so this can split Unicode codepoints)
    // return text[0].toUpperCase() + text.substring(1)

    // instead, destructuring a string gives codepoints
    if (!text.length)
        return ''
    const chars = [...text]
    return chars[0].toUpperCase() + chars.slice(1).join('')
}

function formatName(name)
{
    let text = `${capitalize(name.first)} ${capitalize(name.last)}`
    if (displayTitles && name.title)
        text = `${capitalize(name.title)}. ${text}`
    return text
}

function pushCustomer(customer)
{
    const elem = document.createElement('div')
    elem.classList.add('customer')
    const img = document.createElement('img')
    const picture = customer.picture
    img.src = picture.large || picture.medium || picture.thumbnail;   // prefer largest image
    elem.appendChild(img)
    const name = document.createElement('div')
    name.classList.add('name')
    name.innerText = formatName(customer.name)
    elem.appendChild(name)
    document.querySelector('#customers').appendChild(elem)
}

customers.forEach(pushCustomer)
