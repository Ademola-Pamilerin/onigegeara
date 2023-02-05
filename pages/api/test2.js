const fs = require("fs")
const path = require("path")

const Testing = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { message } = req.body
            return fs.readFile(path.join(process.cwd(), "data", "about.json"), (err, data) => {
                if (err) {
                    throw new Error(error.message)
                }
                const result = JSON.parse(data)
                return fs.writeFile(path.join(process.cwd(), "data", "about.json"), JSON.stringify({ ...result, who: message.trim() }), (error) => {
                    if (error) {
                        res.status(500).json({ message: error.message })
                        return;
                    }
                    res.status(200).json({ message: "Successfully edited Who we are Section" })
                })
            })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    if (req.method === "PUT") {
        const { message } = req.body
        fs.readFile(path.join(process.cwd(), "data", "about.json"), (err, data) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            const result = JSON.parse(data)
            fs.writeFile(path.join(process.cwd(), "data", "about.json"), JSON.stringify({ ...result, what: message.trim() }), (error) => {
                if (error) {
                    res.status(500).json({ message: error.message })
                    return;
                }
                res.status(200).json({ message: "Successfully edited The What we do Section" })
            })
        })

    }

}
export default Testing