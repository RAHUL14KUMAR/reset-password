import React from'react'

const dataPass={
    id:'17678',
    name:'divyani singh'
}

const Context=React.createContext(dataPass)

const Provider=Context.Provider
const Consumer=Context.Consumer
export{Provider,Consumer}

export default Context