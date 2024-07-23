document.getElementById('asset-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const currency = document.getElementById('currency').value
    const amount = document.getElementById('amount').value

    const response = await fetch('/api/add-assets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currency, amount })
    })

    const data = await response.json()
    alert(data.message)
})

document.getElementById('withdraw-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const amount = document.getElementById('withdraw-amount').value
    const address = document.getElementById('withdraw-address').value

    const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, address })
    })

    const data = await response.json()
    alert(data.message)
})
