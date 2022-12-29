import { render, screen } from '@testing-library/react';
import Result from './Result';

jest.mock('react-router-dom');

describe('Result',()=>{
    test('render rank correctly',async()=>{
        render(<Result />)
        let rankElement = await screen.findByText('your rank is 50%');
        expect(rankElement).toBeInTheDocument();
    })
})
