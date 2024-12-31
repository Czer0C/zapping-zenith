import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { actions } from 'astro:actions';

export function FormLink() {
  const [link, setLink] = useState('');

  const submitShortLink = async () => {
    const { data, error } = await actions.createData({ url: link });

    if (data) {
      console.log(data);

      window.location.reload();
    } else {
      alert(error?.message);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-4 items-center gap-4">
        <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="email"
          placeholder="Link"
          className="col-span-3"
        />

        <Button onClick={submitShortLink}>
          <PlusCircle /> Generate Short Link
        </Button>
      </div>
    </>
  );
}
