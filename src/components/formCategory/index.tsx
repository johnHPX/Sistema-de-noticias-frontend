import axios from "axios"
import React, { useEffect, useState } from "react"
import "./style.css"

export interface CategoryRequest {
    kind: string
    mid: string
}

function FormCategory(prop: { id?: string }) {

    const [inputValue, setInputValue] = useState("")

    const getInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setInputValue(event.target.value)
        console.log(event.target.value)
    }

    const addNewCategory = (event: React.FormEvent<HTMLFormElement>) => {
        if (inputValue != "") {
            const req: CategoryRequest = {
                kind: inputValue,
                mid: "ok"
            }

            if (prop.id) {
                event.preventDefault()
                axios.put(`http://localhost:4083/categoria/${prop.id}/update`, req)
                    .then(response => {
                        console.log(response)
                        alert("categoria foi editada com sucesso!")
                        window.location.href = "/category"
                    })
                    .catch(error => {
                        alert(error)
                    })
            } else {
                axios.post("http://localhost:4083/categoria", req)
                    .then(response => {
                        console.log(response)
                        alert("categoria foi cadastrada com sucesso!")
                    })
                    .catch(error => {
                        alert(error)
                    })
            }

        } else {
            alert("Preencha todos os campos!")
        }
    }

    if (prop.id) {

        useEffect(() => {
            axios.get(`http://localhost:4083/categoria/${prop.id}/find`)
                .then(response => {
                    setInputValue(response.data.kind)
                })
                .catch(error => {
                    console.log(error)
                })
        }, [])


        return (
            <form className="form-category" onSubmit={addNewCategory}>
                <fieldset>
                    <legend>Edit Category</legend>
                    <label htmlFor="category">Kind</label>
                    <input type="text" id="category" placeholder="kind of category" required onChange={getInputValue} value={inputValue} />
                    <button type="submit">Edit</button>
                </fieldset>
            </form>
        )
    } else {
        return (
            <form className="form-category" onSubmit={addNewCategory}>
                <fieldset>
                    <legend>Register Category</legend>
                    <label htmlFor="category">Kind</label>
                    <input type="text" id="category" placeholder="kind of category" required onChange={getInputValue} />
                    <button type="submit">Send</button>
                </fieldset>
            </form>
        )
    }


}

export default FormCategory