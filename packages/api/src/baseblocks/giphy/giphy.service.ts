import { Giphy } from '@baseline/types/giphy';
import { getDynamodbConnection } from '@baselinejs/dynamodb';
import { ServiceObject } from '../../util/service-object';
import axios from 'axios';

// Create DB conneciton - to do 
const dynamoDb = getDynamodbConnection({
  region: `${process.env.API_REGION}`,
});

// Function for caching - to do 
export const giphyService = new ServiceObject<Giphy>({
  dynamoDb: dynamoDb,
  objectName: 'giphy',
  table: `${process.env.APP_NAME}-${process.env.NODE_ENV}-giphy`,
  primaryKey: 'name',
});

// HTTPS GET: query Giphy API
export const searchGiphy = async (query: string, limit = 12): Promise<Giphy[]> => {
  console.log('Searching Giphy API with query:', query);
  // ensure base URL does not have trailing slash
  const baseUrl = process.env.GIPHY_BASE_URL?.replace(/\/+$/, '');
  const endpoint = baseUrl + '/v1/gifs/search';
  console.log('Giphy API endpoint:', endpoint);
  const response = await axios.get<{ data: unknown }>(endpoint, { // casting data 'unknown' to prevent unsafe assumptions
    params: {
      api_key: process.env.GIPHY_API_KEY,
      q: query,
      limit,
    },
  });

  //console.log('Giphy API data.data response:', response.data);
  console.log('Giphy API data response:', response.data.data);
  // Map results to Giphy type to present back to the front-end
  const items = response.data.data as unknown[];
  return items.map((item: unknown) => {  // cast as unknown type before setting as Giphy type structure preventing unsafe assumptions
    // define each item as a Giphy structure
    const Giphhy = item as {
      id: string;
      url: string;
      title: string;
      images: {
        original: { url: string };
        preview: { url: string };
      };
    };

    // type set Giphy structure to gaurantee correct interface
    return {            
      id: Giphhy.id,
      url: Giphhy.url,
      title: Giphhy.title,
      images: {
        original: { url: Giphhy.images.original.url },
        preview: { url: Giphhy.images.preview.url },
      },
    } as Giphy
  });
};
