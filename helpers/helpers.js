import jwt from 'jsonwebtoken'

const generarToken = () => {
    return Math.random().toString(32).slice(2,8)+"-"+Math.random().toString(32).slice(2,8)+"-"+Math.random().toString(32).slice(2,8)+"-"+Math.random().toString(32).slice(2,8)
}

const generarJWT = (id,nombre,email) => {
    return jwt.sign({id,nombre,email}, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export{
    generarToken,
    generarJWT,
}