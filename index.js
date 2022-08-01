const displayTitles = false

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

function capitalize(text)
{
    if (!text.length)
    {
        return ''
    }

    // vvv NO! (strings are indexed as UTF-16, so this can split Unicode codepoints)
    // return text[0].toUpperCase() + text.substring(1)

    // instead, destructuring a string gives codepoints
    const chars = [...text]
    return chars[0].toUpperCase() + chars.slice(1).join('')
}

function formatDate(date)
{
    if (typeof(date) === 'string')
    {
        date = new Date(date)
    }
    return `${months[date.getMonth()].substring(0, 3)} ${date.getDate()} ${date.getFullYear()}`
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
    const picture = customer.picture
    let child = document.createElement('img')
    child.src = picture.large || picture.medium || picture.thumbnail;   // prefer largest image
    elem.appendChild(child)
    child = document.createElement('div')
    child.classList.add('name')
    child.classList.add('mbq')
    child.innerText = formatName(customer.name)
    elem.appendChild(child)
    if (customer.email)
    {
        child = document.createElement('div')
        child.classList.add('contact-info')
        child.classList.add('mbh')
        child.innerText = customer.email
        elem.appendChild(child)
    }
    if (customer.location)
    {
        const location = customer.location
        if (location.street)
        {
            const street = location.street
            child = document.createElement('div')
            child.innerText = `${street.number} ${street.name}`
            elem.appendChild(child)
        }
        child = document.createElement('div')
        const stateCode = (usStates.find(x => x.name === location.state)
            || {abbreviation: location.state})
            .abbreviation
        child.classList.add('mbh')
        child.innerText = `${location.city} ${stateCode} ${location.postcode}`
        elem.appendChild(child)
    }
    if (customer.dob)
    {
        child = document.createElement('div')
        child.innerText = `DOB: ${formatDate(customer.dob.date)}`
        elem.appendChild(child)
    }
    if (customer.registered)
    {
        child = document.createElement('div')
        child.innerText = `Customer since: ${formatDate(customer.registered.date)}`
        elem.appendChild(child)
    }
    document.querySelector('#customers').appendChild(elem)
}

customers.forEach(pushCustomer)
