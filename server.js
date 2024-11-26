const express = require("express");
const bodyParser = require("body-parser");
const { books, users } = require("./data");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Task 1: Get all books
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// Task 2: Get book details by ISBN
app.get("/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});


// Task 3: Get all books by author
app.get("/books/author/:author", (req, res) => {
    const { author } = req.params;
    const booksByAuthor = books.filter(b => b.author.toLowerCase() === author.toLowerCase());

    if (booksByAuthor.length > 0) {
        res.status(200).json(booksByAuthor);
    } else {
        res.status(404).json({ message: "No books found by this author" });
    }
});

// Task 4: Get books by title
app.get("/books/title/:title", (req, res) => {
    const { title } = req.params;
    const book = books.find(b => b.title.toLowerCase() === title.toLowerCase());

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 5: Get book review
app.get("/books/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);

    if (book && book.review) {
        res.status(200).json({ review: book.review });
    } else {
        res.status(404).json({ message: "Review not found" });
    }
});

// Task 6: Register new user
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
});

// Task 7: Login as registered user
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Task 8: Add/Modify a book review
app.put("/books/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;

    const book = books.find(b => b.isbn === isbn);

    if (book) {
        book.review = review;
        res.status(200).json({ message: "Review updated successfully" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 9: Delete a book review
app.delete("/books/review/:isbn", (req, res) => {
    const { isbn } = req.params;

    const book = books.find(b => b.isbn === isbn);

    if (book) {
        delete book.review;
        res.status(200).json({ message: "Review deleted successfully" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 10-13: Async Callbacks, Promises, etc.

// Task 10: Get all books using async callback
app.get("/books-async", async (req, res) => {
    try {
        const allBooks = await new Promise((resolve) => {
            resolve(books);
        });
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

// Task 11: Search by ISBN using Promises
app.get("/books-promise/:isbn", (req, res) => {
    const { isbn } = req.params;
    const promise = new Promise((resolve, reject) => {
        const book = books.find(b => b.isbn === isbn);
        if (book) {
            resolve(book);
        } else {
            reject("Book not found");
        }
    });

    promise
        .then((book) => res.status(200).json(book))
        .catch((err) => res.status(404).json({ message: err }));
});

// Task 12: Search by Author
app.get("/books/author/:author", (req, res) => {
    const { author } = req.params;
    const booksByAuthor = books.filter(b => b.author.toLowerCase() === author.toLowerCase());
    if (booksByAuthor.length > 0) {
        res.status(200).json(booksByAuthor);
    } else {
        res.status(404).json({ message: "No books found by this author" });
    }
});

// Task 13: Search by Title
app.get("/books/title/:title", (req, res) => {
    const { title } = req.params;
    const book = books.find(b => b.title.toLowerCase() === title.toLowerCase());
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
