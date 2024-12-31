import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';

const TOKEN = 'zenzeIsMoe';

const HOST = 'http://34.143.206.52';

export const server = {
  // action declarations

  createData: defineAction({
    input: z.object({
      url: z.string(),
    }),
    handler: async ({ url }) => {
      const response = await fetch(`${HOST}/slash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ url }),
      });
      return response.json();
    },
  }),

  readData: defineAction({
    handler: async () => {
      const response = await fetch(`${HOST}/links`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      return response.json();
    },
  }),

  updateData: defineAction({
    input: z.object({
      id: z.string(),
      url: z.string(),
    }),
    handler: async ({ id, url }) => {
      const response = await fetch(`${HOST}/slash/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ url }),
      });
      return response.json();
    },
  }),

  deleteData: defineAction({
    input: z.object({
      short_code: z.string(),
    }),
    handler: async ({ short_code }) => {
      const url = `${HOST}/slash/${short_code}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return response.json();
    },
  }),

  // getData: defineAction({
  //   // input: z.object({
  //   //   name: z.string(),
  //   // }),
  //   handler: async () => {
  //     const data = await fetch('http://34.143.206.52/summary', {
  //       headers: {
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //     }).then((response) => response.json());

  //     return data;
  //   },
  // }),
};
