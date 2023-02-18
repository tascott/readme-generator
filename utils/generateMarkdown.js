const licenseObject = require("./licenses");

// function to generate markdown for README
function generateMarkdown(data) {
  let tableOfContents = ``;
  let body = ``;
  let contact = ``;
  let markup = ``;
  let title = ``;
  let licenseBadge = ``;

  // Loop over each item in the data object
  Object.entries(data).forEach(([key, value]) => {
    // if no value, return, to avoid empty headings
    if (!value) {
      return;
    }

    if (key === 'title') {
      title += `# ${value}\n`
    };

    if (key === 'description') {
      body += `## Description\n${value}\n`
      tableOfContents += `* [Description](#description)\n`
    };

    if (key === 'installation') {
      body += `## Installation Instructions\n${value}\n`
      tableOfContents += `* [Installation Instructions](#installation-instructions)\n`
    };

    if (key === 'usage') {
      body += `## Usage\n${value}\n`
      tableOfContents += `* [Usage](#usage)\n`
    };

    if (key === 'contributions') {
      body += `## Contributions\n${value}\n`
      tableOfContents += `* [Contributions](#contributions)\n`
    };

    if (key === 'test') {
      body += `## Tests\n${value}\n`
      tableOfContents += `* [Tests](#tests)\n`
    };

    if (key === 'license') {
      body += `## License\nThis project is licensed under ${value}\n`
      tableOfContents += `* [License](#license)\n`
      // find the key from the license object and return the value
      const license = Object.keys(licenseObject).find(key => key === value);
      const badgeURL = licenseObject[license];
      title += `![GitHub license](${badgeURL})\n`
    };

    if (key === 'email') {
      contact += `If you have any questions about the repo, open an issue or [contact me directly](mailto:${value}).\n`
    };

    if (key === 'github') {
      contact += `You can find more of my work on [Github](https://www.github.com/${value}/)\n`
    };
  });

  //Add title to top of file
  if (title.length) {
    markup += `${title}\n`;
  }

  //Add table of contents if any headings are present
  if (tableOfContents.length) {
    markup += `## Table of Contents\n${tableOfContents}\n`;
  }

  //Add body if any body content is present
  if (body.length) {
    markup += `${body}\n`;
    // This will add a new line before and after code blocks to make them render properly
    markup = markup.replace(/```/g, '\n```\n');
  }

  //Add contact section if either email or github is present
  if (contact.length) {
    markup += `## Questions\n${contact}\n`
  }

  return markup;
}

module.exports = generateMarkdown;