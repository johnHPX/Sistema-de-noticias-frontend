import axios from "axios"
import React, { useState } from "react"
import { APIHost } from "../../main"
import { CategoryData } from "../../pages/registerCategory"
import "./style.css"

function FormNews(prop: { categoryData: CategoryData }) {

    const [count, setCount] = useState<number[]>([0])
    const [titleInputValue, setTitleInputValue] = useState("")
    const [categoryInputValue, setCategoryInputValue] = useState("")
    const [subTitleInputValue, setSubTitleInputValue] = useState<string[]>([""])
    const [textInputValue, setTextInputValue] = useState<string[]>([""])

    type events = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

    // pega os valores dos inputs e atribui nas variaveis de estado
    const getValueInputChange = (event: React.ChangeEvent<events>, index: number) => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value

        if (name == "titulo") {
            setTitleInputValue(value)
        } else if (name == "categorias") {
            setCategoryInputValue(value)
        } else if (name == "subTitulo") {
            subTitleInputValue[index as number] = value
            setSubTitleInputValue([...subTitleInputValue])
        } else if (name == "texto") {
            textInputValue[index as number] = value
            setTextInputValue([...textInputValue])
        }
    }

    // adiciona mais inputs de conteudo
    const addNewContent = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setCount(prevC => [...prevC, count[count.length - 1] + 1])
    }

    // trata os inputs e faz a requisição para api 
    const addNewNews = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (titleInputValue == "" && categoryInputValue == "" && subTitleInputValue.length == 0 && textInputValue.length == 0) {
            alert("prencha todos os dados!")
            return
        }

        interface content {
            subTitulo: string,
            texto: string
        }

        interface news {
            titulo: string,
            conteudos: content[]
            categoria: string,
            mid: string
        }

        // subtitulos e texto tem o mesmo tamanho, logo só é necessario um loop
        let content: content[] = []
        subTitleInputValue.forEach((v, i) => {
            let o: content = {
                subTitulo: v,
                texto: textInputValue[i]
            }
            content.push(o)
        })


        const newsRequest: news = {
            titulo: titleInputValue,
            conteudos: content,
            categoria: categoryInputValue,
            mid: "ok"
        }

        axios.post(`${APIHost}noticia`, newsRequest)
            .then(response => {
                alert("o Cadastro foi Realizado Com Sucesso!")
                console.log(response)
                window.location.href = "/"
            })
            .catch(error => {
                alert("Erro ao Cadastrar!")
                console.log(error)
            });
    }

    return (
        <form className="form-news" onSubmit={addNewNews}>
            <fieldset>
                <legend>Cadastro de Notícia</legend>
                <div className="division1">
                    <label>
                        <p>Titulo</p>
                        <input type="text" name="titulo" id="titulo" placeholder="Titulo" required onChange={(e) => getValueInputChange(e, 0)} />
                    </label>
                    <label>
                        <p>Categoria</p>
                        <select name="categorias" id="categorias" required onChange={(e) => getValueInputChange(e, 0)}>
                            <option value="notSelect">Selecione uma Categoria</option>
                            {
                                prop.categoryData.categorias.map(value => {
                                    return (
                                        <option key={value.id} value={value.kind}>{value.kind}</option>
                                    )
                                })
                            }
                        </select>
                    </label>
                    <button type="submit" className="send">Send</button>
                </div>
                <div className="division2">
                    {
                        count.map((_, index) => {
                            return (
                                <div key={index}>
                                    <label>
                                        <p>SubTitulo</p>
                                        <input type="text" id="subTitulo" name="subTitulo" placeholder="SubTitulo" required onChange={(e) => getValueInputChange(e, index)} />
                                    </label>
                                    <textarea name="texto" id="texto" onChange={(e) => getValueInputChange(e, index)}></textarea>
                                </div>
                            )
                        })
                    }
                </div>
                <button className="addNewContent" onClick={addNewContent}>adicionar mais conteúdo</button>
            </fieldset>
        </form>
    )
}

export default FormNews