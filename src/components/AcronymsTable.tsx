import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockAcronyms } from "@/lib/mock-data"

export function AcronymsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] font-semibold">Acronym</TableHead>
          <TableHead className="font-semibold">Definition</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockAcronyms.map((item) => (
          <TableRow key={item.acronym}>
            <TableCell className="font-medium">{item.acronym}</TableCell>
            <TableCell>{item.definition}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
