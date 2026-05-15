import axios from "axios"
import React, { useEffect, useState } from "react"
import { APIHost } from "../../main"
import "./style.css"

import { useNavigate } from "react-router-dom"

export interface CategoryRequest {
    kind: string
    mid: string
}

function FormCategory(prop: { id?: string, onSuccess?: () => void }) {

    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState("")

    const getInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const addNewCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!inputValue.trim()) {
            alert("Preencha todos os campos!")
            return
        }

        const req: CategoryRequest = {
            kind: inputValue,
            mid: "ok"
        }

        if (prop.id) {
            axios.put(`${APIHost}categoria/${prop.id}/update`, req)
                .then(() => {
                    alert("categoria foi editada com sucesso!")
                    prop.onSuccess?.()
                    navigate("/category")
                })
                .catch(error => alert(error))

        } else {
            axios.post(`${APIHost}categoria`, req)
                .then(() => {
                    alert("categoria foi cadastrada com sucesso!")
                    setInputValue("")
                    prop.onSuccess?.()
                })
                .catch(error => alert(error))
        }
    }

    useEffect(() => {
        if (!prop.id) return

        axios.get(`${APIHost}categoria/${prop.id}/find`)
            .then(response => {
                setInputValue(response.data.kind)
            })
            .catch(error => console.log(error))

    }, [prop.id])

    return (
        <form className="form-category" onSubmit={addNewCategory}>
            <fieldset>
                <legend>{prop.id ? "Edit Category" : "Register Category"}</legend>

                <label htmlFor="category">Kind</label>

                <input
                    type="text"
                    id="category"
                    placeholder="kind of category"
                    required
                    onChange={getInputValue}
                    value={inputValue}
                />

                <button type="submit">
                    {prop.id ? "Edit" : "Send"}
                </button>
            </fieldset>
        </form>
    )
}

export default FormCategory