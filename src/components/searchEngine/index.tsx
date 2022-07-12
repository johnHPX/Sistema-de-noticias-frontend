import React, { useState } from "react"
import { DataNews } from "../../pages/home"
import "./style.css"
import axios from "axios"
import { CategoryData } from "../../pages/registerCategory"

export type State = React.Dispatch<React.SetStateAction<DataNews>>

//SearchEngine componente para buscar dados
function SearchEngine(prop: { textInput?: string, urlAPI?: string, dataAPI?: State }) {
    const [inputValue, setInputValue] = useState("")

    const getInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const value = event.target.value
        if (value.length == 0) {
            axios.get(prop.urlAPI as string).then((response) => {
                prop.dataAPI?.(response.data)
            })
        }
        setInputValue(value)
    }

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (inputValue.length > 0) {
            axios.get(`http://localhost:4083/noticias/${inputValue}/list?mid=ok`).then((response) => {
                prop.dataAPI?.(response.data)
            })
        }
    }

    return (
        <form className="form-search" onSubmit={onSubmitForm}>
            <input type="search" id="search" placeholder={prop.textInput} onChange={getInputChange} />
            <button type="submit"><img src="https://img.icons8.com/avantgarde/100/000000/experimental-search-avantgarde.png" /></button>
        </form>
    )
}

export default SearchEngine