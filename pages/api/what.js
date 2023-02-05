const What = (req, res) => {
    if (req.method === "GET") {
        fs.readFile(path.join(process.cwd(), "data", "what.json"), (err, data) => {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            res.status(200).json(JSON.parse(data))
        })
    }
}
export default What