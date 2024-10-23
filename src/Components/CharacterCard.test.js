import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterCard from '../Components/CharacterCard';
import CharacterModal from '../Components/CharacterModal';
import '@testing-library/jest-dom/extend-expect';

// Mock data for a character
const mockCharacter = {
  name: "Luke Skywalker",
  species: [],
  homeworld: "https://swapi.dev/api/planets/1/",
  films: ["https://swapi.dev/api/films/1/"],
};

const mockHomeworldDetails = {
  name: "Tatooine",
  climate: "arid",
  terrain: "desert",
};

// Mock fetch responses
global.fetch = jest.fn((url) => {
  if (url === mockCharacter.homeworld) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockHomeworldDetails),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ name: "Unknown Species" }),
  });
});

describe('CharacterCard integration test', () => {
  it('opens the modal with correct character information when the card is clicked', async () => {
    // Render the CharacterCard component with mock character data
    render(<CharacterCard character={mockCharacter} />);

    // Ensure the card displays the correct character name
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();

    // Simulate clicking the card to open the modal
    fireEvent.click(screen.getByText(/Luke Skywalker/i));

    // Wait for the modal to appear
    await waitFor(() => {
      // Look for the modal by content instead of role="dialog"
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    });

    // Ensure the modal displays the correct character name and homeworld details
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/arid/i)).toBeInTheDocument();
    expect(screen.getByText(/desert/i)).toBeInTheDocument();
  });
});
