//src App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('3 recipes display beneath My Recipe heading', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeNameArray = ["Lean Pockets", 'Taquitos', 'Mt. Dew Margharita']
  const recipeInstructionsArray = ["place in toaster oven on 350 for 45 minutes",
                                   'Place in Toaster Oven on 420 for 69 minutes',
                                   'Place ice, Mt. Dew(tm) beverage, and crushed Cheeto\'s into mixer and shake vigoursly. Be sure to firmly grasp it.']

  // for (let i = 0; i < recipeNameArray.length - 1; i++) {
  // await userEvent.type(instructionsInput, recipeInstructionsArray[i])
  // await userEvent.type(nameInput, recipeNameArray[i])
  // userEvent.click(submitButton);
  // }

  await userEvent.type(instructionsInput, recipeInstructionsArray[0])
  await userEvent.type(nameInput, recipeNameArray[0])
  await userEvent.click(submitButton);
  await userEvent.type(instructionsInput, recipeInstructionsArray[1])
  await userEvent.type(nameInput, recipeNameArray[1])
  await userEvent.click(submitButton);
  await userEvent.type(instructionsInput, recipeInstructionsArray[2])
  await userEvent.type(nameInput, recipeNameArray[2])
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();

  let displayedRecipeNames = screen.getAllByRole('listitem')
  for (let i = 0; i < displayedRecipeNames.length; i++) {
    expect(screen.getByText(recipeNameArray[i])).toContain(displayedRecipeNames[i])
  //before loop - declare loopTrue = true
  //if array[i] != otherArray;
  //loopTrue = false
  //expect(loopTrue)
  }

})

test('recipe name from state appears in an unordered list', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const {instructionsInput} = setup();

  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
})


test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});

test('typing in the recipe name makes the recipe name appear in the input', async () => {
  render(<App />);

  const recipeName = 'No pockets';
  userEvent.click(screen.getByText("Add Recipe"));
  await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

  expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
})