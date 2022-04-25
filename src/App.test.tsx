import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/GloomHaven Roads, Cities & Items/i);
  expect(linkElement).toBeInTheDocument();
});

test('should display added city card after addition', async () => {
  const {container} = render(<App />);
  const elements = screen.getAllByRole('spinbutton');
  let element: Element;
  for (let e of elements) {
    let attr = e.attributes.getNamedItem("name");
    if (attr!.value == "city-input"){
      element = e;
      break;
    }
  }
  await userEvent.click(element!);

  await userEvent.keyboard('33');

  // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
  let addButton = container.querySelector('#add-city');
  await userEvent.click(addButton!);
  const elementOnTheList = screen.getByText('33');
  expect(elementOnTheList).toBeInTheDocument();
})
