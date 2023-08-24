const generarToken = () => {
    return Math.random().toString(32).slice(2,8)+"-"+Math.random().toString(32).slice(2,8)+"-"+Math.random().toString(32).slice(2,8)+"-"+Math.random().toString(32).slice(2,8)
}

export{
    generarToken,
}