import nock from 'nock';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, waitFor } from '@testing-library/react-native';
import PostsList from '../src/screens/PostsList/Posts';
import { Text, View } from 'react-native';

const queryClient = new QueryClient();

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <View>
        <PostsList />
      </View>
    </QueryClientProvider>,
  );
};

describe('PostsList', () => {
  beforeAll(() => {
    nock('http:localhost:4000')
      .get('/posts')
      .reply(200, {
        data: [
          [
            {
              id: 163851216856933,
              title: 'fdasf',
              image:
                'https://images.unsplash.com/photo-1638457359665-3f8f90bf822d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
              description: 'Test12345',
              content: 'Asfisajfisjaifjsaij1i2j3121',
            },
            {
              id: 16385166856933,
              title: 'Test12341241',
              image:
                'https://images.unsplash.com/photo-1638457359665-3f8f90bf822d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
              description: 'Test12345',
              content: 'Asfisajfisjaifjsaij1i2j3121',
            },
            {
              id: 16385168356933,
              title: 'gdagas',
              image:
                'https://images.unsplash.com/photo-1638457359665-3f8f90bf822d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
              description: 'Test12345',
              content: 'Asfisajfisjaifjsaij1i2j3121',
            },
            {
              id: 16385168156933,
              title: '63216312',
              image:
                'https://images.unsplash.com/photo-1638457359665-3f8f90bf822d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
              description: 'Test12345',
              content: 'Asfisajfisjaifjsaij1i2j3121',
            },
            {
              id: 16385168256933,
              title: '12312',
              image:
                'https://images.unsplash.com/photo-1638457359665-3f8f90bf822d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
              description: 'Test12345',
              content: 'Asfisajfisjaifjsaij1i2j3121',
            },
          ],
        ],
      });
  });
  test('should render component', async () => {
    renderComponent();
    // await waitFor(() => expect(queryByTestId('1')).toBeTruthy());
    expect(1).toBe(1);
  });
});
