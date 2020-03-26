export const CheckLoggedIn = (sucsess, failed) => {
  // console.log(`Checking if logged in`)
  localStorage.setItem('loggedin', false)
  let account = JSON.parse(localStorage.getItem('account'))
  if (account.id) {
    let expires = localStorage.getItem('expires')
    if (new Date(expires) > new Date()) {
      localStorage.setItem('loggedin', true)
    }
  }
  if (localStorage.getItem('loggedin') === 'true') {
    // router.push({ name: 'Timer' })
    // console.info('Logged In')
    sucsess()
  } else {
    console.error('Not Logged in')
    failed()
  }
}
