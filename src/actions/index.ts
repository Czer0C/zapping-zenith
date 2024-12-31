import { defineAction } from 'astro:actions';

const TOKEN = 'zenzeIsMoe';

export const server = {
  // action declarations

  getData: defineAction({
    // input: z.object({
    //   name: z.string(),
    // }),
    handler: async () => {
      const data = await fetch('http://34.143.206.52/summary', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }).then((response) => response.json());

      return data;
    },
  }),
};
