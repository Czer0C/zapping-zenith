import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { actions } from 'astro:actions';

export function TableDemo({ data }) {
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
            <TableCell className="font-bold">{i.short_code}</TableCell>
            <TableCell className="">{i.origin}</TableCell>
            <TableCell className="text-right">
              {new Date(i.created_at).toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              {new Date(i.updated_at).toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger className="flex items-center">
                  <Trash2 />
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
