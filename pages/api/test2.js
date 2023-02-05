const fs = require("fs")
const path = require("path")

const Testing = async (req, res) => {
    if (req.method === "POST") {
        const { message } = req.body
        fs.writeFile(path.join(process.cwd(), "data", "who.json"), JSON.stringify({ message: message.trim() }), (error) => {
            if (error) {
                res.status(500).json({ message: error.message })
                return;
            }
            res.status(200).json({ message: "Successfully edited Who we are Section" })
        })

    }
    if (req.method === "PUT") {
        const { message } = req.body
        fs.writeFile(path.join(process.cwd(), "data", "what.json"), JSON.stringify({ message: message.trim() }), (error) => {
            if (error) {
                res.status(500).json({ message: error.message })
                return;
            }
            res.status(200).json({ message: "Successfully edited The What we do Section" })
        })

    }
    if (req.method === "GET") {
        fs.readFile(path.join(process.cwd(), "data", "who.json"), (err, data) => {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            res.status(200).json(JSON.parse(data))
        })
    }
}
export default Testing