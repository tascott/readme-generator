const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

const licenseOptions = [
    'Apache License 2.0',
    'GNU General Public License v3.0',
    'MIT License',
    'BSD 2-Clause "Simplified" License',
    'BSD 3-Clause "New" or "Revised" License',
    'Boost Software License 1.0',
    'Creative Commons Zero v1.0 Universal',
    'Eclipse Public License 2.0',
]

// array of questions for user
const questions = [
    { type: 'input', name: 'title', message: 'What is the project title?' },
    { type: 'input', name: 'description', message: 'What is the project description?' },
    { type: 'input', name: 'installation', message: 'What are the installation instructions?' },
    { type: 'input', name: 'usage', message: 'What is the usage information?' },
    { type: 'input', name: 'contribution', message: 'What are the contribution guidelines?' },
    { type: 'input', name: 'test', message: 'What are the test instructions?' },
    { type: 'input', name: 'github', message: 'What is your GitHub username?' },
    { type: 'input', name: 'email', message: 'What is your email address?' },
    { type: 'list', name: 'license', message: 'What is the license?', choices: licenseOptions },
];

// function to initialize program
function init() {
    inquirer.prompt(questions)
    .then((response) => {
        //jsonify the response
        console.log(response);
        const stringToAppend = JSON.stringify(response);
        console.log(stringToAppend);
        //write to file
        writeToFile('README.md', generateMarkdown(response));
    });
}

// function to write README file
function writeToFile(filename, data) {
    fs.appendFile(filename, data, (err) =>
        err ? console.error(err) : console.log('Success!')
    );
    console.log('writeToFile');
}

// function call to initialize program
init();
