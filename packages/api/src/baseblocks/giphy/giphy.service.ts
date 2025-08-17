import { Giphy } from '@baseline/types/giphy';
import { getErrorMessage } from '../../util/error-message';
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

// query function to search Giphy API
export const searchGiphy = async (query: string, limit = 10): Promise<Giphy[]> => {
  console.log('Searching Giphy API with query:', query);
  const response = await axios.get((process.env.GIPHY_BASE_URL + '/api/search'), {
    params: {
      api_key: process.env.GIPHY_API_KEY,
      q: query,
      limit,
    },
  });

  // Map the API response to your app's format
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
