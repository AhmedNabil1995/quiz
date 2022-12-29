import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'

import Quesion from './Quesion'

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Quesion',()=>{

  beforeEach(()=>{
    render(<Quesion />);
  })

  test('renders elements correctly', () => {
    let headerElement= screen.getByRole('heading',{
      level:1
    })
    expect(headerElement).toBeInTheDocument();

    let nounOption= screen.getByText('noun')
    expect(nounOption).toBeInTheDocument();

    let verbOption= screen.getByText('verb')
    expect(verbOption).toBeInTheDocument();

    let adverbOption= screen.getByText('adverb')
    expect(adverbOption).toBeInTheDocument();

    let adjectiveOption= screen.getByText('adjective')
    expect(adjectiveOption).toBeInTheDocument();

    let nextButton = screen.queryByRole('button',{
      name:'next'
    })
    expect(nextButton).not.toBeInTheDocument();

  });
  
  test('get next quesion correctly and end quiz', async ()=>{
    let quesionElement
    quesionElement = await screen.findByText('1. slowly')
    expect(quesionElement).toBeInTheDocument();

    let adverbOption= screen.getByText('adverb')

    user.click(adverbOption);

    let nextButton = await screen.findByRole('button',{
      name:'next'
    })
    expect(nextButton).toBeInTheDocument();

    user.click(nextButton);

    quesionElement = await screen.findByText('2. ride')
    expect(quesionElement).toBeInTheDocument();

    user.click(adverbOption);

    nextButton = await screen.findByRole('button',{
      name:'next'
    })
    user.click(nextButton);


    quesionElement = await screen.findByText('3. bus')
    expect(quesionElement).toBeInTheDocument();

    user.click(adverbOption);
    
    setTimeout(()=>{
      expect(mockedUsedNavigate).toBeCalledTimes(1);
    },1600)
    
  })

test('check disabled class have been added after you chose an option',async()=>{
  let nounOption= screen.getByText('noun')
  let verbOption= screen.getByText('verb')
  let adverbOption= screen.getByText('adverb')
  let adjectiveOption= screen.getByText('adjective')

  await screen.findByText('1. slowly')
  user.click(verbOption);

  expect(nounOption).toHaveClass('disableSelection')
  expect(verbOption).toHaveClass('disableSelection')
  expect(adverbOption).toHaveClass('disableSelection')
  expect(adjectiveOption).toHaveClass('disableSelection')

})

test('check if you chose correct option',async ()=>{
  await screen.findByText('1. slowly');
  let adverbOption= screen.getByText('adverb');

  user.click(adverbOption);

  expect(adverbOption).toHaveClass('correctAnswer')
})

test('check if you chose wrong option',async ()=>{
  await screen.findByText('1. slowly');
  let verbOption= screen.getByText('verb');

  user.click(verbOption);

  expect(verbOption).toHaveClass('wrongAnswer')
})


})
