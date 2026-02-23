
// Serve para pegar os erros e mandar para o front
const errorHandler = (err, req, res, next) => {
    // ver o erro no console para me ajudar 
    console.error(err)

    // se o erro tiver um status code, usa ele, senão usa 500
    const statusCode = err.statusCode || 500

    // manda pro front
    res.status(statusCode).json({
        error: "Erro interno do servidor",
        message: err.message
    })
}

export { errorHandler }