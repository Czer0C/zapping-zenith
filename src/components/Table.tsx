import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Check,
  CheckCheck,
  CheckCircle,
  CheckCircle2,
  Edit2,
  Trash2,
  XCircleIcon,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { actions } from 'astro:actions';
import { HOST } from '@/lib/enum';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function TableDemo({ data }) {
  const userToken = new Date().getTime();

  const [editing, setEditing] = useState(null);

  const handleSubmitEdit = async () => {
    const { data, error } = await actions.updateData({
      short_code: editing.short_code,
      url: editing.origin,
    });

    if (data) {
      console.log(data);
    } else {
      alert(error?.message);
    }

    window.location.reload();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-bold">Short Code</TableHead>
          <TableHead className="">Origin</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead className="text-right">Updated At</TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((i) => (
          <TableRow key={i.id}>
            <TableCell className="font-bold">
              <a
                href={`${HOST}/${i.short_code}?token=${userToken}`}
                target="_blank"
              >
                {i.short_code}
              </a>
            </TableCell>
            <TableCell className="" onDoubleClick={() => setEditing(i)}>
              {editing?.id === i.id ? (
                <div className="flex  items-center gap-2">
                  <Input
                    type="text"
                    value={editing.origin}
                    onChange={(e) =>
                      setEditing({ ...editing, origin: e.target.value })
                    }
                  />
                  <div className="w-10">
                    <Button onClick={handleSubmitEdit} variant="ghost">
                      <CheckCircle color="green" />
                    </Button>
                    <Button onClick={() => setEditing(null)} variant="ghost">
                      <XCircleIcon size={20} />
                    </Button>
                  </div>
                </div>
              ) : (
                i.origin
              )}
            </TableCell>

            <TableCell className="text-right">
              {new Date(i.created_at).toLocaleString()}
            </TableCell>

            <TableCell className="text-right">
              {new Date(i.updated_at).toLocaleString()}
            </TableCell>

            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger className="flex items-center">
                  <Trash2 color="red" />
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    Are you sure to delete short code for{' '}
                    <b className="text-sky-500">{i.origin}</b>?
                  </div>

                  <Button
                    variant="destructive"
                    onClick={async () => {
                      const { data, error } = await actions.deleteData({
                        short_code: i.short_code,
                      });

                      if (data) {
                        console.log(data);
                      } else {
                        alert(error?.message);
                      }

                      window.location.reload();
                    }}
                  >
                    Confirm
                  </Button>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}

const fLink = (link: string) => {
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link;
  }

  return 'https://' + link;
};
