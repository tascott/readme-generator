const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const licenseObject = require("./utils/licenses");

// Get the license options from the licenseObject
const licenseOptions = Object.keys(licenseObject);

// array of questions for user
const questions = [
    { type: 'input', name: 'title', message: 'What is the project title?' },
    { type: 'input', name: 'description', message: 'What is the project description?' },
    { type: 'input', name: 'installation', message: 'What are the installation instructions?' },
    { type: 'input', name: 'usage', message: 'What is the usage information?' },
    { type: 'input', name: 'contributions', message: 'What are the contribution guidelines?' },
    { type: 'input', name: 'test', message: 'What are the test instructions?' },
    { type: 'input', name: 'github', message: 'What is your GitHub username?' },
    { type: 'input', name: 'email', message: 'What is your email address?' },
    { type: 'list', name: 'license', message: 'What is the license?', choices: licenseOptions },
];

// function to initialize program
function init() {
    inquirer.prompt(questions)
    .then((response) => {
        //write to file - this will overwrite the README.md file rather than append
        writeToFile('README.md', generateMarkdown(response));
    });
}

// function to write README file
function writeToFile(filename, data) {
    fs.writeFile(filename, data, (err) =>
        err ? console.error(err) : console.log('Success!')
    );
}

// function call to initialize program
init();
