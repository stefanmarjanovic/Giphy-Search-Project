import { Giphy } from '@baseline/types/giphy';
import { getDynamodbConnection } from '@baselinejs/dynamodb';
import { ServiceObject } from '../../util/service-object';
import axios from 'axios';

// create DB conneciton - to do 
const dynamoDb = getDynamodbConnection({
  region: `${process.env.API_REGION}`,
});

// function for caching - to do 
export const giphyService = new ServiceObject<Giphy>({
  dynamoDb: dynamoDb,
  objectName: 'giphy',
  table: `${process.env.APP_NAME}-${process.env.NODE_ENV}-giphy`,
  primaryKey: 'name',
});

// HTTPS GET: query Giphy API
export const searchGiphy = async (query: string, limit = 12): Promise<Giphy[]> => {
  console.log('Searching Giphy API with query:', query);
  // Ensure base URL does not have trailing slash
  const baseUrl = process.env.GIPHY_BASE_URL?.replace(/\/+$/, '');
  const endpoint = baseUrl + '/v1/gifs/search';
  console.log('Giphy API endpoint:', endpoint);
  const response = await axios.get(endpoint, {
    params: {
      api_key: process.env.GIPHY_API_KEY,
      q: query,
      limit,
    },
  });

  // Map results to Giphy type to present back to the front-end
  console.log('Giphy API response:', response.data);
  return response.data.data.map((item: any) => ({
    id: item.id,
    url: item.url,
    title: item.title,
    images: {
      original: { url: item.images.original.url },
      preview: { url: item.images.preview_gif.url },
    },
  }));
};
