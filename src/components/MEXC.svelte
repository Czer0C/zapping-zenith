<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import Change from './Change.svelte';

  let socket: WebSocket;

  interface DICT_COIN {
    [key: string]: {
      name: string;
      latest: string;
      change: string;
      time: string;
    };
  }

  const dict: DICT_COIN = {
    BTCUSDT: {
      name: 'BTC',
      latest: '',
      change: '',
      time: '',
    },

    DINGOUSDT: {
      name: 'DINGO',
      latest: '',
      change: '',
      time: '',
    },

    TRUMPUSDT: {
      name: 'TRUMP',
      latest: '',
      change: '',
      time: '',
    },
    ELONUSDT: {
      name: 'ELON',
      latest: '',
      change: '',
      time: '',
    },
    CATCOINUSDT: {
      name: 'CATCOIN',
      latest: '',
      change: '',
      time: '',
    },

    PIKAUSDT: {
      name: 'PIKA',
      latest: '',
      change: '',
      time: '',
    },
    SMOGUSDT: {
      name: 'SMOG',
      latest: '',
      change: '',
      time: '',
    },
  };

  onMount(async () => {
    socket = new WebSocket('wss://wbs.mexc.com/ws');

    socket.onopen = () => {
      const listCryptos = Object.keys(dict);

      const endpoints = listCryptos.map((i) => `spot@public.deals.v3.api@${i}`);

      const subscription = JSON.stringify({
        method: 'SUBSCRIPTION',
        params: endpoints,
      });

      socket.send(subscription);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const deal = data?.d?.deals?.[0];

      const key = data?.s;

      if (key && typeof dict?.[key] !== 'undefined') {
        dict[key] = {
          latest: deal.p,
          change: deal?.v,
          time: new Date(deal?.t).toLocaleString(),
          name: dict[key].name,
        };
      }
    };
  });
</script>

<div class="grid w-full grid-cols-2 gap-4">
  {#each Object.keys(dict) as coin}
    <div
      class="flex w-full items-center justify-between rounded-lg bg-slate-800 p-4 shadow-lg"
    >
      <div class="flex-shrink-0">
        <b class="text-lg text-indigo-500">
          {dict[coin].name}
        </b>

        <Heading tag="h3" class="text-2xl">{dict[coin].latest}</Heading>

        <p class="text-base font-light text-gray-500 dark:text-gray-400">
          {dict[coin].time}
        </p>
      </div>

      <Change
        value={+dict[coin].change}
        since=""
        class="justify-end font-medium"
      />
    </div>
  {/each}
</div>
