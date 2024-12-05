import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            message: "Enter a valid Url e.g https://charlestechy.co\n",
            name: "URL",
        },
        {
            message: "Enter a file name\n",
            name: "FILENAME",
        },
        {
            message: "Enter a file format e.g png, jpg, svg\n",
            name: "FILEFORMAT",
        },
    ])
    .then((answer) => {
        const url = answer.URL;
        const fileName = answer.FILENAME.toLowerCase();
        const fileFormat = answer.FILEFORMAT.toLowerCase();

        if (!fileFormat.includes('.')) {

            if (fileFormat.length == 3) {

                if (url.substring(0, 4) == "http" || url.substring(0, 5) == "https") {

                    const createPng = qr.image(url, { type: fileFormat });

                    createPng.pipe(fs.createWriteStream(`generated_qr/${fileName}.${fileFormat}`));

                    console.log(`Qr code generated successfully for ${url}`);

                } 
                else {

                    console.log(`Please your url must have either https or http.`);
                }

            } 
            else {
                console.log(`Please pick a format from the list.`);

            }

        } 
        else {
            console.log(`Please remove dot(.) sign from format.`);

        }



    });
