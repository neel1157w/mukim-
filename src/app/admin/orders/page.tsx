import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockSwaps, mockItems, mockUsers } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ManageOrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Orders (Swaps)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSwaps.map((swap) => {
              const item = mockItems.find(i => i.id === swap.itemId);
              const owner = mockUsers.find(u => u.id === swap.ownerId);
              const requester = mockUsers.find(u => u.id === swap.requesterId);
              
              if (!item || !owner || !requester) return null;

              return (
                <TableRow key={swap.id}>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Image src={item.images[0]} alt={item.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="clothing item" />
                        <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{requester.name}</TableCell>
                  <TableCell>
                    <Badge variant={swap.status === 'accepted' ? 'default' : swap.status === 'pending' ? 'secondary' : 'destructive'}>
                        {swap.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
