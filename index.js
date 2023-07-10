const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(__dirname)); // Add this line to serve static files

app.get('/', (req, res) => {
  const message = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Testing App</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: Arial, sans-serif;
          background: url("image4.jpg") no-repeat center center fixed;
          background-size: cover;
          color: #333;
          text-align: center;
        }
        h1 {
          font-size: 48px;
        }
        .red {
          color: #ff0000;
        }
        .green {
          color: #00ff00;
        }
        .slideshow-container {
          position: relative;
          max-width: 100%;
          margin: auto;
        }
        .slideshow-container img {
          width: 100%;
          height: auto;
        }
      </style>
      <script>
        // Slideshow JavaScript
        let slideIndex = 0;
        const showSlides = () => {
          const slides = document.getElementsByClassName("mySlides");
          for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          slideIndex++;
          if (slideIndex > slides.length) {
            slideIndex = 1;
          }
          slides[slideIndex - 1].style.display = "block";
          setTimeout(showSlides, 2000); // Change slide every 2 seconds
        };
        document.addEventListener("DOMContentLoaded", showSlides);
      </script>
    </head>
    <body>
      <h1>Welcome to the <span class="Red">DevOps</span> <span class="Green">World</span> !!</h1>
      <div class="slideshow-container">
        <div class="mySlides">
          <img src="image1.jpg" alt="Image 1">
        </div>
        <div class="mySlides">
          <img src="image2.jpg" alt="Image 2">
        </div>
        <div class="mySlides">
          <img src="image3.jpg" alt="Image 3">
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(message);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
