import axios from "axios"
import React, { useEffect, useState } from "react"
import { CategoryData } from "../../pages/registerCategory"
import "./style.css"


interface Content {
    cid: string
    subTitulo: string
    texto: string
}

interface News {
    id: string
    titulo: string
    conteudos: Content[]
    categoria: string
}


function FormNewsEdit(prop: { categoryData: CategoryData, id: string }) {

    const [count, setCount] = useState<number[]>([0])
    const [titleInputValue, setTitleInputValue] = useState("")
    const [categoryInputValue, setCategoryInputValue] = useState("")
    const [subTitleInputValue, setSubTitleInputValue] = useState<string[]>([""])
    const [textInputValue, setTextInputValue] = useState<string[]>([""])
    const [cidsValues, setCIDsValues] = useState<string[]>([""])

    useEffect(() => {

        axios.get(`http://localhost:4083/noticia/${prop.id}/find?mid=ok`)
            .then(response => {
                setTitleInputValue(response.data.titulo)
                setCategoryInputValue(response.data.categoria)

                response.data.conteudos.map((value: { cid: string, subTitulo: string; texto: string }, index: number) => {
                    cidsValues[index] = value.cid
                    setCIDsValues([...cidsValues])
                    subTitleInputValue[index] = value.subTitulo
                    setSubTitleInputValue([...subTitleInputValue])
                    textInputValue[index] = value.texto
                    setTextInputValue([...textInputValue])
                    count[index] = count.length + 1
                    setCount([...count])
                })

            })
            .catch(error => console.log(error))
    }, [])

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


    // trata os inputs e faz a requisição para api 
    const addNewNews = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(cidsValues)
        console.log(subTitleInputValue)
        console.log(textInputValue)

        if (titleInputValue == "" && categoryInputValue == "" && subTitleInputValue.length == 0 && textInputValue.length == 0) {
            alert("prencha todos os dados!")
            return
        }

        interface content {
            cid: string
            subTitulo: string,
            texto: string
        }

        interface news {
            titulo: string,
            conteudos: content[]
            categoria: string,
            mid: string
        }


        let content: content[] = []
        subTitleInputValue.forEach((v, i) => {
            let o: content = {
                cid: cidsValues[i],
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

        axios.put(`http://localhost:4083/noticia/${prop.id}/update`, newsRequest)
            .then(response => {
                alert("A atualização foi realizada com sucesso")
                console.log(response)
                window.location.href = `/news/${prop.id}`
            })
            .catch(error => {
                alert("Erro ao atualizar!")
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
                        <input type="text" name="titulo" id="titulo" placeholder="Titulo" required onChange={(e) => getValueInputChange(e, 0)} value={titleInputValue} />
                    </label>
                    <label>
                        <p>Categoria</p>
                        <select name="categorias" id="categorias" required onChange={(e) => getValueInputChange(e, 0)} value={categoryInputValue}>
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
                                        <input type="text" id="subTitulo" name="subTitulo" placeholder="SubTitulo" required onChange={(e) => getValueInputChange(e, index)} value={subTitleInputValue[index]} />
                                    </label>
                                    <textarea name="texto" id="texto" onChange={(e) => getValueInputChange(e, index)} value={textInputValue[index]}></textarea>
                                </div>
                            )
                        })
                    }
                </div>
            </fieldset>
        </form>
    )
}

export default FormNewsEdit