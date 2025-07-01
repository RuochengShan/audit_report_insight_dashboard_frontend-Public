import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Recipient {
  name: string;
  email: string;
}

interface DistributionListProps {
  to: Recipient[];
  cc: Recipient[];
}

export function DistributionList({ to, cc }: DistributionListProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 font-headline">To</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {to.map((recipient) => (
              <TableRow key={recipient.email}>
                <TableCell className="font-medium">{recipient.name}</TableCell>
                <TableCell>{recipient.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 font-headline">CC</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cc.map((recipient) => (
              <TableRow key={recipient.email}>
                <TableCell className="font-medium">{recipient.name}</TableCell>
                <TableCell>{recipient.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
