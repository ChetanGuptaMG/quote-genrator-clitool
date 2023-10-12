#!/usr/bin/env node

import axios from 'axios';
import inquirer from 'inquirer';
import kleur from 'kleur';

async function fetchRandomQuote() {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data.content;
  } catch (error) {
    console.error(kleur.red('Unable to fetch a quote at the moment.'));
    return null;
  }
}

async function displayRandomQuote() {
  const quote = await fetchRandomQuote();
  if (quote) {
    console.log(kleur.yellow('Random Quote:'));
    console.log(kleur.white(quote));
  }
}

async function showMenu() {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Select an option:',
      choices: [
        { name: 'Generate Random Quote', value: 'quote' },
        { name: 'Quit', value: 'quit' },
      ],
    },
  ]);

  switch (choice) {
    case 'quote':
      await displayRandomQuote();
      showMenu();
      break;
    case 'quit':
      console.log(kleur.cyan('Goodbye!'));
      break;
  }
}

function main() {
  console.log(kleur.magenta('Welcome to the CLI Quote Generator!'));
  showMenu();
}

main();
