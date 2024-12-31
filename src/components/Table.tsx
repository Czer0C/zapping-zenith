import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function TableDemo({ data }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-bold">Short Code</TableHead>
          <TableHead className="">Origin</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead className="text-right">Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((i) => (
          <TableRow key={i.id}>
            <TableCell className="font-bold">{i.short_code}</TableCell>
            <TableCell className="">{i.origin}</TableCell>
            <TableCell className="text-right">{i.created_at}</TableCell>
            <TableCell className="text-right">{i.updated_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
