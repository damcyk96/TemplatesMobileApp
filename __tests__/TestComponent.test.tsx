import React from 'react';
import { render } from '@testing-library/react-native';

import TestComponent from '../src/components/TestComponent';
import nock from 'nock';

describe('PostsList', () => {
  beforeAll(() => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/posts')
      .reply(200, [
        {
          userId: 1,
          id: 1,
          title:
            'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        },
        {
          userId: 1,
          id: 5,
          title: 'qui est esse',
          body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        },
      ]);
  });

  test('should render component', async () => {
    const { getByTestId, findAllByTestId } = render(<TestComponent />);
    const postContrainer = getByTestId('post-container');
    const postItems = await findAllByTestId('post-item');
    //await waitFor(() => expect(queryByTestId('5')).toBeTruthy());

    expect(postContrainer).toBeTruthy();
    expect(postItems).toHaveLength(2);

    // await waitFor(() => expect(getByTestId('post-item')).toBeTruthy());
    // const postItems = await findByTestId('post-item');
  });
});
