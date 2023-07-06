# Setup your backend

> This readme contains specific language examples for getting your backend up and running. These are just general examples and if you want to try something else, make sure your backend server is running at http://localhost:3000

- Python
- Java
- Golang

## Python

Below is an example Flask app to get started

main.py

```python
from flask import Flask
app = Flask(__name__)

@app.route("/healthcheck")
def health_check():
    return {"success": True}

if __name__ == "__main__":
    app.run(debug=True, port=3000)
```

## Java

## Golang

main.go

```go
package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()

    app.Get("/healthcheck", func(c *fiber.Ctx) error {
        return c.Json(fiber.Map{"success": true})
    })

    app.Listen(":3000")
}
```
