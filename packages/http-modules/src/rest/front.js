const fetchUser = async () => {
  // eslint-disable-next-line no-undef
  const { data: users } = await axios.get("/users")

  const list = document.querySelector("#list")

  const fragment = document.createDocumentFragment()
  Object.entries(users).forEach(([key, value]) => {
    const li = document.createElement("li")

    const span = document.createElement("span")
    span.textContent = value

    const edit = document.createElement("button")
    edit.textContent = "edit"
    edit.addEventListener("click", async () => {
      const name = prompt("Enter new name")
      if (!name) {
        return alert("Name is required")
      }
      try {
        // eslint-disable-next-line no-undef
        await axios.put(`/users/${key}`, { name })
        await fetchUser()
      } catch (e) {
        console.error(e)
      }
    })

    const remove = document.createElement("button")
    remove.textContent = "remove"
    remove.addEventListener("click", async () => {
      try {
        // eslint-disable-next-line no-undef
        await axios.delete(`/users/${key}`)
        await fetchUser()
      } catch (e) {
        console.error(e)
      }
    })

    li.appendChild(span)
    li.appendChild(edit)
    li.appendChild(remove)
    fragment.appendChild(li)
  })

  if (list) {
    list.innerHTML = ""
    list.appendChild(fragment)
  }
}

fetchUser()

const form = document.querySelector("#form")
form?.addEventListener("submit", async (e) => {
  e.preventDefault()
  const name = e.target.username.value
  if (!name) {
    return alert("Name is required")
  }

  try {
    // eslint-disable-next-line no-undef
    await axios.post(`/users`, { name })
    await fetchUser()
  } catch (e) {
    console.error(e)
  }

  e.target.username.value = ""
})
