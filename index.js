const axios = require("axios");
const inquirer = require("inquirer");
// const PDFDocument = require("pdfkit");
const fs = require("fs");
const PDFDocument = require('pdfkit');
// const fs = require('fs');




// ----------------------- makes call to GitHub api
// use axios to make a call to github
// install axios

const queryUrl = `https://api.github.com/users/7thact`;

axios.get(queryUrl).then(function (res) {
    console.log(res);

    // ----------------------- then asks user for fav color
    // prompt the user for a color
    // install inquirer
    inquirer.prompt([{
        name: 'color',
        message: "What is your favorite color"
    }]).then(answers => {
        // console.log('oh so your fave color is ' + answers.color + '?')
        // -----------------------  then generates a pdf of the GithHub profile
        // google

        // Create a document
        const doc = new PDFDocument();

        // Pipe its output somewhere, like to a file or HTTP response
        // See below for browser usage
        doc.pipe(fs.createWriteStream('output.pdf'));

        // Embed a font, set the font size, and render some text
        doc
            // .font('fonts/PalatinoBold.ttf')
            .fontSize(25)
            .text(`
                userName: ${res.data.name}

            `, 100, 100);

        // Add an image, constrain it to a given size, and center it vertically and horizontally
        // doc.image(res.data.avatar_url, {
        //     fit: [250, 300],
        //     align: 'center',
        //     valign: 'center'
        // });

        // Add another page
        // doc
        //     .addPage()
        //     .fontSize(25)
        //     .text('Here is some vector graphics...', 100, 100);

        // Draw a triangle
        doc
            .save()
            .moveTo(100, 150)
            .lineTo(100, 250)
            .lineTo(200, 250)
            .fill('#FF3300');

        // Apply some transforms and render an SVG path with the 'even-odd' fill rule
        doc
            .scale(0.6)
            .translate(470, -380)
            .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
            .fill('red', 'even-odd')
            .restore();

        // Add some text with annotations
        doc
            .addPage()
            .fillColor('blue')
            .text('Here is a link!', 100, 100)
            .underline(100, 100, 160, 27, { color: '#0000FF' })
            .link(100, 100, 160, 27, 'http://google.com/');

        // Finalize PDF file
        doc.end();

    });


})





// const userName = 'per'
// const template = `
// <html>
// <body>
// <ul>
// <li>${userName}</li>
// </ul>
// </body>
// </html>
// `