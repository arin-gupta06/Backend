import express from 'express';

const app = express()

app.get("/", (req, res) => {
    res.send("Server ready");
})

const port = process.env.PORT || 4000;
const user = [
    {"id": 1, "name": "Arin", "age": 20, "occupation": 'Student'},
    {"id": 2, "name": "Raman", "age": 15, "occupation": 'Freelancer'},
    {"id": 3, "name": "Sneha", "age": 30, "occupation": 'Fresher'},
    {"id": 4, "name": "Aarti", "age": 18, "occupation": 'Undergraduate'},
    {"id": 5, "name": "Akansha", "age": 22, "occupation": 'nurse'}
]
app.get("/api/userData", (req, res) => {
    res.send(user);
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
})