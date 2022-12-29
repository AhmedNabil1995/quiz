import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:5000/quesions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          "id": 1,
          "word": "slowly",
          "pos": "adverb"
      },
      {
          "id": 2,
          "word": "ride",
          "pos": "verb"
      },
      {
          "id": 3,
          "word": "bus",
          "pos": "noun"
      },
      ])
    )
  }),
  rest.post('http://localhost:5000/rank', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(50)
    )
  }),
]
