let isAdmin = false

document.querySelector('#login-link')
    .addEventListener('click', e => {
        e.preventDefault()
        const modal = document.querySelector('#login-modal .border')
        if (modal.style.display === "block")
        {
            return
        }
        modal.style.display = 'block'
        modal.style.transform = 'translateY(-100%)'
        const now = Date.now()
        const interval = setInterval(
            () => modalAnimate(modal, -100, 0, now, now + 200,
            () => clearInterval(interval)), 10)
    })

document.querySelector('#login-modal form')
    .addEventListener('submit', e => {
        e.preventDefault()
        const username = document.querySelector('#login-modal form .user')
        const password = document.querySelector('#login-modal form .pass')
        if (username.value === 'admin' && password.value === 'admin')
        {
            isAdmin = true
            refreshCustomers()
        }
        else
        {
            isAdmin = false
            refreshCustomers()
        }
        const loginNav = document.querySelector('#login-nav')
        const userNav = document.querySelector('#user-nav')
        if (password.value === 'admin' || username.value !== 'admin') {
            loginNav.style.display = 'none'
            userNav.style.display = 'block'
            document.querySelector('#user-nav a').innerText = username.value
        } else {
            loginNav.style.display = 'block'
            userNav.style.display = 'none'
        }
        const modal = document.querySelector('#login-modal .border')
        const now = Date.now()
        const interval = setInterval(
            () => modalAnimate(modal, 0, -100, now, now + 200,
            () => {
                clearInterval(interval)
                modal.style = ''
            }), 10)
    })

function modalAnimate(modal, start, end, startTime, endTime, callback) {
    let now = Date.now()
    if (now >= endTime)
    {
        now = endTime
    }
    let t = (now - startTime) / (endTime - startTime)
    let v = start + (end - start) * t
    modal.style.transform = `translateY(${v}%)`
    if (now >= endTime)
    {
        modal.style.transform = ''
        if (callback)
        {
            callback()
        }
    }
    // v = start + (end - start) * t
}