# Setup your backend

> This readme contains specific language examples for getting your backend up and running. These are just general examples and if you want to try something else, make sure your backend server is running at http://localhost:3000

- [Python](/python-example/README.md)
- Java
- [Golang](#golang)

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
